import React from "react";
import { Container } from "react-bootstrap";
import { SiYourtraveldottv } from "react-icons/si";

const Parallax = () => {
  return (
    <div className="parallax mb-5">
      <Container className="text-center px-5 py-5 justify-content-center">
        <div className="animated-texts bounceIn">
          <h1>
            Experience Best Hospitality
            <span className="hotel-color">
              {" "}
              Rentpe <SiYourtraveldottv />
            </span>
          </h1>
          <h3>We offer the best services for all your needs.</h3>
        </div>
      </Container>
    </div>
  );
};

export default Parallax;
