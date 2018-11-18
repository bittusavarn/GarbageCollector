package com.gc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;

import com.gc.entities.Address;
import com.gc.entities.Truck;
import com.gc.entities.UserModel;
import com.gc.exceptions.PersistException;
import com.gc.pojos.ResponseTemplate;
import com.gc.repos.AddressRepo;
import com.gc.repos.TruckRepository;
import com.gc.repos.UserRepository;
import com.gc.util.ExceptionUtil;

@Component
public class TruckService{
 
	@Autowired
	private TruckRepository truckRepo;
	
	@Autowired 
	private UserRepository userRepo;
	
	@Autowired
	private AddressRepo addressRepo;
	
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
	
	/**
	 * 
	 * @param user
	 * @return
	 */
	public List<Truck> getAllTrucksOftheUser(UserModel user){
		return truckRepo.getAllTrucksOftheUser(user);
	}
	
	public ResponseTemplate<Address> getTruckLocationFor(Integer id,UserModel user) {
		
		ResponseTemplate<Address> responseTemplate =  new ResponseTemplate<Address>(false);
		Truck truck = truckRepo.findById(id).get();
		if(truck == null) {
			responseTemplate =  new ResponseTemplate<Address>(true,"Truck with this id does not exist");
		}
		else {
			responseTemplate.setData(truck.getTruckLocation());
		}
		return responseTemplate;
	}
	
	public ResponseTemplate<Object> updateTruckLocation(Truck truck, UserModel user) {
		
		ResponseTemplate<Object> responseTemplate =  new ResponseTemplate<Object>(false);
		 Truck existingTruck = truckRepo.findById(truck.getId()).get();
		if(existingTruck == null) {
			responseTemplate =  new ResponseTemplate<Object>(true,"Truck with this id does not exist");
		}
		else {
			if(truck.getUser().getId() != user.getId()) {
				responseTemplate =  new ResponseTemplate<Object>(true,"You are now owner of this truck so can not update the location");
			}
			else {
				Address address =  truck.getTruckLocation();
				address.setId(existingTruck.getTruckLocation().getId());
				addressRepo.save(address);
			}
		}
		return responseTemplate;
	}
	
	
	public Truck saveTruck(Truck truck) throws PersistException {
		try {
			truck.setUser(userRepo.findById(truck.getUser().getId()).get());
			truckRepo.save(truck);
			return truck;
		}

		catch (DataIntegrityViolationException e) {
			throw new PersistException("Trcuk with Truck Number " + truck.getTruckNumber() + " already exists");
		} catch (Exception e) {
			PersistException pre = ExceptionUtil.createPersistExceptionFrom(e);
			if (pre != null) {
				throw pre;
			} else {
				throw new PersistException(e.getMessage());
			}
		}

	}
	
	
	
	
}
