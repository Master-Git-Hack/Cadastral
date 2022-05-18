/** @format */

import { getState } from "../../../features/homologation/supplementaryWorks/slice2";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { StepsView } from "./stepsView";

export default function DataView() {
	const { data } = useAppSelector(getState);
	const dispatch = useAppDispatch();
	console.log(data);
	return (
		<>
			<div className="row mb-3">
				<div className="col-2 text-start">
					<button className="btn btn-sm btn-success">Agregar Documento</button>
				</div>
				<div className="col-8" />
				<div className="col-2 text-end">
					<button className="btn btn-sm btn-outline-danger">
						Eliminar Ultimo Documento
					</button>
				</div>
			</div>
			{data.map((item: any, index: number) => (
				<StepsView key={`handle data values ${index}`} {...item} />
			))}
		</>
	);
}
