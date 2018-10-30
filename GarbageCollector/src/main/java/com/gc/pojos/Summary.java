package com.gc.pojos;

public class Summary {
	private long lengthInMeters;
	private long travelTimeInSeconds;
	private long trafficDelayInSeconds;
	private String departureTime ;
	private String arrivalTime ;
	public long getLengthInMeters() {
		return lengthInMeters;
	}
	public void setLengthInMeters(long lengthInMeters) {
		this.lengthInMeters = lengthInMeters;
	}
	public long getTravelTimeInSeconds() {
		return travelTimeInSeconds;
	}
	public void setTravelTimeInSeconds(long travelTimeInSeconds) {
		this.travelTimeInSeconds = travelTimeInSeconds;
	}
	public long getTrafficDelayInSeconds() {
		return trafficDelayInSeconds;
	}
	public void setTrafficDelayInSeconds(long trafficDelayInSeconds) {
		this.trafficDelayInSeconds = trafficDelayInSeconds;
	}
	public String getDepartureTime() {
		return departureTime;
	}
	public void setDepartureTime(String departureTime) {
		this.departureTime = departureTime;
	}
	public String getArrivalTime() {
		return arrivalTime;
	}
	public void setArrivalTime(String arrivalTime) {
		this.arrivalTime = arrivalTime;
	}
	
}
