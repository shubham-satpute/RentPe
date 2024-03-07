import React, { useEffect, useState } from 'react'
import PackageFilter from '../common/PackageFilter'
import PackagePaginator from '../common/PackagePaginator'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { RiAddCircleFill } from "react-icons/ri";
import { Row, Col } from 'react-bootstrap'
import { deletePackage, getAllPackages } from '../utils/PackageApiFunctions'
import { FaEdit } from 'react-icons/fa';

const ExistingPackage = () => {
    const [packages, setPackages] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [packagesPerPage, setPackagesPerPage] = useState(5)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredPackages, setFilteredPackages] = useState([])
    const [selectedPackageCity, setSelectedPackageCity] = useState("")
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const fetchPackages = async () => {
        setIsLoading(true)
        try {
            const result = await getAllPackages()
            setPackages(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        fetchPackages()
    }, [])

    useEffect(() => {
        if (selectedPackageCity !== "") {
            const filterdPackages = packages.filter((p) => p.city.toLowerCase().inclueds(selectedPackageCity.toLowerCase()))
            setFilteredPackages(filterdPackages)
        } else {
            setFilteredPackages(packages)
        }
        setCurrentPage(1)
    }, [packages, selectedPackageCity])

    const calculateTotalPages = (filteredPackages, packagesPerPage, packages) => {
        const totalPackages = filteredPackages.length > 0 ? filteredPackages.length : packages.length
        return Math.ceil(totalPackages / packagesPerPage)
    }

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDelete = async (packageId) => {
        try {
            const response = await deletePackage(packageId)

            if (response === "") {
                setSuccessMessage("Package deleted successfully")
                fetchPackages()
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    const indexOfLastPackage = currentPage * packagesPerPage
    const indexOfFirstPackage = indexOfLastPackage - packagesPerPage
    const currentPackages = filteredPackages.slice(indexOfFirstPackage, indexOfLastPackage)
    return (
        <>
            {isLoading ? (
                <p>Loading Packages</p>
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
                            <h2 className='mt-2 mb-2'>Existing Packages</h2>
                        </div>
                        <Row>
                            <Col md={10} className='mb-3 mb-md-0'>
                                <PackageFilter data={packages} setFilteredData={setFilteredPackages}></PackageFilter>
                            </Col>
                            <Col md={2} className='mb-3 mb-md-0'>
                                <Link to={`/add-package`} class="btn btn-info" style={{ alignItems: 'center' }}><RiAddCircleFill /> Add Package</Link>
                            </Col>
                        </Row>
                        <table className='table table-borderd table-hover'>
                            <thead>
                                <tr className='text-center'>
                                    <th>Package Name</th>
                                    <th>Days</th>
                                    <th>Desc</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentPackages.map((p) => {
                                        return (
                                            <tr key={p.id} className='text-center'>
                                                <td>{p.name}</td>
                                                <td>{p.days}</td>
                                                <td>{p.description}</td>
                                                <td>{p.city}</td>
                                                <td>{p.state}</td>
                                                <td>
                                                    <Link to={`/package-Edit/${p.id}`} className="btn btn-primary ">
                                                    <FaEdit />
                                                    </Link>
                                                    <> </>
                                                    <button className='btn btn-danger ' onClick={() => handleDelete(p.id)}>
                                                        <MdDelete />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className='d-flex justify-content-center '>
                            <PackagePaginator currentPage={currentPage} totalPages={calculateTotalPages(filteredPackages, packagesPerPage, packages)} onPageChange={handlePaginationClick} ></PackagePaginator>
                        </div>
                    </section>

                </>
            )}
        </>
    )
}

export default ExistingPackage