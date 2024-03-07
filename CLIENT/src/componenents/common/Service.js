import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import Header from "./Header"
import { RiHotelFill } from "react-icons/ri";
import { BsPersonRaisedHand } from "react-icons/bs";
import {
	FaParking,
	FaUtensils,
	FaWifi,
    FaCarSide
} from "react-icons/fa"

const Service = () => {
	return (
		<>
			<div className="mb-2">
				<Header title={"Our Services"} />
				<hr />

				<Row xs={1} md={2} lg={3} className="g-4 mt-2">
                <Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
                                <RiHotelFill />HotelBookings
								</Card.Title>
								<Card.Text>Book your favourite hotel and enjoy your holiday at your favourite place.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaWifi /> WiFi
								</Card.Title>
								<Card.Text>Stay connected with high-speed internet access.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaUtensils /> Food
								</Card.Title>
								<Card.Text>All food facility will be provided at your selected hotel.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
                                <FaCarSide /> Traveling
								</Card.Title>
								<Card.Text>We provide all traveling facility at your selected plan location. </Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaParking /> Parking
								</Card.Title>
								<Card.Text>Park your car conveniently in our on-site parking lot.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
                                <BsPersonRaisedHand />Local Guide
								</Card.Title>
								<Card.Text>To guide you at every step we provide local guide</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
			<hr />
		</>
	)
}

export default Service
