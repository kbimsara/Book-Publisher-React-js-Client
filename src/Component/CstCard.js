import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Img1 from './Cardimg/cover1.jpg';
import './CstCard.css';

export default function CstCard(props) {
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
        </Card.Body>
      </Card>
    </>
  )
}
