import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

export default function AdminNav() {
  return (
    <>
        <Navbar collapseOnSelect expand="lg" sticky="top" className="bg-body-tertiary justify-content-center" bg="dark" data-bs-theme="dark">
            <Container className="justify-content-end">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto justify-content-center flex-grow-1 pe-3">
                        <Nav.Link href="adminHome">Home</Nav.Link>
                        <Nav.Link href="createbk">Publish</Nav.Link>
                        <Nav.Link href="logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>

  )
}
