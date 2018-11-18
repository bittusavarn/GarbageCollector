package com.gc.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity
@Table(name="user")
public class UserModel {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@Column(unique=true)
	@NotBlank(message="Mobile Number required")
	private String mobNo;
	
	private String password;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMobNo() {
		return mobNo;
	}
	public void setMobNo(String mobNo) {
		this.mobNo = mobNo;
	}
	
	
	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY,mappedBy="user",cascade = CascadeType.ALL)
	private Set<Garbage> garbages;
	
	
	
	public Set<Garbage> getGarbages() {
		return garbages;
	}
	public void setGarbages(Set<Garbage> garbages) {
		this.garbages = garbages;
	}
	
	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY,mappedBy="user",cascade = CascadeType.ALL)
	private Set<Truck> trucks;
	
	
	public Set<Truck> getTrucks() {
		return trucks;
	}
	public void setTrucks(Set<Truck> trucks) {
		this.trucks = trucks;
	}
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return " Mobile Number = "+mobNo ;
	}
	
}
