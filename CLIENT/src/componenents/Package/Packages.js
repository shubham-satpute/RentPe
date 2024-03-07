import React, { useEffect, useState } from "react"
import { getAllPackages } from "../utils/PackageApiFunctions"
import { Col, Container, Row } from "react-bootstrap"
import RoomFilter from "../common/RoomFilter"
import PackageCard from "./PackageCard"
import PackagePaginator from "../common/PackagePaginator"
import PackageFilter from "../common/PackageFilter"

const Packages = () => {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [packagePerPage] = useState(5)
	const [filteredData, setFilteredData] = useState([{ id: "" }])

	useEffect(() => {
		setIsLoading(true)
		getAllPackages()
			.then((data) => {
				setData(data)
				setFilteredData(data)
				setIsLoading(false)
			})
			.catch((error) => {
				setError(error.message)
				setIsLoading(false)
			})
	}, [])
	if (isLoading) {
		return <div>Loading packages.....</div>
	}
	if (error) {
		return <div className=" text-danger">Error : {error}</div>
	}

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const totalPages = Math.ceil(filteredData.length / packagePerPage)

	const renderPackages = () => {
		const startIndex = (currentPage - 1) * packagePerPage
		const endIndex = startIndex + packagePerPage
		return filteredData
			.slice(startIndex, endIndex)
			.map((packages) => <PackageCard key={packages.id} packages={packages} />)
	}

	return (
		<Container className="mt-5">
			<Row>
				<Col md={6} className="mb-3 mb-md-0">
					<PackageFilter data={data} setFilteredData={setFilteredData} />
				</Col>
			</Row>
			<hr></hr>
			<Row>{renderPackages()}</Row>
			<hr></hr>
			<Row>
				<Col md={6} className="d-flex align-items-center justify-content-end">
					<PackagePaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>
		</Container>
	)
}

export default Packages
