/** @format */

import { SaveButton } from "../../components/inputs/saveButton";
import CostosConstruccion from "../../components/justipreciacion/costosConstruccion.tsx/CostosConstruccion";

export default function CConstruccion() {
	return (
		<div className="d-flex flex-column justify-content-center m-1 align-self-center flex-fill shadow-lg p-3 my-4 ">
			<div className="d-inline-flex my-3 ">
				<div className="me-auto text-start my-auto">
					<h1 className="text-center my-3">
						Calculo: <strong>Costos de Construcción</strong>
					</h1>
				</div>
				<div className="text-end my-auto">
					<SaveButton registro={""} actionClick={undefined} />
				</div>
			</div>

			<CostosConstruccion />
		</div>
	);
}
