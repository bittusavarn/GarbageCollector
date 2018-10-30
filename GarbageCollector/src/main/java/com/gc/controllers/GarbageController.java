package com.gc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gc.entities.Garbage;
import com.gc.exceptions.PersistException;
import com.gc.pojos.ResponseTemplate;
import com.gc.services.GarbageService;

@RestController
@RequestMapping("garbage")
public class GarbageController {
    
	@Autowired
	private GarbageService garbageService;  
    	
	@PostMapping("register")
	ResponseEntity<ResponseTemplate<Object>> register(@RequestBody Garbage garbage) {
		ResponseTemplate<Object> response = null;
		try {
			if(garbageService.savegarbage(garbage)) {
				response = new ResponseTemplate<>(false, "Garbage Successfully Registered");
			}
			else {
				response = new ResponseTemplate<>(true, "Not able to register Garbage");
			}
		} catch (PersistException e) {
			response = new ResponseTemplate<>(true, e.getMessage());
			response.setvError(e.getVerrors());
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	} 
}
