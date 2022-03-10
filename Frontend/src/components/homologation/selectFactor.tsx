/** @format */

import { FC } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/store";
import { selector, setFactors } from "../../features/homologation/slice";
export const SelectFactor: FC = (props: any) => {
	const dispatch = useAppDispatch();
	const { factors } = useAppSelector(selector);
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
							key !== "comparison" ? (
								factors[key].isUsed ? (
									<li
										key={index}
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
								) : null
							) : null,
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};
