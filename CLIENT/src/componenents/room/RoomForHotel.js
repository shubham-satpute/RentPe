import React, { useEffect, useState } from 'react'
import { deleteRoom, getAllRooms, getAllRoomsById } from '../utils/RoomApiFunctions'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'
import { Link, useParams } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { RiAddCircleFill } from "react-icons/ri";
import { Row, Col } from 'react-bootstrap'
import AddToCart from '../bookings/AddToCart'

const RoomForHotel = () => {
    const [rooms, setRooms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage, setRoomsPerPage] = useState(5)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredRooms, setFilteredRooms] = useState([])
    const [selectedRoomType, setSelectedRoomType] = useState("")
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const {hotelId,pid}=useParams();
    const fetchRooms = async () => {
        setIsLoading(true)
        try {
            const result = await getAllRoomsById(hotelId)
            setRooms(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        fetchRooms()
    }, [])

    useEffect(() => {
        if (selectedRoomType !== "") {
            const filterdRooms = rooms.filter((room) => room.roomType.toLowerCase().inclueds(selectedRoomType.toLowerCase()))
            setFilteredRooms(filterdRooms)
        } else {
            setFilteredRooms(rooms)
        }
        setCurrentPage(1)
    }, [rooms, selectedRoomType])

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms / roomsPerPage)
    }

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const addToCart = (room) => {
        try {
            const response = AddToCart(pid,room,5,hotelId)
            setSuccessMessage("Room added to cart")
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)
    return (
        <>
            {isLoading ? (
                <p>Loading rooms</p>
            ) : (
                <>
                    <section className='mt-3  container'>
                        {successMessage && (

                            <div className="alert alert-success fade show" role="alert">
                                {successMessage}
                            </div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger fade show" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        <div className='d-flex justify-content-center mb-3 mt-2'>
                            <h2 className='mt-2 mb-2'>Rooms</h2>
                        </div>
                        <Row>
                            <Col md={12} className='mb-3 mb-md-0'>
                                <RoomFilter data={rooms} setFilteredData={setFilteredRooms}></RoomFilter>
                            </Col>
                        </Row>
                        <table className='table table-borderd table-hover'>
                            <thead>
                                <tr className='text-center'>
                                    <th>Room Number</th>
                                    <th>Room Type</th>
                                    <th>Room Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentRooms.map((room) => {
                                        return (
                                            <tr key={room.id} className='text-center'>
                                                <td>{room.roomNo}</td>
                                                <td>{room.roomType}</td>
                                                <td>{room.roomPrice}</td>
                                                <td>
                                                    <button onClick={()=>addToCart(room)} className='btn btn-success'>Add</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className='d-flex justify-content-center '>
                            <RoomPaginator currentPage={currentPage} totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)} onPageChange={handlePaginationClick} ></RoomPaginator>
                        </div>
                    </section>

                </>
            )}
        </>
    )
}

export default RoomForHotel