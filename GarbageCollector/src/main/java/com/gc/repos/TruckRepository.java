package com.gc.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gc.entities.Truck;

@Repository
public interface TruckRepository extends CrudRepository<Truck, Integer>{
	@Query("from Truck h where h.truckNumber = :truckNumber")
	Truck getTruckOfANumber(@Param(value = "truckNumber") String truck); 
   
}
