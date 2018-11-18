package com.gc.services;

import java.util.Iterator;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gc.entities.Garbage;
import com.gc.entities.Truck;
import com.gc.entities.UserModel;
import com.gc.exceptions.PersistException;
import com.gc.pojos.OtpVerification;
import com.gc.pojos.ResponseTemplate;
import com.gc.pojos.Route;
import com.gc.pojos.RouteResponse;
import com.gc.repos.GarbageRepo;
import com.gc.repos.TruckRepository;
import com.gc.repos.UserRepository;
import com.gc.util.ExceptionUtil;

@Service
public class GarbageService {
	
	@Autowired
	private GarbageRepo garbageRepo;
	
	@Autowired
	private TruckRepository truckRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	TomTomService tomService;
	
	public Garbage savegarbage(Garbage garbage) throws PersistException {
		try {
			
			Truck truck = getTruckForthisGarbage(garbage, truckRepo.findAll().iterator());
			if(truck == null) {
				throw new PersistException("No truck found for this area");
			}
			garbage.setUser(userRepo.findById(garbage.getUser().getId()).get());
			garbage.setTruck(truck);
			garbage.setOtp(generateOtp());
			garbageRepo.save(garbage);
			return garbage;
		}
		 catch (Exception e) {
			PersistException pre = ExceptionUtil.createPersistExceptionFrom(e);
			if (pre != null) {
				throw pre;
			} else {
				throw new PersistException(e.getMessage());
			}
		}
	}
	
	public ResponseTemplate<Object> verifyOtp(OtpVerification verify){
		ResponseTemplate<Object> response = new ResponseTemplate<Object>(false);
		Truck truck = truckRepo.findById(verify.getTruckId()).get();
		Garbage garbage = garbageRepo.findById(verify.getGarbageId()).get();
		if(garbage.getTruck().getId() == truck.getId() ) {
			if(verify.getOtp().equals(garbage.getOtp())) {
				garbage.setPicked(true);
				garbageRepo.save(garbage);
				response.setError(false);
				response.setMessage("Otp Verified Successfully"); 
			}
			else {
				response.setError(true);
				response.setMessage("You have entered wrong Otp"); 
			}
		}else {
			response.setMessage("This garbage is assigned to some different truck");
			response.setError(true);
		}
		return response;
	}
	
	
	private String generateOtp() 
    { 
        String Capital_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
        String Small_chars = "abcdefghijklmnopqrstuvwxyz"; 
        String numbers = "0123456789"; 
                String symbols = "!@#$%^&*_=+-/.?<>)"; 
  
  
        String values = Capital_chars + Small_chars + 
                        numbers + symbols; 
        Random rndm_method = new Random(); 
  
        char[] password = new char[4]; 
  
        for (int i = 0; i < 4; i++) 
        { 
            password[i] = 
              values.charAt(rndm_method.nextInt(values.length())); 
  
        } 
        return new String(password); 
    } 
	
	
	/**
	 * 
	 * @param user
	 * @return
	 */
	public List<Garbage> getAllGarbageTobePickedUp(UserModel user){
		return garbageRepo.getAllGarbageTobePickedUpforUser(user,false);
	}
	
	/**
	 * 
	 * @param user
	 * @return
	 */
	public List<Garbage> getAllGarbageTobePickedUpByTruck(Integer truckId){
		return garbageRepo.getAllGarbageTobePickedUpByTruck(truckId, false);
	}
	
	
	
	
	/**
	 * get Truck for this Garbage
	 * @param garbage
	 * @param it
	 * @return
	 */
	private Truck getTruckForthisGarbage(Garbage garbage, Iterator<Truck> it) {
		Truck minDistanceTruck = null;
		long minDistance = Long.MAX_VALUE;
		while (it.hasNext()) {
			Truck tr = it.next();
			if (tr.getCurrentLoad() + garbage.getGarbageweight() <= tr.getCapacity()) {
				RouteResponse routeresponse = tomService.getRouteforATruckForANewLocation(tr,
						garbage.getGarbageLocation());
				if (routeresponse != null) {
					for (Route route : routeresponse.getRoutes()) {
						if (minDistance > route.getSummary().getLengthInMeters()) {
							minDistance = route.getSummary().getLengthInMeters();
							minDistanceTruck = tr;
						}
					}
				}
			}
		}
		return minDistanceTruck;
	}
}
