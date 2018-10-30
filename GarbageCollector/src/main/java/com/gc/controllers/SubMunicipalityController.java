package com.gc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gc.entities.SubMunicipality;
import com.gc.pojos.ResponseTemplate;
import com.gc.services.SubmunicipaalityService;

@RestController
@RequestMapping("submunicpality")
public class SubMunicipalityController {

	@Autowired
	SubmunicipaalityService subMunicipalityService;
	
	@GetMapping("all")
	public ResponseEntity<ResponseTemplate<List<SubMunicipality>>> getAllSubmunicipalityForACity(@RequestParam("city") String city) {
		
		return new ResponseEntity<ResponseTemplate<List<SubMunicipality>>>(subMunicipalityService.getAllSubmuniciplaityForACity(city),HttpStatus.OK);
	}
	
	
	
}
