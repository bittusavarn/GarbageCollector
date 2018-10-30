package com.gc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gc.entities.SubMunicipality;
import com.gc.pojos.ResponseTemplate;
import com.gc.repos.SubmunicipaltyRepo;

@Component
public class SubmunicipaalityService {
    
	@Autowired
	private SubmunicipaltyRepo subMunicipalityRepo;
	
	
	public ResponseTemplate<List<SubMunicipality>> getAllSubmuniciplaityForACity(String city){
	  	ResponseTemplate<List<SubMunicipality>> response =  new ResponseTemplate<>(false); 
		response.setData(subMunicipalityRepo.getAllSubmunicipalityForAcity(city));
	  	return response;
	}
	
	public SubMunicipality getSubmuniciplaityById(Integer id) {
		return subMunicipalityRepo.findById(id).get();
	}
}
