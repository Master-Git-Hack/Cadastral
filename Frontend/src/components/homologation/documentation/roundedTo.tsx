/** @format */
import { useState } from "react";
import { getState, updateDocumentationStateRoundedTo } from "../../../features/homologation/slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { Modal } from "react-bootstrap";

const HandleRoundedTo = (props: {
	dispatch: Function;
	enabled: boolean;
	value: number;
	show: boolean;
	onHide: any;
	observations: string;
}) => {
	const { value, observations, enabled, show, onHide, dispatch } = props;
	return (
		<Modal id={`modal for handle rounded value application`} show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Edicion de Redondeo Aplicado</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Valor actual:{" "}
				<strong>
					{value === 0
						? "Sin Redondeo"
						: value === 1
						? "Redondeo a la decena"
						: "Redondeo a la centena"}
				</strong>
				<div className="form-check form-switch form-check-sm form-switch-sm">
					<input
						className="form-check-input form-check-input-sm "
						type="checkbox"
						checked={enabled}
						onChange={(event: any) =>
							dispatch(
								updateDocumentationStateRoundedTo({
									key: "roundedTo",
									value: {
										value: 1,
										enabled: event.target.checked,
										observations: "",
									},
								}),
							)
						}
					/>
					Habilitar edición
				</div>
				{enabled ? (
					<div className="mx-2">
						<select
							value={value}
							className="form-select form-select-sm"
							onChange={(event: any) =>
								dispatch(
									updateDocumentationStateRoundedTo({
										key: "roundedTo",
										value: {
											value: Number(event.target.value),
											enabled,
											observations,
										},
									}),
								)
							}
						>
							<option value={0}>Sin Redondeo</option>
							<option value={1}>Redondear a la decena</option>
							<option value={2}>Redondear a la centena</option>
						</select>
						<br />
						Ingrese el motivo por el cual va a cambiar el valor asignado:
						<textarea
							className="form-control form-control-sm"
							value={observations}
							onChange={(event: any) =>
								dispatch(
									updateDocumentationStateRoundedTo({
										key: "roundedTo",
										value: {
											value,
											enabled,
											observations: event.target.value,
										},
									}),
								)
							}
						/>
					</div>
				) : null}
			</Modal.Body>
		</Modal>
	);
};
export const RoundedTo = () => {
	const [show, setShow] = useState(false);
	const dispatch = useAppDispatch();
	const { value, enabled, observations } =
		useAppSelector(getState).documentation.SalesCost.averageUnitCost.roundedTo;
	const props = {
		dispatch,
		enabled,
		value,
		show,
		observations,
		onHide: () => setShow(!show),
	};
	return (
		<>
			<button
				className="btn btn-sm btn-link link-secondary"
				onClick={(event: any) => setShow(!show)}
			>
				Cambiar valor de Redondeo
			</button>

			<HandleRoundedTo {...props} />
		</>
	);
};
