import React, { useEffect, useState } from 'react'
import AdminNav from './Admin-Component/AdminNav'
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import AdminCard from './Admin-Component/AdminCard'
import axios from 'axios';
import { Swal } from 'sweetalert2/dist/sweetalert2';

export default function AdminHome() {
  const delUrl = "http://127.0.0.1:8000/api/book";
  const baseUrl = "http://127.0.0.1:8000/api/book/2/";
  const id = sessionStorage.getItem("userID");
  const navigate = useNavigate();
  const [record, setRec] = useState([]);
  const mail = sessionStorage.getItem("userEmail");

  useEffect(() => {
    if (mail == null) {
      navigate('/login');
    } else {
      // Use template literals to construct the URL with the `id` parameter
      const url = `${baseUrl}${id}`;

      axios.get(url)
        .then(res => {
          setRec(res.data);
        })
        .catch(err => console.log(err))
    }
  }, [id, mail])

  const deleteBook = async (id) => {
    await axios
      .delete(`${delUrl}/${id}`) // Use the correct URL with the book ID
      .then((res2) => {
        Swal.fire({
          title: 'Book Deleted', // Change the success message
          text: res2.data,
          icon: 'success',
        });
        // Remove the deleted book from the state
        setRec((prevRecords) => prevRecords.filter((record) => record.id !== id));
      })
      .catch((err) => {
        Swal.fire({
          title: 'Something went wrong',
          text: err,
          icon: 'error',
        });
      });
  };


  return (
    <>
      <AdminNav />
      <Container fluid className='marginTop justify-content-md-center text-light'>
        <center>
          <h2>Published Books</h2>
          <form>
            <Row>
              {record.map((r) => (
                <Col key={r.id}>
                  <AdminCard title={r.title} id={r.bookID} img={r.img} time={r.updated_at} onDelete={() => deleteBook(r.bookID)} />
                </Col>
              ))}
            </Row>
          </form>
        </center>
      </Container>
    </>
  )
}
