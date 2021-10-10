package nl.infomedics.pps.fileserver.controller;


import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.InvalidKeyException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FileController {
	@Value("${common.secret}") private String commonSecret;
	
	@GetMapping("/api/v1/patients-file/")
	public String liveCheck() { return "I'm Alive and kicking now at: " + System.currentTimeMillis();}

	@PostMapping("/api/v1/patients-file/")
	public byte[] processPatientsFile(@RequestBody final byte[] fileBytes, @RequestParam("fileName") final String fileNameUrlEnc, @RequestHeader("Authorization") final String auth) {
		String fileName = null;
		boolean isTokenValid = false;
		try {
			fileName = URLDecoder.decode(fileNameUrlEnc, "UTF-8");
			isTokenValid = isValidAuthToken(auth.substring("Bearer ".length()), fileName);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return ("PPS Received file: " + fileName + ". File size: " + fileBytes.length + "\n\nToken isValid = " + isTokenValid).getBytes();
	}

	private boolean isValidAuthToken(String authB64, String fileName) {
		boolean isTokenValid = false;
		try {
			final byte[] authBytes = new byte[128];
			final int decodedByteCount = Base64.getDecoder().decode(authB64.getBytes(), authBytes);
			final Object key = Twofish_Algorithm.makeKey(commonSecret.repeat(4).substring(0, 32).getBytes());
			final byte[] decryptedFileNameBytes = Twofish_Algorithm.blockDecrypt(authBytes, 0, key);
			final String decryptedFileName = new String(decryptedFileNameBytes);
			System.out.println("decrypted=" + decryptedFileName);
			isTokenValid = fileName.startsWith(decryptedFileName);
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		}
		
		return isTokenValid;
		
	}
}
