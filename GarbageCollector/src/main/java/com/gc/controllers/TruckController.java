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

import com.gc.entities.Address;
import com.gc.entities.Truck;
import com.gc.entities.UserModel;
import com.gc.exceptions.PersistException;
import com.gc.pojos.ResponseTemplate;
import com.gc.services.TruckService;

@RestController
@RequestMapping("truck")
public class TruckController {
	
	@Autowired
	private TruckService truckService;
	
	@GetMapping("detail")
	public ResponseEntity<ResponseTemplate<Truck>> getTruckOfANumber(@RequestParam("number") String number,Authentication auth) {
		return new ResponseEntity<ResponseTemplate<Truck>>(truckService.getTruckDetail(number),HttpStatus.OK);
	}
	
	
	
	@PostMapping("register")
	ResponseEntity<ResponseTemplate<Object>> register(@RequestBody Truck truck,Authentication auth) {
		ResponseTemplate<Object> response = null;
		try {
			 UserModel user = (UserModel)auth.getPrincipal();
			 if(user == null) {
				 return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
			 }
			 else {
				 truck.setUser(user);
			 }
			 truck = truckService.saveTruck(truck); 
			if(truck!=null) {
				response = new ResponseTemplate<>(false, "Truck Successfully Registered",truck);
			}
			else {
				response = new ResponseTemplate<>(true, "Not able to register Truck");
			}
		} catch (PersistException e) {
			response = new ResponseTemplate<>(true, e.getMessage());
			response.setvError(e.getVerrors());
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	
	@GetMapping("mytrucks")
	ResponseEntity<ResponseTemplate<List<Truck>>> getALlTrucksofTheLoggedInUser(Authentication auth){
		UserModel user = (UserModel)auth.getPrincipal();
		ResponseTemplate<List<Truck>> response = null;
		 
		if(user == null) {
			 return new ResponseEntity<ResponseTemplate<List<Truck>>>(response, HttpStatus.FORBIDDEN);
		 }
		 response = new ResponseTemplate<List<Truck>>(truckService.getAllTrucksOftheUser(user));
		
		 return new ResponseEntity<>(response, HttpStatus.OK);
		
	}
	
	@GetMapping("getLocation")
	ResponseEntity<ResponseTemplate<Address>> getLocation(@RequestParam(value="truckId") Integer truckId, Authentication auth){
		UserModel user = (UserModel)auth.getPrincipal();
		ResponseTemplate<Address> response = null;
		 
		if(user == null) {
			 return new ResponseEntity<ResponseTemplate<Address>>(response, HttpStatus.FORBIDDEN);
		 }
		return new ResponseEntity<ResponseTemplate<Address>>(truckService.getTruckLocationFor(truckId, user), HttpStatus.OK);
	}
	
	@PostMapping("updateLocation")
	ResponseEntity<ResponseTemplate<Object>> updateLocation(@RequestBody Truck truck , Authentication auth){
		UserModel user = (UserModel)auth.getPrincipal();
		ResponseTemplate<Object> response = null;
		 
		if(user == null) {
			 return new ResponseEntity<ResponseTemplate<Object>>(response, HttpStatus.FORBIDDEN);
		 }
		return new ResponseEntity<ResponseTemplate<Object>>(truckService.updateTruckLocation(truck, user), HttpStatus.OK);
	}
}
