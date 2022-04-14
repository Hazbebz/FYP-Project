import React from "react";
import {Row, Col,Button } from "reactstrap";

//import all required components
import About from "./About";
import Info from "./Info";
import Contact from "./Contact"
import Socials from "./Socials.js";


export default props => {
    return (
      <div class="about">
          <div class="Info">
              <Row noGutters className="text-center">
              <Col>
              <h1>Pub Name</h1>
              <hr></hr> 
              </Col>
              </Row>
            <div>
        <Row noGutters className="text-center">
          <Col>
            <Button
              color="none"
              className="book-btn"
              onClick={_ => {
                props.setPage(1);
              }}
            >
              Book a Table
            </Button>
          </Col>
        </Row>
       {/*Div contains all of the components required for the main page
              Components:
                          About
                          Info
                          Contact
                          Socials
       */}
      </div>
              <About/>
              <Info/>
              <Contact/>
              
              <Row noGutters className="text-center">
                <Col>
                  <Button
                    color="none"
                    className="book-btn"
                    onClick={_ => {
                      props.setPage(1);
                    }}
                  >
                    Book a Table
                  </Button>
                </Col>
              </Row>
              <Socials/>
              <Row noGutters className="text-center">
                    <Col>
                    <hr></hr> 
                    <h3>Swift</h3>
                    <p>Developed by: Harry Bebbington</p>
                    </Col>
              </Row>

              
          </div>
      </div>
    );
  };