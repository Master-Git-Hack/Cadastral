/** @format */

import { Alert } from "../../utils/utils.alert";
import { Container } from "../../components/Container/Container";
import { useAppDispatch, useAppSelector } from "../../hooks/Redux";
import {
	addRow,
	getHomologaciones,
	loadFactors,
	rmRow,
} from "../../Slices/Justipreciacion/homologaciones.slice";
import { Factors } from "./Factores/Factores";
import { Area } from "./Registros/Areas/Area";
import { BigPicture } from "./BigPicture/BigPicture";
import { useEffect } from "react";
export const View = () => {
	const AgeContainer = () => Factors.AgeContainer({ type: "RENTA" });
	const data = [Factors.Compilation, AgeContainer, Area.Component, Factors.Selection, BigPicture];
	const dispatch = useAppDispatch();
	const { Save, Success, Error } = Alert;
	useEffect(() => {
		dispatch(loadFactors());
	}, []);
	return (
		<Container
			title="Homologación de tipo: "
			titleStrong="Terreno"
			dataLimit={1}
			data={data}
			pageLimit={7}
			hidePage={6}
			fixedTop
			addBtn
			addOnClick={() => dispatch(addRow())}
			rmBtn
			rmOnClick={() => dispatch(rmRow())}
			saveBtn
			saveOnClick={() =>
				Save({
					title: `Guardar`,
					text: `Guardar`,
				}).then((response: any) => {
					const { isConfirmed } = response;
					isConfirmed && Success({ title: "Exito", text: "exito" });
					!isConfirmed && Error({ title: "Error", text: "error" });
				})
			}
		/>
	);
};
