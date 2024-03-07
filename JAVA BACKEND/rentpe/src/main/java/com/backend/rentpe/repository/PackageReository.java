package com.backend.rentpe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.rentpe.model.Package;

public interface PackageReository extends JpaRepository<Package, Long> {
}
