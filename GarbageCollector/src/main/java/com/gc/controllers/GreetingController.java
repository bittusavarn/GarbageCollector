package com.gc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
@RequestMapping("greeting")
public class GreetingController {

	@GetMapping("hello")
	public String getHello() {
		return "Hello Garbage Collector";
	}
	
	@Autowired
	RestTemplate resttemplate;
	
	@GetMapping("restclient")
	public String testRestClient() {
		final String uri = "http://localhost:8091/greeting/hello";
	    return resttemplate.getForObject(uri, String.class);
		
	}
}
