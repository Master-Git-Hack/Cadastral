/** @format */

import Image from "next/image";
//import logo from "../../images/logoGTO.png";
import { Navbar as Component, Container, Nav, NavDropdown } from "react-bootstrap";
export const Navbar = () => (
	<Component
		collapseOnSelect
		expand="lg"
		variant="light"
		className="bg-navbar mb-3 align-self-middle algin-middle"
	>
		<Container className="d-flex flex-row">
			<Component.Brand href="/">
				<div className="d-flex">
					<Image
						alt="logo Gto"
						width={250}
						height={100}
						src={"/assets/images/logoGto.png"}
						className="d-inline-block align-middle"
					/>
					<p className="ms-4 align-self-center my-auto">Sistema</p>
				</div>
			</Component.Brand>
			<Component.Toggle aria-controls="responsive-navbar-nav align-self-center" />
			<Component.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto" />

				{/*
                    <Nav className="me-auto">
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
					</Nav>
                    */}
				<Nav className="me-2 text-end">
					<Nav.Link href="http://172.31.113.151/avaluos/Login.php">SICEG</Nav.Link>
					<Nav.Link href="/Reportes">Reportes</Nav.Link>
					<NavDropdown title="Documentación" id="basic-nav-dropdown">
						<NavDropdown.Item href="/Docs/Backend">Backend</NavDropdown.Item>
						<NavDropdown.Item href="/Docs/Frontend">Frontend</NavDropdown.Item>
					</NavDropdown>
					{/*
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                        */}
				</Nav>
			</Component.Collapse>
		</Container>
	</Component>
);
