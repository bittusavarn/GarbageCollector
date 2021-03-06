package com.gc.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gc.entities.UserModel;

@Repository
public interface UserRepository extends CrudRepository<UserModel, Integer>{
	@Query("from UserModel h where h.mobNo = :mobNo")
	UserModel getUserOfMobileNumber(@Param(value = "mobNo") String mobNo); 
	
	
}
