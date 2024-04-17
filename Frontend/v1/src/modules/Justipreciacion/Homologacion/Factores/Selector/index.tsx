/** @format */

import { useState, useEffect } from "react";
import { Success, Danger } from "../../../../../components/Button";
import { Container } from "../../../../../components/Container";
import { useAppDispatch, useAppSelector } from "../../../../../redux";
import {
	getHomologaciones,
	setEnabledFactors,
	loadFactors,
} from "../../../../../redux/justipreciacion/homologacion";
import { positions } from "../../../../../redux/justipreciacion/homologacion/homologacion.actions";

export const Selector = () => {
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
		<Container
			header={
				<h2>
					Favor de seleccionar aquellos factores que sean necesarios para realizar la
					operación.
				</h2>
			}
			footer={
				<span className="text-muted">
					El numero a la izquierda indica la posicion en la que apareceran en la tabla
				</span>
			}
		>
			<ul className="container list-group px-5">
				{factores.map(({ key }: any, index: number) => {
					const enabled = index >= inferiorLimit && index <= superiorLimit;
					const { isUsed, name } = current(key);
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
								{isUsed && `${index + 1}.- `}
								{name}
							</span>
							<div>
								{!isUsed ? (
									<Success
										appearance="outline"
										onClick={() => handlePositions(key, true, index)}
									>
										Agregar
									</Success>
								) : (
									enabled && (
										<Danger onClick={() => handlePositions(key, false, -1)}>
											Eliminar
										</Danger>
									)
								)}
							</div>
						</li>
					);
				})}
			</ul>
		</Container>
	);
};
