/** @format */
import { useEffect, useMemo, useCallback } from "react";
import { Container } from "../../src/components/Container";
import { Navbar } from "../../src/components/Navbar";
import Pages from "../../src/modules/homologacion";
import { useRouter } from "next/router";
import { useJustipreciacion } from "../../src/hooks/useJustipreciacion";
import { useHomologacion } from "../../src/hooks/useHomologacion";
export default function Homologaciones() {
	const router = useRouter();
	const { queries, justipreciacionId, registro } = useJustipreciacion({ router });
	const { factores, resultado, dataAge } = useHomologacion({ router, registro });

	if (justipreciacionId !== null) {
		console.log(factores, dataAge);
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
	return <></>;
}
