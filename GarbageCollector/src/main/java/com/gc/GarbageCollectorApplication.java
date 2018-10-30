package com.gc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.gc.filters.UrlFilter;


@SpringBootApplication
public class GarbageCollectorApplication {

	public static void main(String[] args) {
		System.setProperty("server.port","8091");
		SpringApplication.run(GarbageCollectorApplication.class, args);
	}
	
	@Bean
    public FilterRegistrationBean<UrlFilter> urlFilter(){
        FilterRegistrationBean<UrlFilter> registrationBean 
          = new FilterRegistrationBean<>();
             
        registrationBean.setFilter(new UrlFilter());
        registrationBean.addUrlPatterns("/*");
             
        return registrationBean;    
    }
}
