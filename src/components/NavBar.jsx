import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap'

export const NavBar = () => {
  return (
    <div className='contNavBar'>
      <div className='NavBar'>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto gap-4">
                <Link to={"/productos"}>Todos Los Productos</Link>
                <Link to={"/categoria/indumentaria"}>Categoria Indumentaria</Link>
                <Link to={"/categoria/joyas"}>Categoria Joyas</Link>
                <Link to={"/categoria/computacion"}>Categoria Computacion</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <hr />
    </div>
  )
}
