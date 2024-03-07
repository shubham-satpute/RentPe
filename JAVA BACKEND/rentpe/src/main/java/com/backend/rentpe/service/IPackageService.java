package com.backend.rentpe.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.backend.rentpe.model.Package;
import com.backend.rentpe.model.Room;
import com.backend.rentpe.response.PackageResposnse;

public interface IPackageService {

	List<PackageResposnse> getPackages();

	Package addNewPackage(MultipartFile photo, String name, double price, int days, String city, String state,
			String desc) throws SerialException, SQLException, IOException;

	PackageResposnse getPackageById(Long packageId);

}
