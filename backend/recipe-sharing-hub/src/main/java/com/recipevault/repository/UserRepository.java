package com.recipevault.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recipevault.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    void deleteByEmail(String email);   // ✅ auto-implemented by Spring Data
}
