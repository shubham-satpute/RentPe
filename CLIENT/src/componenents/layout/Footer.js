import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  let today = new Date();
  return (
    <footer className=" text-light py-3 footer">
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <p>Copyright &copy; {today.getFullYear()} Rentpe</p>
          </Col>
        </Row>
        <Row>
          <a href="/contact-us">Contact Us</a>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
