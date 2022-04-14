import React from "react";
import {Container,Row,Col,Card} from 'reactstrap'
import { SiMinutemailer } from 'react-icons/si';
import {FaPhone,FaLocationArrow} from 'react-icons/fa';


//contains contact cards for location, email and phone
const Contact = () => {
    return (
        <div>
        <h2>Contact Us</h2>
            <Container>
                <Row className="justify-content-center" fluid xs = "3"
                    style={
                        {padding: '30px'}
                    }
                >
                   
                   <Col class="rounded-lg">
                            <Card>
                                <h2>Find Us Here</h2>
                               <FaLocationArrow class="inline-block p-7 rounded-full w-20 mx-auto" color=" #008080" fontSize="3.5em"/>
                                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a 
                                </p>
                            </Card>
                        
                    </Col>
                    
                    <Col class="rounded-lg">
                        <Card>
                        <h2>Give us a Call</h2>
                        <FaPhone class="inline-block p-7 rounded-full w-20 mx-auto" color="#f5deb3" fontSize="3.5em"/>
                        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a 
                        </p>
                        </Card>
                    </Col>

                    <Col class="rounded-lg">
                        <Card>
                        <h2>Email</h2>
                        <SiMinutemailer class="inline-block p-7 rounded-full w-20 mx-auto" color=" #77202f" fontSize="3.5em"/>
                        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a 
                        </p>
                        </Card>
                    </Col>
                    
                    
                </Row>   
            </Container>
        </div>
    );
  };
  
  export default Contact;