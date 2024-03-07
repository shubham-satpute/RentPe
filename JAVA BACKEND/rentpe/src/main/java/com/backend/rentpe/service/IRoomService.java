package com.backend.rentpe.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

import org.springframework.web.multipart.MultipartFile;

import com.backend.rentpe.model.Hotel;
import com.backend.rentpe.model.Room;
import com.backend.rentpe.response.BookingResponse;
import com.backend.rentpe.response.RoomResponse;

public interface IRoomService {

	List<String> getAllRoomTypes();

	List<RoomResponse>getAllRooms();

	void deleteRoom(Long roomId);

	RoomResponse getRoomById(Long roomId);

	Room updateRoom(Long roomId, MultipartFile photo, String roomNo, String roomType, double roomPrice, int capacity,Long hotelId) throws SerialException, SQLException, IOException;

	List<RoomResponse> getAllRoomById(Long hotelId);

	Room addNewRoom(MultipartFile photo, String roomNo, String roomType, double roomPrice, int capacity, Long hotelId)
			throws IOException, SerialException, SQLException;

}
