package nl.infomedics.pps.fileserver.controller;


import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FileController {
	@Value("${common.secret}") private String commonSecret;
	
	@GetMapping("/api/v1/patients-file/")
	public String liveCheck() { return "I'm Alive and kicking now at: " + System.currentTimeMillis();}

	@PostMapping("/api/v1/patients-file/")
	public byte[] processPatientsFile(@RequestBody final byte[] fileBytes, @RequestParam("fileName") final String fileNameUrlEnc/*, @RequestHeader("Authorization") final String auth*/) {
		String fileName = null;
		try {
			fileName = URLDecoder.decode(fileNameUrlEnc, "UTF-8");
			String[] fileLines = new String(fileBytes).split("\r\n");
			for(int i= 0; i< fileLines.length; i++) {
				Thread.sleep(1);
				System.out.println("fileLines[" + i + "]");
			}
		} catch (UnsupportedEncodingException | InterruptedException e) {
			e.printStackTrace();
		}
		return ("PPS Received file: " + fileName + ". File size: " + fileBytes.length + "\n\nToken isValid = ").getBytes();
	}
}
