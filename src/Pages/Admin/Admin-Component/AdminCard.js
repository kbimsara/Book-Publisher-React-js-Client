import React from 'react'
import { Button, Card } from 'react-bootstrap'
import Img1 from '../../../Component/Cardimg/cover1.jpg';
import './AdminCard.css';
import { Link } from 'react-router-dom';

export default function AdminCard(props) {
  return (
    <>
      <Card style={{ width: '18rem' }} className='m-3 cst-card'>
        {/* <Card.Img variant="top" src={{Img}} /> */}
        <img src={props.img} alt='Cover' className='d-block w-100 card-img' />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            published Data : {props.time.slice(0, 10)}
          </Card.Text>
          <center>
            <Button type='submit' variant="outline-danger" size="sm" onClick={props.onDelete}>Delete Book</Button>
            <Link to={`/edit/book/${props.id}`}>
              <Button variant="outline-success" size="sm" className='m-1'>Edit Book</Button>
            </Link>
          </center>
        </Card.Body>
      </Card>
    </>
  )
}
