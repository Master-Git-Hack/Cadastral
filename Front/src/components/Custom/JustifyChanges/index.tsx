/** @format */

import { Modal } from "../../Modal";
import { ModalProps } from "./justifyChange.types";
import { Input } from "../../Input";
const { Switch, Text } = Input;
export const JustifyChanges = ({
	type,
	appearance,
	btnSize,
	size,
	action,
	name,
	editable,
	setEditable,
	comment,
	setComment,
	children,
}: ModalProps) => {
	<Modal
		action={action}
		title={`Cambiar Valor: ${name}`}
		type={type}
		appearance={appearance}
		btnSize={btnSize}
		size={size}
	>
		Edición del campo.
		<Switch onChange={setEditable} checked={editable} />
		{children}
		{editable && (
			<>
				Justifica el motivo del cambio.
				<Text isArea rows={6} onChange={setComment} value={comment} />
			</>
		)}
	</Modal>;
};
