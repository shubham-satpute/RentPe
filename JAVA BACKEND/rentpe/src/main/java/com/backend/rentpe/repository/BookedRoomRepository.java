package com.backend.rentpe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.rentpe.model.BookedRoom;
import com.backend.rentpe.model.Room;


public interface BookedRoomRepository extends JpaRepository<BookedRoom,Long> {
	List<BookedRoom> getByRoom(Room room);
}
