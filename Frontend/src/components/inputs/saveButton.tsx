/** @format */

export const SaveButton = (props: { registro: string; actionClick: any }) => {
	const { registro, actionClick } = props;
	return (
		<button onClick={actionClick} className="btn btn-success">
			{registro.includes("exists") ? "Actualizar" : "Guardar"}
		</button>
	);
};
