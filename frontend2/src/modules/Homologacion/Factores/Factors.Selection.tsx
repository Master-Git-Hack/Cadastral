/** @format */

import { useEffect, useState } from "react";
import { Button } from "../../../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { positions } from "../../../slices/homologacion/homologacion.helpers";
import {
	getHomologaciones,
	loadFactors,
	setEnabledFactors,
} from "../../../slices/homologacion/homologacion.slice";

export const Selection = () => {
	const dispatch = useAppDispatch();
	const { factors, record } = useAppSelector(getHomologaciones);

	const type = record.type.includes("TERRENO");
	const [factores] = useState(positions(type));
	const handlePositions = (key: string, isUsed: boolean, position: number) =>
		dispatch(setEnabledFactors({ key, isUsed, position }));
	const current: any = (key: string) => factors[key];
	const inferiorLimit = type ? 7 : 9;
	const superiorLimit = type ? 10 : 11;

	useEffect(() => {
		dispatch(loadFactors());
	}, []);
	return (
		<div className="container-fluid">
			<h2>
				Favor de seleccionar aquellos factores que sean necesarios para realizar la
				operación.
			</h2>
			<ul className="list-group">
				{factores.map((factor: any, index: number) => {
					const { key } = factor;
					const enabled = index >= inferiorLimit && index <= superiorLimit;

					return (
						<li
							key={`list ${index}`}
							className={`list-group-item ${
								current(key).isUsed
									? "bg-success bg-opacity-25 text-dark fw-bold"
									: ""
							} d-flex justify-content-between`}
						>
							<span className="me-auto">
								{current(key).isUsed && `${index + 1}.- `}
								{current(key).name}
							</span>
							<div>
								{!current(key).isUsed ? (
									<Button
										type={"success"}
										outline
										onClick={() => handlePositions(key, true, index)}
									>
										Agregar
									</Button>
								) : (
									enabled && (
										<Button
											type={"link"}
											className="text-danger"
											onClick={() => handlePositions(key, false, -1)}
										>
											Eliminar
										</Button>
									)
								)}
							</div>
						</li>
					);
				})}
			</ul>
			<span className="text-muted">
				El numero a la izquierda indica la posicion en la que apareceran en la tabla
			</span>
		</div>
	);
};
