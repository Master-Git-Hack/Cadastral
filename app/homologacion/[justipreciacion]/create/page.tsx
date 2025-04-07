"use client";
import Error from "@/components/error";
import Layout from "@/components/navbar/index";
import Spinner from "@/components/ui/spinner";
import { useSearchParams, useParams } from "next/navigation";
import { Fragment, Suspense, use } from "react";
import CreateHomo from "./create";

export const Homologacion = () => {
	const params = useParams();
	const searchParams = useSearchParams();
	const id = params?.justipreciacion ?? 0;
	const page = searchParams.get("page") ?? "1";
	const useLegacy = searchParams.get("legacy") === "true";
	const user = searchParams.get("user");
	const tipo = searchParams.get("tipo");
	const sp1_factor = searchParams.get("sp1_factor") ?? 1;
	const sp1_superficie = searchParams.get("sp1_superficie") ?? 1;
	const cna_superficie = searchParams.get("cna_superficie") ?? 1;
	const cna_edad = searchParams.get("cna_edad") ?? 0;
	if (useLegacy && user === null) {
		return <Error message="Usuario no encontrado" />;
	}
	const Component = useLegacy ? Fragment : Layout;
	console.log(
		page,
		useLegacy,
		user,
		id,
		tipo,
		sp1_factor,
		sp1_superficie,
		cna_superficie,
		cna_edad,
	);
	return (
		<Component>
			<CreateHomo
				page={page}
				isLegacy={useLegacy}
				user={user}
				id={parseInt(id)}
				tipo={tipo}
				sp1_factor={parseFloat(sp1_factor)}
				sp1_superficie={parseFloat(sp1_superficie)}
				cna_superficie={parseFloat(cna_superficie)}
				cna_edad={parseInt(cna_edad)}
				onEdit={false}
			/>
		</Component>
	);
};
export default function CreateHomologacion() {
	return (
		<Suspense fallback={<Spinner />}>
			<Homologacion />
		</Suspense>
	);
}
