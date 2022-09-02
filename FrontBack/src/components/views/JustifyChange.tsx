/** @format */

import { ModalComponent } from "./Modal";

export const JustifyChange = (props: {
	btnType: string;
	actionToDo: string;
	name: string;
	enabled?: boolean;
	setEnabled?: any;
	comment?: string;
	setComment?: any;
	ComponentToJustify: JSX.Element;
}) => (
	<ModalComponent
		actionToDo={props.actionToDo}
		btnType={props.btnType}
		Header={`Cambiar Valor: ${props.name}`}
		Body={
			<>
				<div className="form-check form-switch form-check-sm form-switch-sm ms-3 mb-2">
					Habilitar edición
					<input
						className="form-check-input form-check-input-sm "
						type="checkbox"
						checked={props.enabled}
						onChange={props.setEnabled}
					/>
				</div>
				<div className="mb-3">{props.ComponentToJustify}</div>

				{props.enabled && (
					<>
						<span>Ingrese el motivo por el cual va a cambiar el valor asignado:</span>
						<textarea
							rows={2}
							className="form-control mt-1"
							value={props.comment}
							onChange={props.setComment}
						/>
					</>
				)}
			</>
		}
	/>
);
