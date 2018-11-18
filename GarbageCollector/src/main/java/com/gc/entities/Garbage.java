package com.gc.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="garbage")
public class Garbage {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	private String otp;
	
    public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
     
	
	public Address getGarbageLocation() {
		return garbageLocation;
	}

	public void setGarbageLocation(Address garbageLocation) {
		this.garbageLocation = garbageLocation;
	}

	
	public Truck getTruck() {
		return truck;
	}

	public void setTruck(Truck truck) {
		this.truck = truck;
	}

	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="location")
	private Address garbageLocation;
	
	@ManyToOne
	@JoinColumn(name="truck_id")
	private Truck truck;
	
	private double garbageweight;


	public double getGarbageweight() {
		return garbageweight;
	}

	public void setGarbageweight(double garbageweight) {
		this.garbageweight = garbageweight;
	}
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="user_id")
	private UserModel user;


	public UserModel getUser() {
		return user;
	}

	public void setUser(UserModel user) {
		this.user = user;
	}
	
	private boolean picked;


	public boolean isPicked() {
		return picked;
	}

	public void setPicked(boolean picked) {
		this.picked = picked;
	}
	
	
	
}
