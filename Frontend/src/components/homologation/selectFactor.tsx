/** @format */

import { FC } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/store";
import { selector, setFactors } from "../../features/homologation/slice";
export const SelectFactor: FC = (props: any) => {
	const dispatch = useAppDispatch();
	const { factors, type } = useAppSelector(selector);
	return (
		<div className="m-5 py-1">
			<h2 className="text-center">
				Favor de seleccionar, aquellos factores que no sean requeridos dentro de la
				homologación
			</h2>
			<div className="row text-center">
				<div className="col-12 col-sm-12">
					<ul className="list-group">
						{Object.keys(factors).map((key: string, index: number) =>
							key !== "location" &&
							key !== "zone" &&
							key !== "surface" &&
							key !== "commercial" &&
							key !== "results" ? (
								factors[key].isUsed ? (
									<li
										key={`remove-${index}`}
										className="list-group-item d-flex justify-content-between align-items-center"
									>
										<div className="ms-2 me-auto">
											<div className="fw-bold">{factors[key].name}</div>
										</div>
										<button
											className="btn btn-sm btn-outline-danger"
											onClick={() =>
												dispatch(
													setFactors({
														itemName: key,
														subItemName: "isUsed",
														value: false,
													}),
												)
											}
										>
											Eliminar
										</button>
									</li>
								) : (
									<>
										{type === "TERRENO" && key !== "ages" ? (
											<Agregar
												key={`add-${type}-${key}-${index}`}
												dispatch={dispatch}
												tag={key}
												index={index}
												name={factors[key].name}
											/>
										) : type !== "TERRENO" ? (
											<Agregar
												dispatch={dispatch}
												tag={key}
												index={index}
												name={factors[key].name}
												key={`add-${type}-${key}-${index}`}
											/>
										) : null}
									</>
								)
							) : null,
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};
const Agregar: FC<{ dispatch: Function; index: number; tag: string; name: string }> = (props) => (
	<li
		key={`add-${props.index}`}
		className="list-group-item d-flex justify-content-between align-items-center"
	>
		<div className="ms-2 me-auto">
			<button
				className="btn btn-sm btn-outline-primary"
				onClick={() =>
					props.dispatch(
						setFactors({
							itemName: props.tag,
							subItemName: "isUsed",
							value: true,
						}),
					)
				}
			>
				Agregar
			</button>
		</div>
		<div className="fw-bold">{props.name}</div>
	</li>
);
