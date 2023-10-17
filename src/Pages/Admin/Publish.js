import React, { useEffect, useState } from 'react';
import AdminNav from './Admin-Component/AdminNav';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';
import './Publish.css';

export default function Publish() {
  const id1 = sessionStorage.getItem('userID');
  const mail = sessionStorage.getItem('userEmail');
  const navigate = useNavigate();
  const bookApiUrl = 'http://127.0.0.1:8000/api/book';
  const imageUploadApiUrl = 'http://127.0.0.1:8000/api/book/upload';
  const [imgData, setImgData] = useState('');
  const [data, setData] = useState({
    title: '',
    id: '',
  });

  function submit(e) {
    e.preventDefault();
    // First, upload the image
    if (imgData) {
      const fData = new FormData();
      fData.append('img', imgData);
      axios
        .post(imageUploadApiUrl, fData)
        .then((res) => {
          const imgURL = res.data;
          // Then, create the book with the image URL
          axios
            .post(bookApiUrl, {
              title: data.title,
              img: imgURL,
              id: id1,
            })
            .then((res) => {
              Swal.fire({
                title: 'Book published!',
                text: res.data,
                icon: 'success',
              });
              navigate('/adminhome')
            })
            .catch((err) => {
              Swal.fire({
                title: 'Something went wrong',
                text: err,
                icon: 'error',
              });
            });
        })
        .catch((e) => {
          // console.error('Image upload error:', e);
          Swal.fire({
            title: 'Something went wrong',
            text: e,
            icon: 'error',
          });
        });
    }
  }

  function handle(e) {
    const newData = { ...data };
    if (e.target.type === 'file') {
      setImgData(e.target.files[0]);
    } else {
      newData[e.target.id] = e.target.value;
    }
    setData(newData);
  }

  useEffect(() => {
    if (mail == null) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <AdminNav />
      <Container fluid className="ctr">
        <center>
          <Row className="d-flex justify-content-center">
            <Col className="login col-11 col-sm-8 col-lg-4 col-xl-4">
              <h2 className="text-light">Save Book Here</h2>
              <Form onSubmit={(e) => submit(e)} encType="multipart/form-data">
                <Form.Group className="mb-3 text-light">
                  <Form.Label>Book Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Book Title"
                    onChange={(e) => handle(e)}
                    id="title"
                    value={data.title}
                  />
                </Form.Group>
                <Form.Group className="mb-3 text-light" controlId="exampleForm.ControlInput1">
                  <Form.Label>Book Image</Form.Label>
                  <Form.Control type="file" placeholder="Upload here" onChange={(e) => handle(e)} />
                </Form.Group>
                <Button type="submit" variant="outline-light" className="btn">
                  Publish New Book
                </Button>
              </Form>
            </Col>
          </Row>
        </center>
      </Container>
    </>
  );
}
