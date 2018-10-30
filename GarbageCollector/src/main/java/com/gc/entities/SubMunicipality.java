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
@Table(name = "submuniciplity")
public class SubMunicipality {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	
	private String name;
	
	private String municip;
    
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMunicip() {
		return municip;
	}

	public void setMunicip(String municip) {
		this.municip = municip;
	}

	public Set<Truck> getTrucks() {
		return trucks;
	}

	public void setTrucks(Set<Truck> trucks) {
		this.trucks = trucks;
	}

	@JsonIgnore
	@OneToMany(mappedBy = "submunicipality",cascade = CascadeType.ALL)
	private Set<Truck> trucks;
	
	public Set<Garbage> getGarbages() {
		return garbages;
	}

	public void setGarbages(Set<Garbage> garbages) {
		this.garbages = garbages;
	}
	
    @JsonIgnore
	@OneToMany(mappedBy = "submunicipality", cascade = CascadeType.ALL)
	private Set<Garbage> garbages;
}

