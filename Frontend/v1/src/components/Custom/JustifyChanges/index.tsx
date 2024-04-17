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
}: ModalProps) => (
	<div>
		<Modal
			action={action}
			title={<h3>Cambiar Valor: {name}</h3>}
			type={type}
			appearance={appearance}
			btnSize={btnSize}
			size={size}
		>
			<div style={{ minHeight: 350 }}>
				<Switch
					withText
					label="Edición del campo."
					onChange={setEditable}
					checked={editable}
				/>
				<br />
				{children}
				<br />
				{editable && (
					<>
						Justifica el motivo del cambio.
						<Text isArea rows={7} onChange={setComment} value={comment} />
					</>
				)}
			</div>
		</Modal>
	</div>
);
