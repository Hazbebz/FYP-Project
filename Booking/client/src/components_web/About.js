import React from "react";
import img1 from './images/diningRoom.webp'
import {Container,Row,Col,} from 'reactstrap'


//about componet that contains title, image and sample text
const About = () => {
    return (
        <div>
            
        <h2>About us</h2>
            <Container>
                <Row className="justify-content-center" fluid xs = "2"
                    style={
                        {padding: '30px'}
                    }
                >
                   
                        <Col class="rounded-lg" style={{
                            backgroundColor: '#2b6772',
                        }}>
                        
                        
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a 
                            type specimen book. It has survived not only five centuries, but also the 
                            leap into electronic typesetting, remaining essentially unchanged. It was 
                            popularised in the 1960s with the release of Letraset sheets containing Lorem 
                            Ipsum passages, and more recently with desktop publishing software like Aldus 
                            PageMaker including versions of Lorem Ipsum
                            </p>
                    
                        </Col>
                    
                    <Col class="rounded-lg">
                        <img src={img1} className = "about-img"></img>
                    </Col>
                </Row>   
            </Container>
        </div>
    );
  };
  
  export default About;