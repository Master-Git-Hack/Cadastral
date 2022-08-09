/** @format */
import { ModalProps } from "./Modal.types";
import { Modal as Component } from "../../Modal/Modal";
import { Input } from "../../Input/Input";

export const Modal = (props: ModalProps) => {
	const { type, action, name, editable, setEditable, comment, setComment, children } = props;

	return (
		<Component action={action} title={`Cambiar Valor: ${name}`} type={type}>
			<>
				<Input.Switch
					type="switch"
					name={`${action} switch `}
					label="Habilitar Edición del campo."
					className="text-start mb-3 my-auto"
					checked={editable}
					onChange={setEditable}
				/>
				{children}
				{editable && (
					<Input.Area
						name={`${action} textarea `}
						label="Justifica el motivo del cambio."
						rows={4}
						value={comment}
						className="form-group text-start mt-3"
						onChange={setComment}
					/>
				)}
			</>
		</Component>
	);
};
