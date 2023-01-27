/** @format */

import Head from "next/head";
import Image from "next/image";
import { Select } from "../src/components/Select";
import { Money } from "../src/components/Editable/Money";
import { useState, useEffect } from "react";
import { Navbar } from "../src/components/Navbar";
import { Container } from "../src/components/Container";
import { Table } from "../src/components/Table";
import { Button } from "../src/components/Button";
import React from "react";
import { Box } from "@mui/material";
import { Comun } from "../src/modules/homologacion/factores/comun";
export default function Home() {
	return (
		<Container
			header={
				<>
					<Navbar />
				</>
			}
			shadow={10}
			pagination={{ count: 10 }}
		>
			{Pages()}
		</Container>
	);
}
