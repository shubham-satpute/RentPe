
import React, { useState } from 'react'
import { addRoom } from '../utils/RoomApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelectror'
import { Link, useParams } from 'react-router-dom'
import { GiReturnArrow } from 'react-icons/gi'
const AddRoom = () => {
    const [imagePrivew, setImagePrivew] = useState('')
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { id } = useParams()
    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomNo: "",
        roomType: "",
        roomPrice: "",
        capacity: "",
        hotelId:id
    })
    

    const handleRoomInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value

        setNewRoom({ ...newRoom, [name]: value })
    }

    function handleImageChange(e) {
    
        const selectedImage = e.target.files[0]
        setNewRoom({ ...newRoom, photo: selectedImage })
        setImagePrivew(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice, newRoom.roomNo, newRoom.capacity,newRoom.hotelId)
            if (success !== undefined) {
                setSuccessMessage("A new room was added")
                setNewRoom({
                    photo: null,
                    roomNo: "",
                    roomType: "",
                    roomPrice: "",
                    capacity: "",
                    hotelId:id
                })
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
    }, 3000)
    return (
        <>
            <section className='container,mt-5 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <h2 className='mt-5 mb-2'>Add New Room</h2>
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
                                    <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom}></RoomTypeSelector>
                                </div>
                            </div>
                            <div className='mb-3'>
                             <input type='number' hidden className='form-control' required id='hotelId' name='hotelId' value={newRoom.hotelId} onChange={handleRoomInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='roomNo' className='form-lable'>Room No</label>
                                <input type='text' className='form-control' required id='roomNo' name='roomNo' value={newRoom.roomNo} onChange={handleRoomInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='capacity' className='form-lable'>Room Capacity</label>
                                <input type='number' className='form-control' required id='capacity' name='capacity' value={newRoom.capacity} onChange={handleRoomInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='roomPrice' className='form-lable'>Room Price</label>
                                <input type='number' className='form-control' required id='roomPrice' name='roomPrice' value={newRoom.roomPrice} onChange={handleRoomInputChange} />
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
                            </div>
                            <div className='d-grid d-md-flex mt-2'>
                            <Link to={`/existing-rooms`} className='btn btn-outline-primary ml-5'><GiReturnArrow /></Link>
                            <pre style={{ display: "inline" }}> </pre>
                                <button type='submit' className='btn btn-outline-primary ml-5' >Save Room</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddRoom