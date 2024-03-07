import React, { useEffect, useState } from "react";
import { getRoomDetails } from "../utils/RoomApiFunctions";
import { Link, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaEdit } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { getHotelDetails } from "../utils/HotelApiFunctions";

const HotelDetails = () => {
    const [hotel, setHotel] = useState({
        image: null,
        name: "",
        contactNo: "",
        email: "",
        street: "",
        city: "",
        state: "",
        password: "",
        cPassword:""
    })
    const [imagePrivew, setImagePrivew] = useState('')
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { hotelId } = useParams()

    setTimeout(() => {
        setSuccessMessage("")
        setErrorMessage("")
    }, 10000)

    const loadImg =()=>{
        setImagePrivew("data:image/png;base64,"+hotel.image)
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const success = await getHotelDetails(hotelId)
                setHotel(success)
                setImagePrivew("data:image/png;base64,"+hotel.image)
                setErrorMessage("")
            } catch (error) {
                console.log(error)
                setErrorMessage(error.message)
            }
        }
        getData()
    }, [hotelId])

    return (
        <>
            <section className='container,mt-5 mb-5' on={loadImg}>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
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
                        <Card className='mt-5 mb-2' style={{ width: '40rem' }}>
                            <Card.Header><h2>Hotel Details</h2></Card.Header>
                            <Card.Img variant="top" src={"data:image/png;base64,"+hotel.image} alt='preview hotel photo'
                                loading="lazy"
                                className='mb-3'  />
                            <Card.Body>
                                <Card.Title> {hotel.name}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item><b>Contact No</b> : {hotel.contactNo}</ListGroup.Item>
                                <ListGroup.Item><b>Email</b> : {hotel.email}</ListGroup.Item>
                                <ListGroup.Item><b>Street</b> : {hotel.street}</ListGroup.Item>
                                <ListGroup.Item><b>City</b> : {hotel.city}</ListGroup.Item>
                                <ListGroup.Item><b>State</b> : {hotel.state}</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                            <Link to={`/existing-hotels`} className='btn btn-outline-primary ml-5'><GiReturnArrow /></Link>
                            <pre style={{ display: "inline" }}> </pre>
                                <Link to={`/hotel-update/${hotel.id}`} className='btn btn-warning ml-5' ><FaEdit /></Link>
                                
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HotelDetails