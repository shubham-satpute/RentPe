import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getHotelDetails } from "../utils/HotelApiFunctions";
import { GiReturnArrow } from "react-icons/gi";
import { getPackageDetails } from "../utils/PackageApiFunctions";

const Cart = () => {
    const [packages, setPackages] = useState({
        photo: null,
        name: "",
        price: "",
        days: "",
        city: "",
        state: "",
        description: ""
    })
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
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [cart,setCart]= useState([])
    const [RoomNos, setRoomNos] = useState('')
    const [totalAmt,setTotalAmt]=useState(0)

    const getBooking=()=>{
        if (cart === null) {
            setIsLoading(true)
        }else{
            setIsLoading(true)
            setCart(JSON.parse(localStorage.getItem("cart")))
            setIsLoading(false)
        }
    }

    const getData = async () => {
        try {
            const success = await getPackageDetails(+(cart[0].pId))
            const hotel= await getHotelDetails(+(cart[0].hotelId))
            setPackages(success)
            setHotel(hotel)
            setErrorMessage("")
        } catch (error) {
            console.log(error)
            setErrorMessage("no rooms selected yet")
        }
    }

    const getRoomNos=()=>{
        let RoomNos=''
        let totalAmt=packages.price
        for(let i=0;i<cart.length;i++){
            RoomNos=RoomNos+cart[i].roomNo+', '
            totalAmt=totalAmt+ ((+(cart[i].price))*(+(packages.days)))
        }
        setRoomNos(RoomNos)
        setTotalAmt(totalAmt)
    }

    useEffect(() => {
        if(cart===null)
            setErrorMessage("no rooms selected yet")
        else{
        getBooking()
        }
    }, [])

    useEffect(() => {
        getData()
    }, [cart])

    useEffect(() => {
        getRoomNos()
    }, [packages])

    const clearCart=()=>{
        localStorage.removeItem("cart")
        window.location.reload()
    }    

    return (
        <>{isLoading ? (
            <p>Loading Hotels</p>
        ) : (
            <section className='container,mt-5 mb-5' onChange={getBooking} >
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
                            <Card.Header><h2>Your Booking Details</h2></Card.Header>
                            <Card.Img variant="top" src={"data:image/png;base64," + packages.photo} alt='preview hotel photo'
                                loading="lazy"
                                className='mb-3' />
                            <Card.Body>
                                <Card.Title> {packages.name}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item><b>Hotel Name</b> : {hotel.name}</ListGroup.Item>
                                <ListGroup.Item><b>Room Nos</b> : {RoomNos}</ListGroup.Item>
                                <ListGroup.Item><b>Total Amount</b> : {totalAmt}</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <Link to={`/`} className='btn btn-outline-primary ml-5'><GiReturnArrow /></Link>
                                <pre style={{ display: "inline" }}> </pre>
                                <Link to={`/hotel-update/${cart}`} className='btn btn-warning ml-5' >Book</Link>
                                <> </>
                                <button type='submit' className='btn btn-outline-danger ml-5' onClick={clearCart}>Cancel</button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </section>)
}
        </>
    )
}

export default Cart;