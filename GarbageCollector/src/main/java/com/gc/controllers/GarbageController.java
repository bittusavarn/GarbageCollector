package com.gc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.gc.entities.Garbage;
import com.gc.entities.UserModel;
import com.gc.exceptions.PersistException;
import com.gc.pojos.OtpVerification;
import com.gc.pojos.ResponseTemplate;
import com.gc.services.GarbageService;

@RestController
@RequestMapping("garbage")
public class GarbageController {
    
	@Autowired
	private GarbageService garbageService;  
    	
	@PostMapping("register")
	ResponseEntity<ResponseTemplate<Object>> register(@RequestBody Garbage garbage,Authentication auth) {
		ResponseTemplate<Object> response = null;
		try {
			 UserModel user = (UserModel)auth.getPrincipal();
			 if(user == null) {
				 return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
			 }
			 else {
				 garbage.setUser(user);
			 }
			 garbage = garbageService.savegarbage(garbage); 
			if(garbage!=null ) {
				response = new ResponseTemplate<>(false, "Garbage Successfully Registered",garbage);
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
	
	@GetMapping("topick")
	ResponseEntity<ResponseTemplate<List<Garbage>>> getALlGarbageTobePicked(Authentication auth){
		UserModel user = (UserModel)auth.getPrincipal();
		ResponseTemplate<List<Garbage>> response = null;
		 
		if(user == null) {
			 return new ResponseEntity<ResponseTemplate<List<Garbage>>>(response, HttpStatus.FORBIDDEN);
		 }
		 response = new ResponseTemplate<List<Garbage>>(garbageService.getAllGarbageTobePickedUp(user));
		
		 return new ResponseEntity<>(response, HttpStatus.OK);
		
	}
	
	@GetMapping("topickbytruck")
	ResponseEntity<ResponseTemplate<List<Garbage>>> getALlGarbageTobePickedByTruck(@RequestParam("truckId") Integer truckId,Authentication auth){
		UserModel user = (UserModel)auth.getPrincipal();
		ResponseTemplate<List<Garbage>> response = null;
		 
		if(user == null) {
			 return new ResponseEntity<ResponseTemplate<List<Garbage>>>(response, HttpStatus.FORBIDDEN);
		 }
		 response = new ResponseTemplate<List<Garbage>>(garbageService.getAllGarbageTobePickedUpByTruck(truckId));
		 return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	
	@PostMapping("pick")
	ResponseEntity<ResponseTemplate<Object>> verifyOtp(@RequestBody OtpVerification verify,Authentication auth) {
		ResponseTemplate<Object> response = null;
			 UserModel user = (UserModel)auth.getPrincipal();
			 if(user == null) {
				 return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
			 }else{
				 return new ResponseEntity<>(garbageService.verifyOtp(verify), HttpStatus.OK);
			 }
		
	}
}
