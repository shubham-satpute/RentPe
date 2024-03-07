
import React, { useState } from 'react'
import { addPackage } from '../utils/PackageApiFunctions'
import { Link } from 'react-router-dom'
import { GiReturnArrow } from 'react-icons/gi'
import StateSelector from '../common/StateSelector'
import Packages from './Packages'
const AddPackage = () => {
    const [newPackage, setNewPackage] = useState({
        photo: null,
        name: "",
        price: "",
        days: "",
        city: "",
        state: "",
        description: ""
    })
    const [imagePrivew, setImagePrivew] = useState('')
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handlePackageInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value

        setNewPackage({ ...newPackage, [name]: value })
    }

    function handleImageChange(e) {

        const selectedImage = e.target.files[0]
        setNewPackage({ ...newPackage, photo: selectedImage })
        setImagePrivew(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addPackage(newPackage.photo, newPackage.name, newPackage.price, newPackage.days, newPackage.city, newPackage.state, newPackage.description)
            if (success !== undefined) {
                setSuccessMessage("A new package was added")
                setNewPackage({
                    photo: null,
                    name: "",
                    price: "",
                    days: "",
                    city: "",
                    state: "",
                    description: ""
                })
                setImagePrivew("")
                setErrorMessage("")
            } else {
                setErrorMessage("error in adding package")
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
                        <h2 className='mt-5 mb-2'>Add New Package</h2>
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
                                <label htmlFor='packageName' className='form-lable'>Package Name</label>
                                <input type='text' className='form-control' required id='packageName' name='name' value={newPackage.name} onChange={handlePackageInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='packagePrice' className='form-lable'>Price</label>
                                <input type='number' className='form-control' required id='packagePrice' name='price' value={newPackage.price} onChange={handlePackageInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='days' className='form-lable'>Days</label>
                                <input type='number' className='form-control' required id='days' name='days' value={newPackage.days} onChange={handlePackageInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='city' className='form-lable'>City</label>
                                <input type='text' className='form-control' required id='city' name='city' value={newPackage.city} onChange={handlePackageInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='state' className='form-lable'>State</label>
                                <StateSelector handleInputChange={handlePackageInputChange} el={newPackage}/>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='description' className='form-lable'>Description</label>
                                <textarea className='form-control' required id='description' name='description' value={newPackage.description} onChange={handlePackageInputChange} ></textarea>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='photo' className='form-lable'>Package Photo</label>
                                <input type='file' className='form-control' required id='photo' name='photo' onChange={handleImageChange} />
                                <br />
                                {
                                    imagePrivew &&
                                    <img src={imagePrivew}
                                        alt='preview package photo'
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className='mb-3' />
                                }
                            </div>
                            <div className='d-grid d-md-flex mt-2'>
                                <Link to={`/plans`} className='btn btn-outline-primary ml-5'><GiReturnArrow /></Link>
                                <pre style={{ display: "inline" }}> </pre>
                                <button type='submit' className='btn btn-outline-primary ml-5' >Save Package</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddPackage