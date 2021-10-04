import React from 'react'
import './Friend.css'
// import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Container } from 'react-bootstrap'
// import Button from 'react-bootstrap/Button'


export default function Friend(props) { 
    return (
        // <div className="card">
        //     <div className="card-body">
        //         <img className="card-img" src={props.img} alt="Avatar" />
        //         <h2 className="card-name">{props.name}</h2>
        //         {/* <p className="card-description">{props.description}</p> */}
        //         <div className="button">
        //             <button onClick={ () =>alert ('❤️❤️❤️') } className="card-btn btn btn-outline-info ">❤️</button>
        //             <button onClick={ () =>alert ('follow-me') }className="card-btn btn btn-outline-info">Follow</button>
        //         </div>
        //     </div>

        // </div>

        // <Container>
        //     <Row md={4}>

        //         <Col>1 of 3</Col>
        //         <Col xs={6}>2 of 3</Col>
        //         <Col>3 of 3</Col>
        //     </Row>
        // </Container>

        // <Container xs={1} md={2} className="g-4">
        //         <Col>
        //             <Card>
        //                 {/* <Card.Img variant="top" src={props.img}/> */}
        //                 <Card.Body>
        //                     <img className="card-img" src={props.img} alt="Avatar" />
        //                     <Card.Title>{props.name}</Card.Title>
        //                     <button onClick={() => alert('❤️❤️❤️')} className="card-btn btn btn-outline-info ">❤️</button>
        //                     <button onClick={() => alert('follow-me')} className="card-btn btn btn-outline-info">Follow</button>
        //                 </Card.Body>
        //             </Card>
        //         </Col>

        // </Container>
        <Container>
            <Row>
                <Col xs><Card style={{ width: '18rem', border:'none'}}>
                    {/* <Card.Img variant="top" src={props.img} alt="Avatar" /> */}
                    <Card.Body>
                        <img className="card-img" src={props.img} alt="Avatar" />
                        <Card.Title>{props.name}</Card.Title>
                        <button onClick={() => alert('❤️❤️❤️')} className="card-btn btn btn-outline-info ">❤️</button>
                        <button onClick={() => alert('follow-me')} className="card-btn btn btn-outline-info">Follow</button>
                    </Card.Body>
                </Card></Col>
                
                {/* <Col xs={{ order: 12 }}>Second, but last</Col>

                <Col xs={{ order: 1 }}>Third, but second</Col> */}
            </Row>

        </Container>


    )
}
