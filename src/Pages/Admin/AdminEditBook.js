import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNav from './Admin-Component/AdminNav';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AdminEditBook() {
    const { id } = useParams();
    const url = `http://127.0.0.1:8000/api/book/${id}`; // Updated the URL to include the id
    const updurl = `http://127.0.0.1:8000/api/book/${id}`; // Updated the URL to include the id

    const mail = sessionStorage.getItem("userEmail");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        img: "",
        id: "",
    });
    // const [formData, setFormData] = useState({
    //     title: "",
    //     img: "",
    //     id: "",
    // });

    useEffect(() => {
        if (mail == null) {
            navigate('/login');
        } else {
            getData();
        }
    }, []); // Removed [record] as a dependency since it's not necessary

    const getData = () => {
        axios.get(url)
            .then(function (res) {
                setFormData({ title: res.data[0].title,img: res.data[0].img,id: res.data[0].id }); // Updated to access the correct property
                console.log(res.data[0].title);
            }).catch(function (err) {
                console.log(err);
            });
    }
    const update = async () => {
        await axios.put(updurl, formData)
        .then(function(res){
                // console.log(res.data)
                Swal.fire({
                    title: 'Account Created',
                    text: res.data,
                    icon: 'success'
                  });
                  navigate('/adminHome');
        })
            .catch(function (err) {
                console.log(err);
            });
    }

    const setData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submitHandler = (e) => {
        e.preventDefault(); // Prevent the form from submitting and causing a page refresh
        // console.log(formData);
        update();
        // Add code to send the updated data to your API using axios
    }

    return (
        <>
            <AdminNav />
            <Container fluid className="ctr">
                <center>
                    <Row className="d-flex justify-content-center">
                        <Col className="login col-11 col-sm-8 col-lg-4 col-xl-4">
                            <h2 className="text-light">Edit Book Here</h2>
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3 text-light">
                                    <Form.Label>Book Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Book Title"
                                        id="title"
                                        name='title'
                                        value={formData.title} // Bind the input value to the state
                                        onChange={setData}
                                    />
                                </Form.Group>
                                <Button type="submit" variant="outline-light" className="btn">
                                    Update
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </center>
            </Container>
        </>
    );
}
