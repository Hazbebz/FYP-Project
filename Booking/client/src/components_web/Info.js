import React from "react";
import img1 from './images/drinks.jpg'
import img2 from './images/food.jpg'
import img3 from './images/atmosphere.jpg'
import {Container,Row,Col,Card} from 'reactstrap'

//info component contains card with dummy
//information for Food, Drinks and atmosphere
const Info = () => {
    return (
        <div>
        <h2>Enjoy</h2>
            <Container>
                <Row className="justify-content-center" fluid xs = "3"
                    style={
                        {padding: '30px'}
                    }
                >
                   
                   <Col class="rounded-lg">
                            <Card>
                                <h2>The Food</h2>
                                <img className="card-img" src={img1}></img>
                                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a 
                                </p>
                            </Card>
                        
                    </Col>
                    
                    <Col class="rounded-lg">
                        <Card>
                        <h2>Drinks
                        </h2>
                        <img className="card-img" src={img2}></img>
                        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a 
                        </p>
                        </Card>
                    </Col>

                    <Col class="rounded-lg">
                        <Card>
                        <h2>The Atmosphere
                        </h2>
                        <img className="card-img" src={img3}></img>
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
  
  export default Info;