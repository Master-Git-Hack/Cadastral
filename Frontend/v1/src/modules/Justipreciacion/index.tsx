/** @format */

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux";

import { getJustipreciacion, setID, get, setInitialState } from "../../redux/justipreciacion";
import { Alert } from "../../utils/alert";

import { getURLParams } from "../../utils/url";

export const Justipreciacion = ({ children }: any) => {
	const dispatch = useAppDispatch();
	const { status, id, message, registro } = useAppSelector(getJustipreciacion);

	useEffect(() => {
		const ID = Number(getURLParams("id"));
		id !== ID && dispatch(setID(ID));
	}, [id, status, dispatch]);
	useEffect(() => {
		id !== 0 &&
			status.includes("unset") &&
			registro === "" &&
			dispatch(
				get({
					url: `JUSTIPRECIACION/${id}`,
				}),
			)
				.unwrap()
				.then(() =>
					dispatch(
						setInitialState({
							type: getURLParams("tipo")?.toLocaleUpperCase() ?? "TERRENO",
							sp1_factor: Number(getURLParams("sp1_factor")) ?? 1,
							sp1_superficie: Number(getURLParams("sp1_superficie")) ?? 1,
							cna_edad: Number(getURLParams("cna_edad")) ?? 1,
							cna_superficie: Number(getURLParams("cna_superficie")) ?? 1,
						}),
					),
				)
				.catch((error: any) => {
					Alert.Error({
						title: "Conexión",
						text: error.message,
					});
				});
	}, [registro, status, dispatch, id]);

	useEffect(() => {
		if (status === "fail") {
			Alert.Error({ title: "Obtención de datos", text: message });
		}
	}, [status]);
	return <>{children}</>;
};
