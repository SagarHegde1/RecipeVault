package com.recipevault.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.recipevault.model.User;
import com.recipevault.repository.UserRepository;
import com.recipevault.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/api/users/profile")
	public User findUserByJwt(@RequestHeader("Authorization") String jwt) throws Exception {
		
		User user=userService.findUserByJwt(jwt);
		
		return user;
	}
	
	

}
