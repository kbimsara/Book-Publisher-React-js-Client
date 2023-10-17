import Carousel from 'react-bootstrap/Carousel';
import Img1 from './img/img-book.jpg';

export default function ImgBanner() {
    return (
        <>
            <img src={Img1} alt='Banner' className='d-block w-100' text="First slide" />
        </>
    )
}
