/** @format */

import { Container } from "../../src/components/Container";
import { Navbar } from "../../src/components/Navbar";
import Pages from "../../src/modules/homologacion";
import { useRouter } from "next/router";
import { useHomologacion } from "../../src/redux/Homologacion/homologacion.hook";
export default function Homologaciones() {
	const { query } = useRouter();
	const { state, salesCost } = useHomologacion(query);
	console.log(salesCost());
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
