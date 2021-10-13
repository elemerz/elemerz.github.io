package nl.infomedics.pps.filereader;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.InvalidKeyException;
import java.util.Base64;
import java.util.Properties;

public class FileSender {
	private static Properties props = new Properties();

	public static void main(String[] args) {
		try {
			props.load(new FileInputStream("./file-reader.properties"));
			final String serverUrl = String.valueOf(props.get("server.url"));
			final String importFolder = String.valueOf(props.get("import.folder"));
			final String commonSecret = String.valueOf(props.get("common.secret"));
			//
			System.out.println("Hello. server.url= " + serverUrl);
			System.out.println("Hello. import.folder= " + importFolder);
			HttpClient client = HttpClient.newHttpClient();
			scanPatientsImportFolderAndSend(client, importFolder, serverUrl, commonSecret);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private static void scanPatientsImportFolderAndSend(final HttpClient client, final String scanDir, final String url, final String commonSecret) throws IOException {
		try (DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get(scanDir))) {
			for (Path path : stream) {
				final String fileName = path.getFileName().toString();
				if (!Files.isDirectory(path) && fileName.endsWith(".csv")) {
					sendFileBytes(client, fileName, Files.readAllBytes(path), url, commonSecret);
				}
			}
		}
	}

	private static String appendFileNameAsParam(final String url, final String fileName) throws UnsupportedEncodingException {
		return url + "?fileName=" + URLEncoder.encode(fileName, "UTF-8");
	}

	private static void sendFileBytes(final HttpClient client, final String fileName, final byte[] fileBytes, final String url, final String commonSecret) {
		try {
			HttpRequest request = HttpRequest.newBuilder()
					  .header("Content-Type", "application/octet-stream")
					  .header("Authorization", "Bearer " + createToken(fileName, commonSecret))
					  .POST(HttpRequest.BodyPublishers.ofByteArray(fileBytes))
					  .uri(URI.create(appendFileNameAsParam(url, fileName)))
					  .build();
			HttpResponse<byte[]> ppsResponse = client.send(request, HttpResponse.BodyHandlers.ofByteArray());
			System.out.println("PPS Responded with: HttpStatusCode: " + ppsResponse.statusCode() + "\n\nbody:\n\n" + new String(ppsResponse.body()));
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	private static String createToken(final String fileName, final String commonSecret) {
		try {
			final Object key = Twofish_Algorithm.makeKey(commonSecret.repeat(4).substring(0, 32).getBytes());
			byte[] encrypted = Twofish_Algorithm.blockEncrypt(fileName.getBytes(), 0, key);
			System.out.println("encrypted=" + encrypted);
			return Base64.getEncoder().encodeToString(encrypted);
		} catch (InvalidKeyException e) {
			e.printStackTrace();
			return "";
		}
	}
}
