/** @format */

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
	getJustipreciacion,
	consumeJusti,
	setInitialState,
	setID,
} from "../../features/justipreciacion/justipreciacionSlice";
import { getParams } from "../../utils/utils";

export const Justipreciacion = () => {
	const dispatch = useAppDispatch();
	const { status, id, message, registro } = useAppSelector(getJustipreciacion);

	useEffect(() => {
		if (id !== 0 && registro === "") {
			dispatch(
				setInitialState({
					type: getParams("tipo").toLocaleUpperCase() || "TERRENO",
					sp1_factor: Number(getParams("sp1_factor")) || 1,
					sp1_superficie: Number(getParams("sp1_superficie")) || 1,
					cna_edad: Number(getParams("cna_edad")) || 1,
					cna_superficie: Number(getParams("cna_superficie")) || 1,
				}),
			);
			dispatch(
				consumeJusti.get({
					url: `JUSTIPRECIACION/${id}`,
				}),
			);
		}
		if (id === 0) {
			const ID = Number(getParams("id"));
			if (ID !== 0) {
				dispatch(setID(ID));
				dispatch(
					setInitialState({
						type: getParams("tipo").toLocaleUpperCase() || "TERRENO",
						sp1_factor: Number(getParams("sp1_factor")) || 1,
						sp1_superficie: Number(getParams("sp1_superficie")) || 1,
						cna_edad: Number(getParams("cna_edad")) || 1,
						cna_superficie: Number(getParams("cna_superficie")) || 1,
					}),
				);
				dispatch(
					consumeJusti.get({
						url: `JUSTIPRECIACION/${ID}`,
					}),
				);
			} else {
				alert("No se encontró el ID");
			}
		}
	}, [id, registro]);

	useEffect(() => {
		if (status === "fail") {
			alert(message);
		}
	}, [status, message]);
	return <></>;
};
