package com.gc.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.gc.entities.SubMunicipality;

public interface SubmunicipaltyRepo extends CrudRepository<SubMunicipality , Integer>{

	@Query("from SubMunicipality h where h.municip = :municip")
	List<SubMunicipality> getAllSubmunicipalityForAcity(@Param(value = "municip") String municip); 
}
