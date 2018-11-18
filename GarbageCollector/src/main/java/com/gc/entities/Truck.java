package com.gc.entities;


import java.util.Iterator;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "truck")
public class Truck {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
    
	@Column(unique=true)
	@NotBlank(message="Truck Number required")
	private String truckNumber;
	
	private String mobNo;
	
	
	

	public String getMobNo() {
		return mobNo;
	}

	public void setMobNo(String mobNo) {
		this.mobNo = mobNo;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	private double capacity;
	
	
	public double getCapacity() {
		return capacity;
	}

	public void setCapacity(double capacity) {
		this.capacity = capacity;
	}

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="location")
	private Address truckLocation;
	
	

	public Address getTruckLocation() {
		return truckLocation;
	}

	public void setTruckLocation(Address truckLocation) {
		this.truckLocation = truckLocation;
	}

	
	
	public String getTruckNumber() {
		return truckNumber;
	}

	public void setTruckNumber(String truckNumber) {
		this.truckNumber = truckNumber;
	}

	public Set<Garbage> getGarbages() {
		return garbages;
	}

	public void setGarbages(Set<Garbage> garbages) {
		this.garbages = garbages;
	}

	@JsonIgnore
	@OneToMany(mappedBy = "truck", cascade = CascadeType.ALL)
	private Set<Garbage> garbages;
	
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="user_id")
	private UserModel user;

	public UserModel getUser() {
		return user;
	}

	public void setUser(UserModel user) {
		this.user = user;
	}
	
	public double getCurrentLoad() {
		double load = 0;
		if (garbages != null && garbages.size() > 0) {
			Iterator<Garbage> it = garbages.iterator();
			while (it.hasNext()) {
				Garbage gb = it.next();
				load = load + gb.getGarbageweight();
			}
		}
		return load;
	}
	
	
}
