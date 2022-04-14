import React from "react";
import {Container,Row,Col,Card} from 'reactstrap'
import {MdOutlineFacebook} from 'react-icons/md'
import {FaInstagram,FaYoutube,FaTwitter} from 'react-icons/fa'


const Socials = () => {
    return (
        <div>
        <h2>Follow us on social media</h2>
            <Container>
                <Row noGutters className="text-center">
                   <Col className="justify-content-center"
                        style={
                            {padding: '30px'
                            
                        }
                        }>
                            <div>
                            <MdOutlineFacebook class="inline-block p-7 rounded-full w-20 mx-auto" color=" darkblue" fontSize="3.5em"/>
                            <FaInstagram class="inline-block p-7 rounded-full w-20 mx-auto" color=" pink" fontSize="3.5em"/>
                            <FaTwitter class="inline-block p-7 rounded-full w-20 mx-auto" color=" lightblue" fontSize="3.5em"/>
                            <FaYoutube class="inline-block p-7 rounded-full w-20 mx-auto" color=" red" fontSize="3.5em"/>
                            </div>
                       
                    </Col>
                    
                    
                    
                </Row>   
            </Container>
        </div>
    );
  };
  
  export default Socials;