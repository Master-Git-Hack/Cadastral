/** @format */
import { DropdownComponent } from "../dropdown/Dropdown";
import { JustifyChange } from "../views/JustifyChange";
import { ModalComponent } from "../views/Modal";

export const RoundSelection = (props: {
	name: string;
	current: number;
	type?: "btn" | "modal" | string;
	enabled?: boolean;
	setEnabled?: any;
	comment?: string;
	setComment?: any;
	modalBtnType?: string;
	onClick: (option: any, index: number) => void;
}) => {
	const roundedOptions = [
		"Sin Redondeo",
		"A la Unidad",
		"A la Decena",
		"A la Centena",
		"Al Millar",
	];
	const { name, current, onClick, type, enabled, setEnabled, comment, setComment, modalBtnType } =
		props;
	const Component = () => (
		<DropdownComponent
			name={name}
			btnType={"link"}
			btnText={`Tipo de redondeo: ${roundedOptions[current]}`}
			itemSelected={current}
			menuStyle={`rounded bg-light bg-gradient`}
			options={roundedOptions}
			onClick={onClick}
		/>
	);

	return (
		<>
			{type === undefined || type.includes("button") ? (
				<Component />
			) : (
				<JustifyChange
					btnType={modalBtnType !== undefined ? modalBtnType : "primary"}
					actionToDo={`Tipo de redondeo: ${roundedOptions[current]}`}
					name={name}
					enabled={enabled}
					setEnabled={setEnabled}
					comment={comment}
					setComment={setComment}
					ComponentToJustify={<Component />}
				/>
			)}
		</>
	);
};
