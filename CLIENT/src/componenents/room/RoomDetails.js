import React, { useEffect, useState } from "react";
import { getRoomDetails } from "../utils/RoomApiFunctions";
import { Link, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaEdit } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";

const RoomDetails = () => {
    const [room, setRoom] = useState({
        photo: null,
        roomNo: "",
        roomType: "",
        roomPrice: "",
        capacity: ""
    })
    const [imagePrivew, setImagePrivew] = useState('')
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { roomId } = useParams()

    setTimeout(() => {
        setSuccessMessage("")
        setErrorMessage("")
    }, 10000)

    const loadImg =()=>{
        setImagePrivew("data:image/png;base64,"+room.photo)
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const success = await getRoomDetails(roomId)
                setRoom(success)
                setImagePrivew("data:image/png;base64,"+room.photo)
                setErrorMessage("")
            } catch (error) {
                console.log(error)
                setErrorMessage(error.message)
            }
        }
        getData()
    }, [roomId])

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
                            <Card.Header><h2>Room Details</h2></Card.Header>
                            <Card.Img variant="top" src={"data:image/png;base64,"+room.photo} alt='preview room photo'
                                loading="lazy"
                                className='mb-3'  />
                            <Card.Body>
                                <Card.Title>Room {room.roomNo}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item><b>Type</b> : {room.roomType}</ListGroup.Item>
                                <ListGroup.Item><b>Capacity</b> : {room.capacity}</ListGroup.Item>
                                <ListGroup.Item><b>Price</b> : {room.roomPrice}</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                            <Link to={`/existing-rooms`} className='btn btn-outline-primary ml-5'><GiReturnArrow /></Link>
                            <pre style={{ display: "inline" }}> </pre>
                                <Link to={`/room-update/${room.id}`} className='btn btn-warning ml-5' ><FaEdit /></Link>
                                
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RoomDetails