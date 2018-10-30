package com.gc.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gc.entities.Garbage;

@Repository
public interface GarbageRepo extends CrudRepository<Garbage, Integer>{

}
