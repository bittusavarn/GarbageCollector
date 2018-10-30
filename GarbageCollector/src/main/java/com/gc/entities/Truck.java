package com.gc.entities;


import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "truck")
public class Truck {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
    
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@ManyToOne
	@JoinColumn(name = "start_location")
	private Address startLocation;

	@ManyToOne
	@JoinColumn(name = "end_location")
	private Address endLocation;

	private String truckNumber;
	
	
	public String getTruckNumber() {
		return truckNumber;
	}

	public void setTruckNumber(String truckNumber) {
		this.truckNumber = truckNumber;
	}

	public Address getStartLocation() {
		return startLocation;
	}

	public void setStartLocation(Address startLocation) {
		this.startLocation = startLocation;
	}

	public Address getEndLocation() {
		return endLocation;
	}

	public void setEndLocation(Address endLocation) {
		this.endLocation = endLocation;
	}

	

	public SubMunicipality getSubmunicipality() {
		return submunicipality;
	}

	public void setSubmunicipality(SubMunicipality submunicipality) {
		this.submunicipality = submunicipality;
	}

	public Set<Garbage> getGarbages() {
		return garbages;
	}

	public void setGarbages(Set<Garbage> garbages) {
		this.garbages = garbages;
	}

	
	@ManyToOne
	@JoinColumn(name="submunicipality_id")
	private SubMunicipality submunicipality;

	
	@OneToMany(mappedBy = "truck", cascade = CascadeType.ALL)
	private Set<Garbage> garbages;
}
