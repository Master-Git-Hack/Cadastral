/** @format */
import { useEffect, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/app";
import { request } from "../api";
import { getState, load } from "../redux/Homologacion";
import initialState from "../interfaces/homologacion";
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
const api = request();
interface Props {
	useRouter?: boolean;
	router?: any;
	registro?: string;
}

export const useHomologacion = ({ router = undefined, registro = undefined }: any) => {
	const dispatch = useAppDispatch();
	const state = useAppSelector(getState);
	const { id, tipo, factores, resultado, edicion, tipo_servicio } = state;
	const { query } = router ?? { query: {} };
	const queries = useMemo(() => query, [query]);
	const fetchData = async (signal: AbortSignal) => {
		const response = await api.get({
			url: `/homologacion/${registro}/${tipo}`,
			signal,
		});

		const { message, data } = response?.data ?? {
			message: "Error de Conexión en la Homologación",
			data: {},
		};
		if (response?.status !== 200) {
			_Error({ title: response?.status, text: message }).then(() => close());
			return;
		}
		if (Object.keys(data).length === 0) {
			_Error({
				title: "Registro no encontrado",
				text: "Se procedera con un nuevo registro, si el registro actual existe, favor de contactar al administrador.",
			});
			return;
		}
		dispatch(load(data));
	};
	const RawUpdate = async () => await api.patch({ url: `/homologacion/${id}` });
	const RawPost = async () => await api.post({ url: "/homologacion/" });
	const Save = () => {
		if (id !== null && edicion) {
			RawUpdate();
		}
		if (id === null) {
			RawPost();
		}
	};

	const dataAge = useMemo(
		() =>
			factores?.Age.data.map(({ result, ...item }: any) => ({
				...item,
				result:
					1 -
						(factores?.Age.subject.value - item.value) *
							factores?.Age.subject.operator ?? 1,
			})),
		[factores?.Age.data, factores?.Age.subject],
	);
	useEffect(() => {}, [dataAge]);
	const locationResult = useMemo(() => {}, []);
	useEffect(() => {
		if (id !== null && edicion === false) {
			_Error({
				title: "No cuenta con los permisos necesarios",
				text: "Favor de contactar al administrador.",
			}).then(() => close());
		}
	}, [id, edicion]);
	useEffect(() => {
		const controller = new AbortController();
		if (queries.tipo !== undefined && queries.tipo_servicio !== undefined) {
			const base = initialState(queries.tipo);
			dispatch(
				load({
					...state,
					factores: base.factors,
					resultado: base.documentation,
					tipo: queries.tipo,
					tipo_servicio: queries.tipo_servicio,
				}),
			);
		}
		if (
			registro !== undefined &&
			queries.tipo !== undefined &&
			queries.tipo_servicio !== undefined &&
			tipo === queries.tipo &&
			tipo_servicio === queries.tipo_servicio &&
			registro !== null
		) {
			//fetchData(controller.signal);
		}
		return () => {
			controller.abort();
		};
	}, [queries, registro]);
	return { queries, state, factores, resultado, dataAge };
};
