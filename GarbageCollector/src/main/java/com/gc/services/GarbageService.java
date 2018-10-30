package com.gc.services;

import java.util.Iterator;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gc.entities.Garbage;
import com.gc.entities.SubMunicipality;
import com.gc.entities.Truck;
import com.gc.exceptions.PersistException;
import com.gc.pojos.Route;
import com.gc.pojos.RouteResponse;
import com.gc.repos.GarbageRepo;
import com.gc.util.ExceptionUtil;

@Service
public class GarbageService {
	
	@Autowired
	private GarbageRepo garbageRepo;
	
	@Autowired 
	private SubmunicipaalityService subMinicipality;

	@Autowired
	TomTomService tomService;
	
	public boolean savegarbage(Garbage garbage) throws PersistException {
		try {
			
			SubMunicipality subMunicipality = subMinicipality.getSubmuniciplaityById(garbage.getSubmunicipality().getId());
			garbage.setSubmunicipality(subMunicipality);
			garbage.setTruck(getTruckForthisGarbage(garbage, subMunicipality.getTrucks()));
			garbageRepo.save(garbage);
			
			return true;
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
	
	/**
	 * get Truck for this Garbage
	 * @param garbage
	 * @param set
	 * @return
	 */
	private Truck getTruckForthisGarbage(Garbage garbage, Set<Truck> set) {
		Truck minDistanceTruck = null;
		long minDistance = Long.MAX_VALUE;
		Iterator<Truck> it = set.iterator();
		while (it.hasNext()) {
			Truck tr = it.next();
			RouteResponse routeresponse = tomService.getRouteforATruckForANewLocation(tr, garbage.getGarbageLocation());
			if (routeresponse != null) {
				for (Route route : routeresponse.getRoutes()) {
					if (minDistance > route.getSummary().getLengthInMeters()) {
						minDistance = route.getSummary().getLengthInMeters();
						minDistanceTruck = tr;
					}
				}
			}

		}
		return minDistanceTruck;
	}
}
