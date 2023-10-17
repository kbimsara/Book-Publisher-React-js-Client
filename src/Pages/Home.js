import React, { useEffect, useState } from 'react'
import CstNav from '../Component/CstNav'
import ImgBanner from '../Component/ImgBanner'
import { Col, Container, Row } from 'react-bootstrap'
import CstCard from '../Component/CstCard'
import './Home.css';
import CstFooter from '../Component/CstFooter'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home() {

  const baseUrl = 'http://127.0.0.1:8000/api/book';
  const navigate = useNavigate();
  const [record, setRec] = useState([]);
  useEffect(() => {
    const url = `${baseUrl}`;

    axios.get(url)
      .then(res => {
        setRec(res.data);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <>
      <CstNav />
      <ImgBanner />
      <Container fluid className='marginTop justify-content-md-center text-light'>
        <center>
          <h2>Published Books</h2>
          <Row>
            {record.map((r) => (
              <Col key={r.id}>
                <CstCard title={r.title} img={r.img} time={r.updated_at}/>
              </Col>
            ))}
          </Row>
        </center>
      </Container>
      <CstFooter />
    </>
  )
}
