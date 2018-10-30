package com.gc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gc.entities.Truck;
import com.gc.pojos.ResponseTemplate;
import com.gc.repos.TruckRepository;

@Component
public class TruckService{
 
	@Autowired
	private TruckRepository truckRepo;
	
	public ResponseTemplate<Truck> getTruckDetail(String number) {
		ResponseTemplate<Truck> response = new ResponseTemplate<>(false);
		Truck truck = truckRepo.getTruckOfANumber(number);
		if(truck !=null) {
			response.setData(truck);
		}
		else {
			response = new ResponseTemplate<>(true,"Truck with this number does not exist");
		}
		return response; 
	}
}
