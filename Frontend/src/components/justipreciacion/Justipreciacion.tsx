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
		const ID = Number(getParams("id"));
		id !== ID && dispatch(setID(ID));
	}, [id, status, dispatch]);
	useEffect(() => {
		id !== 0 &&
			status.includes("unset") &&
			registro === "" &&
			dispatch(
				consumeJusti.get({
					url: `JUSTIPRECIACION/${id}`,
				}),
			)
				.unwrap()
				.then(() =>
					dispatch(
						setInitialState({
							type: getParams("tipo").toLocaleUpperCase() || "TERRENO",
							sp1_factor: Number(getParams("sp1_factor")) ?? 1,
							sp1_superficie: Number(getParams("sp1_superficie")) ?? 1,
							cna_edad: Number(getParams("cna_edad")) ?? 1,
							cna_superficie: Number(getParams("cna_superficie")) ?? 1,
						}),
					),
				)
				.catch((error) => {
					alert(error);
				});
	}, [registro, status, dispatch, id]);

	useEffect(() => {
		if (status === "fail") {
			alert(message);
		}
	}, [status, message]);
	return <>{!status.includes("loading") && !status.includes("unset") && <></>}</>;
};
