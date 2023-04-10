/** @format */
import { useEffect, useMemo, useCallback } from "react";
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
import { PayloadByKey } from "../redux/Justipreciacion/interfaces";
interface Props {
	useRouter?: boolean;
	router?: any;
}
const api = request();
export const useJustipreciacion = ({ router = undefined }: Props) => {
	const state = useAppSelector(getState);
	const { id, registro, sp1_factor, sp1_vu, sp1_superficie, cna_edad, cna_superficie } = state;
	const dispatch = useAppDispatch();
	const { query } = router ?? { query: {} };
	const queries = useMemo(() => query, [query]);
	const fetchData = async (signal: AbortSignal) => {
		const response = await api.get({
			url: `/justipreciacion/${queries.id}`,
			signal,
		});
		if (response === undefined) {
			_Error({
				title: "Error de Conexión",
				text: "Algo Fallo al intentar conectarse, favor de intentar más tarde o contacte al administrador, si el problema persiste.",
			}).then(() => close());
			return;
		}
		const { message, data } = response?.data ?? {
			message: "Error de Conexión",
			data: {},
		};
		if (response?.status !== 200) {
			_Error({ title: response?.status, text: message }).then(() => close());
			return;
		}
		if (Object.keys(data).length === 0) {
			_Error({
				title: "Registro no encontrado",
				text: "La justipreciación que intenta consultar no existe, contacte al administrador.",
			}).then(() => close());
			return;
		}
		dispatch(load(data));
	};
	const patch = ({ key, value }: PayloadByKey) => dispatch(_patch({ key, value }));
	const RawSave = async () =>
		await api.patch({
			url: `/justipreciacion/${queries.id}`,
		});
	const Save = async () => {
		if (id !== null) {
			RawSave();
		}
	};
	useEffect(() => {
		const controller = new AbortController();
		if (queries.id !== undefined && id !== queries.id) {
			id === null && fetchData(controller.signal);
		}
		return () => {
			controller.abort();
		};
	}, [queries, id]);
	return {
		queries,
		state,
		justipreciacionId: id,
		registro,
		sp1_factor,
		sp1_vu,
		sp1_superficie,
		cna_edad,
		cna_superficie,
		patch,
		Save,
	};
};
