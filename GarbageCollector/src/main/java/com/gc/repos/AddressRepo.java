package com.gc.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gc.entities.Address;

@Repository
public interface AddressRepo  extends CrudRepository<Address, Integer>{

}
