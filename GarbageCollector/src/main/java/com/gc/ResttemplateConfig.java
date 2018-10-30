package com.gc;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
/**
 * This class will be used to call
 * any rest service to fetch respoonse
 * Here it will be used to query totom server 
 * to get route
 * @author nikumar
 *
 */
@Configuration
public class ResttemplateConfig {

	@Bean
	 RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
