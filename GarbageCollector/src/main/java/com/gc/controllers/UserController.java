package com.gc.controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gc.entities.UserModel;
import com.gc.exceptions.PersistException;
import com.gc.pojos.ResponseTemplate;
import com.gc.services.UserService;

@RestController
@RequestMapping("user")
public class UserController {
	
	@Autowired
	UserService userService; 
	
	@GetMapping("all")
	ResponseEntity<ResponseTemplate<Iterable<UserModel>>> getAllUser(){
		ResponseTemplate<Iterable<UserModel>> response =  new ResponseTemplate<Iterable<UserModel>>(userService.getAllUsers());
		return new ResponseEntity<>(response,HttpStatus.OK);
	}

	@PostMapping("register")
	ResponseEntity<ResponseTemplate<Object>> addUser(@RequestBody UserModel user) {
		ResponseTemplate<Object> response = null;
		try {
			if(userService.saveUser(user)) {
				response = new ResponseTemplate<>(false, "User Successfully Registered");
			}
			else {
				response = new ResponseTemplate<>(true, "Not able to register User");
			}
		} catch (PersistException e) {
			response = new ResponseTemplate<>(true, e.getMessage());
			response.setvError(e.getVerrors());
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	
	@PostMapping("login")
	ResponseEntity<ResponseTemplate<UserModel>> loginUser(@RequestBody UserModel user) {
		ResponseTemplate<UserModel> response = userService.getUser(user);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	
}
