package com.gc.pojos;

import java.util.List;

public class RouteResponse {
	private String formatVersion;
	private String copyright;
	private String privacy;
	private List<Route> routes;
	public String getFormatVersion() {
		return formatVersion;
	}
	public void setFormatVersion(String formatVersion) {
		this.formatVersion = formatVersion;
	}
	public String getCopyright() {
		return copyright;
	}
	public void setCopyright(String copyright) {
		this.copyright = copyright;
	}
	public String getPrivacy() {
		return privacy;
	}
	public void setPrivacy(String privacy) {
		this.privacy = privacy;
	}
	public List<Route> getRoutes() {
		return routes;
	}
	public void setRoutes(List<Route> routes) {
		this.routes = routes;
	}

}
