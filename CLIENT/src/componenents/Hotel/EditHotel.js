
import React, { useEffect, useState } from 'react'
import { addRoom, getRoomDetails, updateRoom } from '../utils/RoomApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelectror'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import { GiReturnArrow } from "react-icons/gi";
import StateSelector from '../common/StateSelector';
import CitySelector from '../common/CitySelector';
import { getHotelDetails, updateHotel } from '../utils/HotelApiFunctions';
const EditHotel = () => {
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

    const handleHotelInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value

        setHotel({ ...hotel, [name]: value })
    }
  
    const getData = async () => {
        try {
            const success = await getHotelDetails(hotelId)
            setHotel(success)
            setImagePrivew("data:image/png;base64,"+success.image)
            setErrorMessage("")
        } catch (error) {
            console.log(error)
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        
        getData()
    }, [hotelId]) 

    function handleImageChange(e) {

        const selectedImage = e.target.files[0]
        setHotel({ ...hotel, image: selectedImage })
        setImagePrivew(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (hotel.password !== hotel.cPassword) {
            setErrorMessage("Confirmed password must be same")
        }
        else {
            try {
                const success = await updateHotel(hotelId,hotel)
                if (success !== undefined) {
                    setSuccessMessage("A hotel was updated")
                    setHotel({
                        image: "",
                        name: "",
                        contactNo: "",
                        email: "",
                        street: "",
                        city: "",
                        state: "",
                        password: "",
                        cPassword:""
                    })
                    setImagePrivew("")
                    setErrorMessage("")
                } else {
                    setErrorMessage("error in updating hotel")
                }
            } catch (error) {
                setErrorMessage(error.message)
            }
        }
    }

    setTimeout(() => {
        setSuccessMessage("")
        setErrorMessage("")
    }, 10000)
    return (
        <>
            <section className='container,mt-5 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <h2 className='mt-5 mb-2'>Edit Hotel</h2>
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
                                <label htmlFor='name' className='form-lable'>Name</label>
                                <input type='text' className='form-control' required id='name' name='name' value={hotel.name} onChange={handleHotelInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='contactNo' className='form-lable'>Contact No</label>
                                <input type='tel' maxLength={12} className='form-control' required id='contactNo' name='contactNo' value={hotel.contactNo} onChange={handleHotelInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='email' className='form-lable'>Email</label>
                                <input type='email' className='form-control' required id='email' name='email' value={hotel.email} onChange={handleHotelInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='street' className='form-lable'>Steet</label>
                                <input type='text' className='form-control' required id='street' name='street' value={hotel.street} onChange={handleHotelInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='city' className='form-lable'>City</label>
                                <div>
                                    <CitySelector handleHotelInputChange={handleHotelInputChange} hotel={hotel}></CitySelector>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label className='form-lable'>State</label>
                                <StateSelector el={hotel} handleInputChange={handleHotelInputChange}/>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='password' className='form-lable'>Password</label>
                                <input type='password' className='form-control' required id='password' name='password' value={hotel.password} onChange={handleHotelInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='cPassword' className='form-lable'>Confirmed Password</label>
                                <input type='password' className='form-control' required id='cPassword' name='cPassword' value={hotel.cPassword} onChange={handleHotelInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='image' className='form-lable'>Hotel Image</label>
                                <input type='file' className='form-control' required id='image' name='image' onChange={handleImageChange} />
                                <br />
                                {
                                    imagePrivew &&
                                    <img src={imagePrivew}
                                        alt='preview hotel photo'
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className='mb-3' />
                                }
                            </div>
                            
                            <div className='d-grid d-md-flex mt-2'>
                            <Link to={`/hotel-details/${hotel.id}`} className='btn btn-outline-primary ml-5'><GiReturnArrow /></Link>
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

export default EditHotel