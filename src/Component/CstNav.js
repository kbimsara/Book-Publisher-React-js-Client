import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';


export default function CstNav() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" sticky="top" className="bg-body-tertiary justify-content-center" bg="dark" data-bs-theme="dark">
                <Container className="justify-content-end">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto justify-content-center flex-grow-1 pe-3">
                            <Nav.Link href="home">Home</Nav.Link>
                            <Nav.Link href="login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    )
}
