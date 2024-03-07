import React, { useEffect, useState } from 'react'
import { deleteHotel, getAllHotels } from '../utils/HotelApiFunctions'
import HotelFilter from '../common/HotelFilter'
import HotelPaginator from '../common/HotelPaginator'
import { Link, useParams } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { RiAddCircleFill } from "react-icons/ri";
import { Row, Col } from 'react-bootstrap'
import { getPackageDetails } from '../utils/PackageApiFunctions'

const ShowHotels = () => {
    const [hotels, setHotels] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [hotelsPerPage, setHotelsPerPage] = useState(5)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredHotels, setFilteredHotels] = useState([])
    const [selectedHotelCity, setSelectedHotelCity] = useState("")
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [packageDetails, setPackageDetails] = useState({})
    const { id } = useParams()
    const fetchHotels = async () => {
        setIsLoading(true)
        try {
            const result1 = await getPackageDetails(id)
            setPackageDetails(result1)
            const result = await getAllHotels()
            setHotels(result)
            setIsLoading(false)
            setSelectedHotelCity(packageDetails.city)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        fetchHotels()
    }, [])

    useEffect(() => {
        if (selectedHotelCity !== "") {
            const filterdHotels = hotels.filter((hotel) => hotel.city.toLowerCase() === packageDetails.city.toLowerCase())
            setFilteredHotels(filterdHotels)
        } else {
            setFilteredHotels(hotels)
        }
        setCurrentPage(1)
    }, [hotels, selectedHotelCity])

    const calculateTotalPages = (filteredHotels, hotelsPerPage, hotels) => {
        const totalHotels = filteredHotels.length > 0 ? filteredHotels.length : hotels.length
        return Math.ceil(totalHotels / hotelsPerPage)
    }

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDelete = async (hotelId) => {
        try {
            const response = await deleteHotel(hotelId)

            if (response === "") {
                setSuccessMessage("Hotel deleted successfully")
                fetchHotels()
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    const indexOfLastHotel = currentPage * hotelsPerPage
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage
    const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel)
    return (
        <>
            {isLoading ? (
                <p>Loading Hotels</p>
            ) : (
                <>
                    <section className='mt-2 mb-3 container'>
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
                            <h2 className='mt-2 mb-2'>Hotels In {packageDetails.city}</h2>
                        </div>

                        <table className='table table-borderd table-hover'>
                            <thead>
                                <tr className='text-center'>
                                    <th>Hotel Name</th>
                                    <th>Hotel ContactNo</th>
                                    <th>Street</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentHotels.map((hotel) => {
                                        return (
                                            <tr key={hotel.id} className='text-center'>
                                                <td>{hotel.name}</td>
                                                <td>{hotel.contactNo}</td>
                                                <td>{hotel.street}</td>
                                                <td>{hotel.city}</td>
                                                <td>{hotel.state}</td>
                                                <td>
                                                    <Link to={`/rooms/${hotel.id}/${id}`} className="btn btn-primary ">
                                                        Rooms
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className='d-flex justify-content-center '>
                            <HotelPaginator currentPage={currentPage} totalPages={calculateTotalPages(filteredHotels, hotelsPerPage, hotels)} onPageChange={handlePaginationClick} ></HotelPaginator>
                        </div>
                    </section>

                </>
            )}
        </>
    )
}

export default ShowHotels