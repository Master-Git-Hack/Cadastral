import { FC } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

export const NavBar: FC = () => (
  <Navbar collapseOnSelect={true} variant="light" className="bg-navbar">
    <Container>
      <Navbar.Brand href="/">
        <img
          alt="logo del gobierno de guanajuato"
          src="https://www.pngkey.com/png/detail/12-125952_logo-png-transparent-background.png"
          width={250}
          height={250}
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        className="justify-content-end"
        id="responsive-navbar-nav"
      >
        <Nav>
          <Nav.Item>
            <Nav.Link href="/">Inicio</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/homologaciones">Homologaciones</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/avaluos">Avaluos</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
