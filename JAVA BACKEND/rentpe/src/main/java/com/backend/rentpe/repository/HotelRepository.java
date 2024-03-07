package com.backend.rentpe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.rentpe.model.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
	@Query("SELECT DISTINCT h.city from Hotel h")
	List<String> findDistinctHotelCity();
	
	List<Hotel> findByEmail(String email);
}