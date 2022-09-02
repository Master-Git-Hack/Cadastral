/** @format */

export const SaveButton = (props: { registro: string; actionClick: any; customText?: string }) => {
	const { registro, actionClick, customText } = props;
	return (
		<button onClick={actionClick} className="btn btn-success">
			{customText !== undefined
				? customText
				: registro.includes("exists")
				? "Actualizar"
				: "Guardar"}
		</button>
	);
};
