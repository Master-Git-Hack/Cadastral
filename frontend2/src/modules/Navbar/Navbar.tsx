/** @format */

import React, { useState } from "react";
import { Navbar as Component, Nav } from "rsuite";
import { NavbarProps } from "./Navbar.types";
import logoGTO from "../../static/media/logoGto.png";
import { Link, Navigate } from "react-router-dom";
export default function Navbar(props: NavbarProps) {
	const { children } = props;
	const [activeKey, setActiveKey] = useState(null);
	return (
		<>
			<Component classPrefix="navbar bg-navbar">
				<Component.Brand>
					<Link to="/">
						<img src={logoGTO} alt="GTOLogo" width="250" height="100" />
						Sistema
					</Link>
				</Component.Brand>
				<Nav activeKey={activeKey} onSelect={setActiveKey} pullRight justified>
					<Nav.Item eventKey="1">
						<a
							href="http://172.31.113.151/avaluos/Login.php"
							onClick={() => {
								window.opener = null;
								window.open("http://172.31.113.151/avaluos/Login.php", "_self", "");
							}}
						>
							SICEG
						</a>
					</Nav.Item>
					<Nav.Item eventKey="2">
						<Link to="/Reportes">Reportes</Link>
					</Nav.Item>
					<Nav.Menu title="Documentación">
						<Nav.Item eventKey="3">
							<Link to="/Docs/Frontend">Frontend</Link>
						</Nav.Item>
						<Nav.Item eventKey="4">
							<Link to="/Docs/Backend">Backend</Link>
						</Nav.Item>
					</Nav.Menu>
				</Nav>
			</Component>
			{children}
		</>
	);
}
