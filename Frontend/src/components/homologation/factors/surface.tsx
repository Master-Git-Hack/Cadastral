/** @format */
import { useState } from "react";
import { getState, updateFactorStateCommon } from "../../../features/homologation/slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { Modal } from "react-bootstrap";
import { SelectRootValue } from "../documentation/area";
const SurfaceRoot = (props: {
	dispatch: Function;
	enabled: boolean;
	value: number;
	show: boolean;
	onHide: any;
	observations: string;
}) => {
	const { value, observations, enabled, show, onHide, dispatch } = props;
	return (
		<Modal id={`modal for handle surface root`} show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Edicion de Raíz</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<span>
					Valor actual: Raíz {value} (
					<small>
						<strong>
							<sup>{value}</sup>&radic;{" "}
							<span style={{ textDecoration: "overline" }}>x</span>{" "}
						</strong>
					</small>
					)
				</span>
				<div className="form-check form-switch form-check-sm form-switch-sm">
					<input
						className="form-check-input form-check-input-sm "
						type="checkbox"
						checked={enabled}
						onChange={(event: any) =>
							dispatch(
								updateFactorStateCommon({
									key: "Surface",
									object: "root",
									index: undefined,
									value: {
										value: 8,
										enabled: event.target.checked,
										observations,
									},
								}),
							)
						}
					/>
					Habilitar edición
				</div>
				{enabled ? (
					<div className="mx-2">
						<SelectRootValue
							initialValue={6}
							name={`Raíz surface`}
							value={value}
							onChange={(event: any) =>
								dispatch(
									updateFactorStateCommon({
										key: "Surface",
										object: "root",
										value: {
											value: Number(event.target.value),
											enabled,
											observations,
										},
									}),
								)
							}
						/>
						<br />
						Ingrese el motivo por el cual va a cambiar el valor asignado:
						<textarea
							className="form-control form-control-sm"
							value={observations}
							onChange={(event: any) =>
								dispatch(
									updateFactorStateCommon({
										key: "Surface",
										object: "root",
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
export const HandleSurfaceRoot = () => {
	const [show, setShow] = useState(false);
	const dispatch = useAppDispatch();
	const { value, enabled, observations } = useAppSelector(getState).factors.Surface.root;
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
			<button className="btn btn-sm btn-link" onClick={(event: any) => setShow(!show)}>
				Cambiar Raíz
			</button>

			<SurfaceRoot {...props} />
		</>
	);
};
