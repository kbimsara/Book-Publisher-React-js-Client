import React, { useState } from 'react'
import './CreateAcc.css';
import CstNav from '../Component/CstNav'
import CstFooter from '../Component/CstFooter'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export default function CreateAcc() {

    const url = "http://127.0.0.1:8000/api/user";
    const [data, setData] = useState({
        name: "",
        email: "",
        pw: "",
        location: ""
    })
    function submit(e) {
        e.preventDefault();
        const result = axios.post(url, {
            name: data.name,
            email: data.email,
            pw: data.pw,
            location: data.location
        }).then(
            res => {
                // console.log(res.data)
                Swal.fire({
                    title: 'Account Created',
                    text: res.data,
                    icon: 'success'
                  })

            }
        ).catch(err=>{
            Swal.fire({
                title: 'Something went wrong',
                text: err,
                icon: 'error'
              })

        })

    }
    function handle(e) {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }

    return (
        <>
            <CstNav />
            <Container fluid>
                <Row className='d-flex justify-content-center'>
                    <center>
                        <Col className='login col-11 col-sm-8 col-lg-4 col-xl-4'>
                            <h2 className='text-light'>Create Publisher Account</h2>
                            <Form onSubmit={(e) => submit(e)}>
                                <Form.Group className="mb-3 text-light">
                                    <Form.Label>Publisher Name</Form.Label>
                                    <Form.Control type="text" placeholder="Jhone Wick" onChange={(e) => handle(e)} id='name' value={data.name} />
                                </Form.Group>
                                <Form.Group className="mb-3 text-light" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com" onChange={(e) => handle(e)} id='email' value={data.email} />
                                </Form.Group>
                                <Form.Group className="mb-3 text-light">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Here Your Password" onChange={(e) => handle(e)} id='pw' value={data.pw} />
                                </Form.Group>
                                <Form.Group className="mb-3 text-light">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="text" placeholder="Canada" onChange={(e) => handle(e)} id='location' value={data.location} />
                                </Form.Group>
                                <Button type='submit' variant="outline-light" className='btn'>Create Account</Button>
                            </Form>

                        </Col>
                    </center>
                </Row>
            </Container>
            <CstFooter />
        </>
    )
}
