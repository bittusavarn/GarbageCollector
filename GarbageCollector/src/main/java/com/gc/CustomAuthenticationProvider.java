package com.gc;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.gc.entities.UserModel;
import com.gc.repos.UserRepository;

@Component
public class CustomAuthenticationProvider
  implements AuthenticationProvider {
 
	@Autowired
	UserRepository userRepo; 
	
    @Override
    public Authentication authenticate(Authentication authentication) 
      throws AuthenticationException {
        String name = authentication.getName();
        String password = authentication.getCredentials()!=null ?authentication.getCredentials().toString():null;
        UserModel user = userRepo.getUserOfMobileNumber(name);
       if (user != null && (user.getPassword() != null) && (user.getPassword().equals(password))) {
			return new UsernamePasswordAuthenticationToken(user, password, new ArrayList<>());
		}
         else {
        	 return null;
         }
    }
 
    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(
          UsernamePasswordAuthenticationToken.class);
    }
}