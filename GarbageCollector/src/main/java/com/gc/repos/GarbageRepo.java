package com.gc.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gc.entities.Garbage;
import com.gc.entities.UserModel;

@Repository
public interface GarbageRepo extends CrudRepository<Garbage, Integer>{
	@Query("from Garbage h where h.user = :user and h.picked = :picked")
	List<Garbage> getAllGarbageTobePickedUpforUser(@Param(value = "user") UserModel user,@Param(value = "picked") boolean picked); 
	
	@Query("from Garbage h where h.truck.id = :truckId and h.picked = :picked")
	List<Garbage> getAllGarbageTobePickedUpByTruck(@Param(value = "truckId") Integer truckId,@Param(value = "picked") boolean picked); 
	
}
