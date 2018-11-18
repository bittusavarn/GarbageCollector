package com.gc.services;


import java.util.Iterator;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.gc.entities.Address;
import com.gc.entities.Garbage;
import com.gc.entities.Truck;
import com.gc.pojos.RouteResponse;
/**
 * This Service will be used process 
 * Response of Totom api 
 * @author nikumar
 *
 */
@Component
public class TomTomService {

	@Autowired
	private RestTemplate restTemplate;
	//52.50931,13.42936:52.50274,13.43872
	private String TOMTOM_BASE_URL = "https://api.tomtom.com/";
	private String API_KEY = "kUvfmVuGx1CpgWiTL7TKS1NegbyaOxpR";
	private int API_VERSION = 1;
	private String ROUTE_URL = TOMTOM_BASE_URL+"routing/" + API_VERSION + "/calculateRoute/%s/json?key=" + API_KEY;
	public RouteResponse getRouteforATruckForANewLocation(Truck truck, Address address) {
        String locationsRequest = "";
		String truckLocation = truck.getTruckLocation().getLat() + "," + truck.getTruckLocation().getLon();
		locationsRequest = locationsRequest + truckLocation;
		Set<Garbage> garbages = truck.getGarbages();
	    if(garbages!=null) {
	    	Iterator<Garbage> it = garbages.iterator(); 
		while (it.hasNext()) {
			Garbage gb = it.next();
			String loc = gb.getGarbageLocation().getLat() + "," + gb.getGarbageLocation().getLon();
			locationsRequest = locationsRequest + ":" + loc;
		 }	
	    }
	    locationsRequest = locationsRequest +":"+ address.getLat() + "," + address.getLon();
	    locationsRequest = String.format(ROUTE_URL, locationsRequest);
        return restTemplate.getForObject(locationsRequest,RouteResponse.class);
	}
}
