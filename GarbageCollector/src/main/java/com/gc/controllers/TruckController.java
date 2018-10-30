package com.gc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gc.entities.Truck;
import com.gc.pojos.ResponseTemplate;
import com.gc.services.TruckService;

@RestController
@RequestMapping("truck")
public class TruckController {
	
	@Autowired
	private TruckService truckService;
	
	@GetMapping("detail")
	public ResponseEntity<ResponseTemplate<Truck>> getTruckOfANumber(@RequestParam("number") String number) {
		return new ResponseEntity<ResponseTemplate<Truck>>(truckService.getTruckDetail(number),HttpStatus.OK);
	}
}
