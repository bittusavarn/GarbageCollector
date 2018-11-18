package com.gc.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gc.entities.Truck;
import com.gc.entities.UserModel;

@Repository
public interface TruckRepository extends CrudRepository<Truck, Integer>{
	@Query("from Truck h where h.truckNumber = :truckNumber")
	Truck getTruckOfANumber(@Param(value = "truckNumber") String truck); 

	@Query("from Truck h where h.user = :user")
	List<Truck> getAllTrucksOftheUser(@Param(value = "user") UserModel user);
   
}
