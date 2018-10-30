package com.gc.pojos;

public class Section {
	private int startPointIndex;
	private int endPointIndex;
	private String sectionType;
	private String travelMode;
	public int getStartPointIndex() {
		return startPointIndex;
	}
	public void setStartPointIndex(int startPointIndex) {
		this.startPointIndex = startPointIndex;
	}
	public int getEndPointIndex() {
		return endPointIndex;
	}
	public void setEndPointIndex(int endPointIndex) {
		this.endPointIndex = endPointIndex;
	}
	public String getSectionType() {
		return sectionType;
	}
	public void setSectionType(String sectionType) {
		this.sectionType = sectionType;
	}
	public String getTravelMode() {
		return travelMode;
	}
	public void setTravelMode(String travelMode) {
		this.travelMode = travelMode;
	}

}
