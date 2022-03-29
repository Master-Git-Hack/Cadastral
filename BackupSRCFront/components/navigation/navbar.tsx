/** @format */

import { FC } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logoGTO from "../../assets/images/logoGto.png";
export const NavigationBar: FC = () => {
	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			variant="light"
			className="bg-navbar mb-3 align-self-middle align-middle"
		>
			<Container className="d-flex">
				<Navbar.Brand href="/">
					<img
						alt="logo GTO"
						src={logoGTO}
						width="250"
						className="d-inline-block align-middle"
					/>{" "}
					Sistema
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto" />

					{/*
                    <Nav className="me-auto">
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
					</Nav>
                    */}
					<Nav className="me-2">
						<Nav.Link href="http://172.31.113.151/avaluos/Login.php">SICEG</Nav.Link>
						<Nav.Link href="/Reportes">Reportes</Nav.Link>
						{/*
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                        */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
