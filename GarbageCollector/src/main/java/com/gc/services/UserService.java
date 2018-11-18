package com.gc.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;

import com.gc.entities.UserModel;
import com.gc.exceptions.PersistException;
import com.gc.pojos.ResponseTemplate;
import com.gc.repos.UserRepository;
import com.gc.util.ExceptionUtil;

@Component
public class UserService {

	@Autowired
	private UserRepository userRepo;
	
	public Iterable<UserModel> getAllUsers(){
		return userRepo.findAll();
	}
	
	public boolean saveUser(UserModel user) throws PersistException {
		try {
			userRepo.save(user);
			return true;
		}

		catch (DataIntegrityViolationException e) {
			throw new PersistException("User with Mobile Number " + user.getMobNo() + " already exists");
		} catch (Exception e) {
			PersistException pre = ExceptionUtil.createPersistExceptionFrom(e);
			if (pre != null) {
				throw pre;
			} else {
				throw new PersistException(e.getMessage());
			}
		}

	}
	
	public ResponseTemplate<UserModel> getUser(UserModel user) {
		ResponseTemplate<UserModel> response = new ResponseTemplate<>(false);
		UserModel userData = userRepo.getUserOfMobileNumber(user.getMobNo());
		if (userData == null) {
			response.setError(true);
			response.setMessage("User Does not exists");
		} else {
			if (user.getPassword().equals(userData.getPassword())) {
				response.setData(userData);
			} else {
				response.setError(true);
				response.setMessage("You have entered wrong password");

			}
		}
		return response;
	}
	
}
