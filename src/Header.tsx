import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./Header.css";

const Header: React.FC = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsHeaderFixed(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isHeaderFixed ? "fixed" : ""}`}>
      <div className="d-flex align-items-center justify-content-center pt-4">
        <Navbar bg="light" expand="lg" className="header-container">
          <Navbar.Brand href="/" className="logo-container">
            <img
              src="src/img/Round Logo w shadow.png"
              alt="kz2-moving-company-logo"
              width="100"
              className="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="prices">Prices</Nav.Link>
              <NavDropdown title="Services" id="basic-nav-dropdown">
                <NavDropdown.Item href="services-residential">Residential Moving</NavDropdown.Item>
                <NavDropdown.Item href="services-commercial">Commercial Moving</NavDropdown.Item>
                <NavDropdown.Item href="services-long-distance">
                  Long Distance Moving
                </NavDropdown.Item>
                <NavDropdown.Item href="services-heavy-items">Heavy Items Moving</NavDropdown.Item>
                <NavDropdown.Item href="services-packing">Packing</NavDropdown.Item>
                <NavDropdown.Item href="services-furniture-assembly">
                  Furniture Assembly
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="blog">Blog</Nav.Link>
              <Nav.Link href="book">Book</Nav.Link>
              <Nav.Link href="get-quote">Get Quote</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
