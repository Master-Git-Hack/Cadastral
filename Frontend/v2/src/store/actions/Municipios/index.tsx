/** @format */
import { useState, useEffect } from "react";
import { IuseMunicipios, Type } from "./types";
import {
	useGetMunicipiosQuery,
	useGetMunicipioQuery,
	useGetIndicadoresQuery,
	useGetRawIndicadoresQuery,
	useGetDepartamentosQuery,
} from "@api/Municipios";
import {
	IMunicipio,
	translateIndicador,
	IDepartamentoSolicitante,
	IIndicador,
	IIndicator,
	indicadores,
} from "@api/Municipios/types";
export default function useMunicipios({ type, municipio: param }: IuseMunicipios) {
	const {
		data: dataMunicipios,
		error: errorMunicipios,
		isLoading: municipiosIsLoading,
		isFetching: municipiosIsFetching,
	} = useGetMunicipiosQuery(null);
	const {
		data: dataMunicipio,
		error: errorMunicipio,
		isLoading: municipioIsLoading,
		isFetching: municipioIsFetching,
	} = useGetMunicipioQuery(param ?? "guanajuato");
	const {
		data: dataIndicators,
		error: errorIndicators,
		isLoading: indicatorIsLoading,
		isFetching: indicatorIsFetching,
	} = useGetIndicadoresQuery(null);
	const {
		data: dataRawIndicators,
		error: errorRawIndicators,
		isLoading: rawIndicatorIsLoading,
		isFetching: rawIndicatorIsFetching,
	} = useGetRawIndicadoresQuery(null);
	const {
		data: dataDepartamentos,
		error: errorDepartamentos,
		isLoading: departamentoIsLoading,
		isFetching: departamentoIsFetching,
	} = useGetDepartamentosQuery(null);
	const [municipios, setMunicipios] = useState<IMunicipio[] | null>(null);
	const [municipio, setMunicipio] = useState<IMunicipio | null>(null);
	const [indicadores, setIndicadores] = useState<IIndicator[] | null>(null);
	const [rawIndicadores, setRawIndicadores] = useState<IIndicador[] | null>(null);
	const [departamentos, setDepartamentos] = useState<IDepartamentoSolicitante[] | null>(null);

	useEffect(() => {
		if (municipiosIsLoading || municipiosIsFetching) setMunicipios([]);
		if (dataMunicipios) setMunicipios(dataMunicipios?.data ?? dataMunicipios);
		if (errorMunicipios) setMunicipios(null);
	}, [dataMunicipios, errorMunicipios, municipiosIsLoading, municipiosIsFetching]);
	useEffect(() => {
		if (municipioIsLoading || municipioIsFetching) setMunicipio({});
		if (dataMunicipio) setMunicipio(dataMunicipio?.data ?? dataMunicipio);
		if (errorMunicipio) setMunicipio(null);
	}, [dataMunicipio, errorMunicipio, municipioIsLoading, municipioIsFetching]);
	useEffect(() => {
		if (indicatorIsLoading || indicatorIsFetching) setIndicadores([]);
		if (dataIndicators) setIndicadores(dataIndicators?.data ?? dataIndicators);
		if (errorIndicators) setIndicadores(null);
	}, [dataIndicators, errorIndicators, indicatorIsLoading, indicatorIsFetching]);
	useEffect(() => {
		if (rawIndicatorIsLoading || rawIndicatorIsFetching) setRawIndicadores([]);
		if (dataRawIndicators) setRawIndicadores(dataRawIndicators?.data ?? dataRawIndicators);
		if (errorRawIndicators) setRawIndicadores(null);
	}, [dataRawIndicators, errorRawIndicators, rawIndicatorIsLoading, rawIndicatorIsFetching]);
	useEffect(() => {
		if (departamentoIsLoading || departamentoIsFetching) setDepartamentos([]);
		if (dataDepartamentos) setDepartamentos(dataDepartamentos?.data ?? dataDepartamentos);
		if (errorDepartamentos) setDepartamentos(null);
	}, [dataDepartamentos, errorDepartamentos, departamentoIsLoading, departamentoIsFetching]);
	if (type === Type.municipios) {
		return {
			data: municipios,
			isLoading: municipiosIsLoading || municipiosIsFetching,
			error: errorMunicipios,
		};
	}
	if (type === Type.municipio) {
		return {
			data: municipio,
			isLoading: municipioIsLoading || municipioIsFetching,
			error: errorMunicipio,
		};
	}
	if (type === Type.indicadores) {
		return {
			data: indicadores,
			isLoading: indicatorIsLoading || indicatorIsFetching,
			error: errorIndicators,
		};
	}
	if (type === Type.rawIndicadores) {
		return {
			data: rawIndicadores,
			isLoading: rawIndicatorIsLoading || rawIndicatorIsFetching,
			error: errorRawIndicators,
		};
	}
	if (type === Type.departamentos) {
		return {
			data: departamentos,
			isLoading: departamentoIsLoading || departamentoIsFetching,
			error: errorDepartamentos,
		};
	}
	return {
		indicadores: {
			data: indicadores,
			isLoading: indicatorIsLoading || indicatorIsFetching,
			error: errorIndicators,
		},
		rawIndicadores: {
			data: rawIndicadores,
			isLoading: rawIndicatorIsLoading || rawIndicatorIsFetching,
			error: errorRawIndicators,
		},
		municipios: {
			data: municipios,
			isLoading: municipiosIsLoading || municipiosIsFetching,
			error: errorMunicipios,
		},
		municipio: {
			data: municipio,
			isLoading: municipioIsLoading || municipioIsFetching,
			error: errorMunicipio,
		},
		departamentos: {
			data: departamentos,
			isLoading: departamentoIsLoading || departamentoIsFetching,
			error: errorDepartamentos,
		},
	};
}
