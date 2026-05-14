import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <Navbar bg="white" expand="lg" className="border-bottom py-3 shadow-sm">
      <Container>
        {/* Brand/Logo */}
        <Navbar.Brand 
          as={Link} 
          to="/list" 
          className="fw-bold text-dark" 
          style={{ letterSpacing: '-1px', fontSize: '1.4rem' }}
        >
          STUDENT<span className="text-primary">INFO</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* List Link */}
            <Nav.Link 
              as={Link} 
              to="/list" 
              className={`text-uppercase fw-semibold small px-3 ${location.pathname === '/list' ? 'text-primary' : 'text-muted'}`}
              style={{ letterSpacing: '1px' }}
            >
              Registry
            </Nav.Link>

            {/* Create Link */}
            <Nav.Link 
              as={Link} 
              to="/create" 
              className={`text-uppercase fw-semibold small px-3 ${location.pathname === '/create' ? 'text-primary' : 'text-muted'}`}
              style={{ letterSpacing: '1px' }}
            >
              Add Student
            </Nav.Link>
            
            {/* Profile/Identity Indicator (Optional for Academic Projects) */}
            <div className="ms-lg-4 ps-lg-4 border-start d-none d-lg-block">
              <span className="text-muted small text-uppercase fw-medium" style={{ letterSpacing: '1px' }}>
                Admin / UB
              </span>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;