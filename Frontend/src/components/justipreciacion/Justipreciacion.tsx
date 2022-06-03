/** @format */

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
	getJustipreciacion,
	consumeJusti,
	setID,
} from "../../features/justipreciacion/justipreciacionSlice";
import { getParams } from "../../utils/utils";

export const Justipreciacion = () => {
	const dispatch = useAppDispatch();
	const { status, id, message, registro } = useAppSelector(getJustipreciacion);
	useEffect(() => {
		if (id !== 0 && registro === "") {
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
