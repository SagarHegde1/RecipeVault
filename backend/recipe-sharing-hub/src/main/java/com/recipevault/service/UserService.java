package com.recipevault.service;

import com.recipevault.model.User;

public interface UserService {
	
	public User findUserById(Long userId)throws Exception;
	
	public User findUserByJwt(String jwt)throws Exception;

}
