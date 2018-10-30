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

	public String getMobNo() {
		return mobNo;
	}

	public void setMobNo(String mobNo) {
		this.mobNo = mobNo;
	}

	public Truck getTruck() {
		return truck;
	}

	public void setTruck(Truck truck) {
		this.truck = truck;
	}

	private String mobNo;	
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="location")
	private Address garbageLocation;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="truck_id")
	private Truck truck;
	
	
	
	@ManyToOne
	@JoinColumn(name="submunicipality_id")
	private SubMunicipality submunicipality;


	public SubMunicipality getSubmunicipality() {
		return submunicipality;
	}

	public void setSubmunicipality(SubMunicipality submunicipality) {
		this.submunicipality = submunicipality;
	}
	
	
	
	
}
