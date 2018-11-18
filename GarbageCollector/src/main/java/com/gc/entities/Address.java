package com.gc.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="address")
public class Address {
     
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	private double lat;
	
	private double lon;
	
	private String freeformAddress;
	
	public Set<Truck> getTrucks() {
		return trucks;
	}
	public void setTrucks(Set<Truck> trucks) {
		this.trucks = trucks;
	}
	public String getFreeformAddress() {
		return freeformAddress;
	}
	public void setFreeformAddress(String freeformAddress) {
		this.freeformAddress = freeformAddress;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public double getLat() {
		return lat;
	}
	public void setLat(double lat) {
		this.lat = lat;
	}
	public double getLon() {
		return lon;
	}
	public void setLon(double lon) {
		this.lon = lon;
	}
	
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	
	public String getPin() {
		return pin;
	}
	public void setPin(String pin) {
		this.pin = pin;
	}
	private String addressLine;
	public String getAddressLine() {
		return addressLine;
	}
	public void setAddressLine(String addressLine) {
		this.addressLine = addressLine;
	}
	private String city;
	private String pin;
	
	
	@JsonIgnore
	@OneToMany(mappedBy = "garbageLocation", cascade = CascadeType.ALL)
	private Set<Garbage> garbases;


	public Set<Garbage> getGarbases() {
		return garbases;
	}
	public void setGarbases(Set<Garbage> garbases) {
		this.garbases = garbases;
	}
	
	@JsonIgnore
	@OneToMany(mappedBy = "truckLocation", cascade = CascadeType.ALL)
	private Set<Truck> trucks;


}
