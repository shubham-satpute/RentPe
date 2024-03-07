
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiReturnArrow } from 'react-icons/gi'
import { addHotel, getHotelCity } from '../utils/HotelApiFunctions'
import CitySelector from '../common/CitySelector'
import StateSelector from '../common/StateSelector'
import { DataList } from 'react-datalist-field'
const AddHotel = () => {
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

    const handleHotelInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value

        setHotel({ ...hotel, [name]: value })
    }

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
                const success = await addHotel(hotel.image, hotel.name, hotel.contactNo, hotel.email, hotel.street, hotel.city, hotel.state, hotel.password)
                if (success !== undefined) {
                    setSuccessMessage("A new room was added")
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
                    setErrorMessage("error in adding room")
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
                        <h2 className='mt-5 mb-2'>Add New Hotel</h2>
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
                                <label htmlFor='state' className='form-lable'>State</label>
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
                                <Link to={`/existing-hotels`} className='btn btn-outline-primary ml-5'><GiReturnArrow /></Link>
                                <pre style={{ display: "inline" }}> </pre>
                                <button type='submit' className='btn btn-outline-primary ml-5' >Save Hotel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddHotel