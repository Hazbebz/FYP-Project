import React from "react";
import { Row, Col } from "reactstrap";

//exports the confrimation page that users are met with upon making a booking
export default _ => {
  return (
    <div>
      <Row noGutters className="text-center">
        <Col>
        <h1>Pub Name</h1>
        <hr></hr>
          <p className="confirm-header">Your booking has been recieved</p>
        </Col>
      </Row>
    </div>
  );
};
