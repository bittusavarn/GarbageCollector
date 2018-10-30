package com.gc.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gc.entities.UserModel;

@Repository
public interface UserRepository extends CrudRepository<UserModel, Integer>{

}
