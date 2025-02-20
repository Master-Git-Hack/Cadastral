/** @format */

/** @format */

import { useEffect, useState } from "react";
import { Danger, Success } from "../../components/Button";
import { PaginatedView } from "../../components/PaginatedView";
import { useAppDispatch, useAppSelector } from "../../redux";
import { Comparable as Component } from "./comparable";
import { getComparables } from "../../redux/comparables";
export default function Comparables() {
	const dispatch = useAppDispatch();
	const { reports } = useAppSelector(getComparables);
	const [loading, setLoading] = useState(false);
	const [pages, setPages] = useState<{ [key: string | number]: any }>({});
	useEffect(() => {
		const Pages: { [key: string | number]: any } = {};
		reports.map((data: any, index: number) => {
			Pages[index + 1] = <Component {...data} />;
			return data;
		});
		setPages(() => Pages);
	}, [reports]);
	const { length } = reports;

	return (
		<div className="mx-3">
			<PaginatedView
				title={
					<>
						<h1>Comparables</h1>
						{length > 1 && (
							<div className="my-auto py-auto">
								<Success
									appearance="primary"
									onClick={() => {}}
									loading={loading}
									size="sm"
								>
									Descargar comparables como archivo unico
								</Success>
							</div>
						)}
					</>
				}
				footer={
					<span className="text-muted">
						Para finalizar el registro debe posicionarse en la página 6 en donde se
						encuentra el procesos de indivisos en caso de haber sido utilizado, sino el
						valor a actualizar en el registro de justipreciación será el calculado en la
						página 5.
					</span>
				}
				totalPages={length}
				actions={{
					children: (
						<>
							<Success appearance="link" onClick={() => {}} size="xs">
								Agregar Documento
							</Success>
							{length > 1 && (
								<Danger onClick={() => {}} size="xs">
									Remover Documento
								</Danger>
							)}
						</>
					),
					position: "bottom",
					show: "beforeLast",
				}}
			>
				{pages}
			</PaginatedView>
		</div>
	);
}
