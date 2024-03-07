import React, { useContext } from "react"
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const PackageCard = ({ packages }) => {
    return (
        <Col key={packages.id} className="mb-4" xs={12}>
            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center">
                    <div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">
                        <Link to={`/book-package/${packages.id}`}>
                            <Card.Img
                                variant="top"
                                src={`data:image/png;base64, ${packages.photo}`}
                                alt="Package Photo"
                                style={{ width: "100%", maxWidth: "200px", height: "auto" }}
                            />
                        </Link>
                    </div>
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="room-price">{packages.name}</Card.Title>
                        <Card.Title className="room-price">{packages.price}/- Rs</Card.Title>
                        <Card.Title className="room-price">{packages.days}</Card.Title>
                        <Card.Text>{packages.description}</Card.Text>
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <Link to={`/book-package/${packages.id}`} className="btn btn-hotel btn-sm">
                            Book Now
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default PackageCard
