
import React, { useEffect, useState } from 'react'
import { addRoom, getRoomDetails, updateRoom } from '../utils/RoomApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelectror'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import { GiReturnArrow } from "react-icons/gi";
const EditRoom = () => {
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

    useEffect(() => {
        const getData = async () => {
            try {
                const success = await getRoomDetails(roomId)
                setRoom(success)
                setImagePrivew("data:image/png;base64,"+success.photo)
                setErrorMessage("")
            } catch (error) {
                console.log(error)
                setErrorMessage(error.message)
            }
        }
        getData()
    }, [roomId])

    const handleRoomInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value

        setRoom({ ...room, [name]: value })
    }

    function handleImageChange(e) {
    
        const selectedImage = e.target.files[0]
        setRoom({ ...room, photo: selectedImage })
        setImagePrivew(URL.createObjectURL(selectedImage))
    }

    const loadImg =()=>{
        setImagePrivew("data:image/png;base64,"+room.photo)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await updateRoom(roomId,room)
            if (success !== undefined) {
                setSuccessMessage("A new room was added")
                setImagePrivew("")
                setErrorMessage("")
                
            } else {
                setErrorMessage("error in adding room")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    setTimeout(() => {
        setSuccessMessage("")
        setErrorMessage("")
        redirect()
    }, 10000)
    
    return (
        <>
            <section className='container,mt-5 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <h2 className='mt-5 mb-2'>Edit Room</h2>
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
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor='roomType' className='form-lable'>Room Type</label>
                                <div>
                                    <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={room}></RoomTypeSelector>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <input type='hidden' className='form-control' required id='roomNo' name='hotelId' value={room.hotelId} readOnly />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='roomNo' className='form-lable'>Room No</label>
                                <input type='text' className='form-control' required id='roomNo' name='roomNo' value={room.roomNo} readOnly />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='capacity' className='form-lable'>Room Capacity</label>
                                <input type='number' className='form-control' required id='capacity' name='capacity' value={room.capacity} onChange={handleRoomInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='roomPrice' className='form-lable'>Room Price</label>
                                <input type='number' className='form-control' required id='roomPrice' name='roomPrice' value={room.roomPrice} onChange={handleRoomInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='photo' className='form-lable'>Room Photo</label>
                                <input type='file' className='form-control' required id='photo' name='photo' onChange={handleImageChange} />
                                <br />
                                {
                                     imagePrivew &&
                                    <img src={imagePrivew}
                                        alt='preview room photo'
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className='mb-3' />
                                }
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
                            </div>
                            
                            <div className='d-grid d-md-flex mt-2'>
                            <Link to={`/room-details/${room.id}`} className='btn btn-outline-primary ml-5'><GiReturnArrow /></Link>
                            <pre style={{ display: "inline" }}> </pre>
                                <button type='submit' className='btn btn-outline-primary ml-5' >Save Changes</button>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditRoom