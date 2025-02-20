/** @format */

import { NavbarProps } from "./navbar.types";
import { Navbar as Component, Nav } from "rsuite";
import logo from "../../assets/images/logoGto.png";
import { Container } from "../Container";
import { useState } from "react";
export const Navbar = ({ children }: NavbarProps) => {
	const [activeKey, setActiveKey] = useState(null);
	return (
		<Container
			header={
				<Component
					className="text-navbar sticky-top bg-navbar my-auto "
					style={{ minWidth: 500, minHeight: 140 }}
				>
					<div className="container-fluid">
						<Component.Brand>
							<img
								alt="logo Gto"
								width="250"
								height="90"
								src={logo}
								className="img-fluid my-auto"
							/>
						</Component.Brand>

						<Nav onSelect={setActiveKey} activeKey={activeKey} className="mt-5">
							<Nav.Item href="/" eventKey="1">
								Sistema
							</Nav.Item>
						</Nav>
						<Nav
							pullRight
							onSelect={setActiveKey}
							activeKey={activeKey}
							className="mt-5"
						>
							<Nav.Item href="/reportes-catastrales" eventKey="2">
								Reportes
							</Nav.Item>
							<Nav.Menu title="Documentación">
								<Nav.Item href="/Docs/Frontend" eventKey="3">
									Frontend
								</Nav.Item>
								<Nav.Item href="/Docs/Backend" eventKey="4">
									Backend
								</Nav.Item>
							</Nav.Menu>
						</Nav>
					</div>
				</Component>
			}
		>
			{children}
		</Container>
	);
};
