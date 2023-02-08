/** @format */
import { useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { load, getState, patch as _patch } from "../redux/Justipreciacion";
import { useAppDispatch, useAppSelector } from "../redux/app";
import { request } from "../api";
import {
	Success,
	Error as _Error,
	Warning,
	Info,
	Question,
	SimpleMessage,
	Save as _Save,
	Ask,
} from "../utils/alert";
import { close } from "../utils/window";
import { PayloadByKey } from "../redux/Justipreciacion/justipreciacion.interfaces";
interface Props {
	useRouter?: boolean;
	router?: any;
}
const api = request();
export const useJustipreciacion = ({ router = undefined }: Props) => {
	const state = useAppSelector(getState);
	const { id, sp1_factor, sp1_vu, sp1_superficie, cna_edad, cna_superficie } = state;
	const dispatch = useAppDispatch();
	const { query } = router ?? { query: {} };
	const queries = useMemo(() => query, [query]);
	const fetchData = async () => {
		if (queries.id !== undefined && id !== queries.id) {
			const response = await api.get({
				url: `/justipreciacion/${queries.id}`,
			});
			const { message, data } = response?.data ?? {
				message: "Error de Conexión",
				data: {},
			};
			if (response?.status !== 200)
				_Error({ title: response?.status, text: message }).then(() => close());
			if (Object.keys(data).length === 0)
				_Error({
					title: "Registro no encontrado",
					text: "La justipreciación que intenta consultar no existe, contacte al administrador.",
				}).then(() => close());
			dispatch(load(data));
		}
	};
	const patch = ({ key, value }: PayloadByKey) => dispatch(_patch({ key, value }));
	const loadHomologacion = (homologacion: "TERRENO" | "RENTA", payload: any) => {
		if (homologacion === "TERRENO") {
			const {} = payload;
		}
		if (homologacion === "RENTA") {
			const {} = payload;
		}
	};
	const RawSave = async () =>
		await api.patch({
			url: `/justipreciacion/${queries.id}`,
		});
	const Save = async () => {
		if (id === queries.id) {
			RawSave();
		}
	};
	useEffect(() => {
		fetchData();
	}, [queries, id]);
	return {
		queries,
		state,
		id,
		sp1_factor,
		sp1_vu,
		sp1_superficie,
		cna_edad,
		cna_superficie,
		patch,
		loadHomologacion,
		Save,
	};
};
