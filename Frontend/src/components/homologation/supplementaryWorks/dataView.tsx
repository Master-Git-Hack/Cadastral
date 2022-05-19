/** @format */

import {
	getState,
	addRow,
	removeRow,
} from "../../../features/homologation/supplementaryWorks/slice2";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { StepsView } from "./stepsView";

export default function DataView() {
	const { data } = useAppSelector(getState);
	const dispatch = useAppDispatch();

	return (
		<>
			<div className="row mb-3">
				<div className="col-2 text-start">
					<button className="btn btn-sm btn-success" onClick={() => dispatch(addRow())}>
						Agregar Documento
					</button>
				</div>
				<div className="col-8" />
				<div className="col-2 text-end">
					<button
						className="btn btn-sm btn-outline-danger"
						onClick={() => dispatch(removeRow())}
					>
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
