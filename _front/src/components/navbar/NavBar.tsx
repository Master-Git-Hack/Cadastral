import { Nav, Navbar, Container } from "react-bootstrap";
import logoGto from "../../assets/img/logoGto.png";
export default function NavBar() {
  return (
    <Navbar collapseOnSelect variant="light" className="bg-navbar">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            width={250}
            alt="gobierno de guanajueto"
            src={logoGto}
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
              <Nav.Link href="/avaluos">Avaluos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/homologaciones">Homologaciones</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
