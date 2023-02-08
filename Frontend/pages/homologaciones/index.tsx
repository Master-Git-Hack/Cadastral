/** @format */
import { useEffect, useMemo, useCallback } from "react";
import { Container } from "../../src/components/Container";
import { Navbar } from "../../src/components/Navbar";
import Pages from "../../src/modules/homologacion";
import { useRouter } from "next/router";
import { useJustipreciacion } from "../../src/hooks/useJustipreciacion";
export default function Homologaciones() {
	const router = useRouter();
	const { queries, id } = useJustipreciacion({ router });
	console.log(id);
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
