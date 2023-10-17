import React, { useEffect, useState } from 'react'
import './Login.css'
import CstNav from '../Component/CstNav'
import CstFooter from '../Component/CstFooter'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const url = 'http://127.0.0.1:8000/api/user/mail/';
  const [data, setData] = useState({
    email: '',
    pw: ''
  });
  const [apiData, setApiData] = useState('');
  const navigate = useNavigate();

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  async function check(e) {
    e.preventDefault();
    try {
      const response = await axios.get(url + data.email);
      const responseData = response.data[0];
      setApiData(responseData);

      if (responseData.email === data.email && responseData.pw === data.pw) {
        console.log('Match');
        sessionStorage.setItem("userID",responseData.id);
        sessionStorage.setItem("userEmail",data.email);
        var em=sessionStorage.getItem("userEmail");
        var id=sessionStorage.getItem("userID");
        console.log('email:'+id+':'+em);
        navigate('/adminHome');
      } else {
        console.log('Not-Match');
        // console.log(res.data)
        Swal.fire({
            title: 'Warning !',
            text: "Please check Both fields or Create new account",
            icon: 'error'
          });
      }
    } catch (err) {
      console.log(err);
      // console.log(res.data)
      Swal.fire({
          title: 'Warning !',
          text: err,
          icon: 'error'
        });
    }
  }

  // useEffect to watch for changes in apiData
  useEffect(() => {
    // console.log(apiData); // This will show the updated apiData whenever it changes.
  }, [apiData]);

  return (
    <>
      <CstNav />
      <Container fluid>
        <Row className='d-flex justify-content-center'>
          <center>
            <Col className='login col-11 col-sm-8 col-lg-4 col-xl-4'>
              <h2 className='text-light'>Login</h2>
              <Form onSubmit={(e) => check(e)}>
                <Form.Group className="mb-3 text-light" controlId="exampleForm.ControlInput1">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" onChange={(e) => handle(e)} id='email' value={data.email} />
                </Form.Group>
                <Form.Group className="mb-3 text-light">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="text" placeholder="Enter Here Your Password" onChange={(e) => handle(e)} id='pw' value={data.pw} />
                  <a href='createacc' className='text-light'>Create new Publisher Account</a>
                </Form.Group>
                <Button type='submit' variant="outline-light" className='btn'>Login</Button>
              </Form>

            </Col>
          </center>
        </Row>
      </Container>
      {/* <CstFooter /> */}
    </>
  )
}
