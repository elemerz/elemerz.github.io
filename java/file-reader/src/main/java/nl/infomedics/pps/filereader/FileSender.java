package nl.infomedics.pps.filereader;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.util.Properties;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

public class FileSender {
	private static Properties props = new Properties();

	public static void main(String[] args) {
		try {
			props.load(new FileInputStream("./file-reader.properties"));
			final String serverUrl = String.valueOf(props.get("server.url"));
			final String importFolder = String.valueOf(props.get("import.folder"));
			//
			System.out.println("FileReader: server.url= " + serverUrl);
			System.out.println("FileReader: import.folder= " + importFolder);
			HttpClient client = HttpClient.newHttpClient();
			scanPatientsImportFolderAndSend(client, importFolder, serverUrl);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private static void scanPatientsImportFolderAndSend(final HttpClient client, final String scanDir, final String url) throws IOException {
		int csvFilesFound = 0;
		try (DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get(scanDir))) {
			for (Path path : stream) {
				final String fileName = path.getFileName().toString();
				if (!Files.isDirectory(path) && fileName.endsWith(".csv")) {
					csvFilesFound++;
					sendFileBytesSSL(client, fileName, Files.readAllBytes(path), url);
				}
			}
		}
		System.out.println(csvFilesFound > 0 ? csvFilesFound + " files have been sent." : "No CSV files to send. Did nothing.");
	}

	private static String appendFileNameAsParam(final String url, final String fileName)
			throws UnsupportedEncodingException {
		return url + "?fileName=" + URLEncoder.encode(fileName, "UTF-8");
	}

	private static void sendFileBytesSSL(final HttpClient client, final String fileName, final byte[] fileBytes, String url) {
		System.out.println("sendFileBytesSSL: Setting up SSL connection...");
		TrustManager[] trustAllCertificates = new TrustManager[] { new X509TrustManager() {
			@Override public X509Certificate[] getAcceptedIssuers() {return null; /*Not relevant.*/}
			@Override public void checkClientTrusted(X509Certificate[] certs, String authType) {/*Do nothing. Just allow them all.*/}
			@Override public void checkServerTrusted(X509Certificate[] certs, String authType) {/*Do nothing. Just allow them all.*/}
		} };
		HostnameVerifier trustAllHostnames = new HostnameVerifier() {
			@Override public boolean verify(String hostname, SSLSession session) {return true; /*Just allow them all.*/}
		};
		try {
			System.setProperty("jsse.enableSNIExtension", "false");
	        SSLContext sc = SSLContext.getInstance("SSL");
	        sc.init(null, trustAllCertificates, new SecureRandom());
	        HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
	        HttpsURLConnection.setDefaultHostnameVerifier(trustAllHostnames);
	        url = appendFileNameAsParam(url, fileName);
	        HttpsURLConnection connection = (HttpsURLConnection) new URL(url).openConnection();
	        connection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36"); //Do as if you're using Chrome 41 on Windows 7.
	        connection.setDoOutput(true); // Triggers POST.
	        connection.setRequestProperty("Content-Type", "application/octet-stream");
	        connection.setRequestProperty("Accept-Charset", "UTF-8");
	        System.out.println("sendFileBytesSSL: SSL connection is Set up. Open it for writing file bytes...");
	        OutputStream output = connection.getOutputStream();
	        output.write(fileBytes);
	        output.flush();
	        int statusCode = connection.getResponseCode();
	        System.out.println("sendFileBytesSSL: File bytes written. Response Status: " + statusCode + " Reading Response ...");
	        InputStream responseStream = connection.getInputStream();
	        final byte[] responseBytes = responseStream.readAllBytes();
			if (statusCode >= 200 && statusCode <= 299) {
				System.out.println("sendFileBytesSSL: Response:\n\t" + new String(responseBytes));
			} else {
				InputStream errorStream = connection.getErrorStream();
		        final byte[] errorBytes = errorStream.readAllBytes();
				System.err.println("sendFileBytesSSL: Error: " + statusCode + "\n\t" + new String(errorBytes));
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (GeneralSecurityException e) {
			e.printStackTrace();
		}
	}
}
