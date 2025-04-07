"use client";
import { Tipo, TipoMap, TipoReverseMap } from "@/store/homologacion/base";
import { IFactors, IHomologacionState } from "@/store/homologacion/interface";
import type { IJustipreciacionState } from "@/store/justipreciacion/interface";
import useHomo from "@/store/homologacion";
import useJusti from "@/store/justipreciacion";
import { use, useEffect, useMemo, useState, useRef } from "react";
import { stat } from "fs";
import { set } from "date-fns";
interface IUseHomologacion extends Partial<IJustipreciacionState> {
	tipo_servicio?: "justipreciacion";
	isLegacy: boolean;
}
type RecordStatus = "new" | "exists" | "unset";
type CnxData = Record<string, any>;

function transformCnxData(
	cnxData: CnxData,
): Record<string, Record<string, any>> {
	const groupedData: Record<string, Record<string, any>> = {};
	for (const [key, value] of Object.entries(cnxData)) {
		// Updated Regex: Match both 'cn[a-z]' and 'sp[0-9]+'
		const match = key.match(/^((cn[a-z])|(sp\d+))_(.+)$/);
		if (match) {
			const [, prefix, , , fieldName] = match;
			// Initialize group if it doesn't exist
			if (!groupedData[prefix]) {
				groupedData[prefix] = {};
			}
			// Store the value under the cleaned key
			groupedData[prefix][fieldName] = value;
		}
	}
	return groupedData;
}
export default function useHomologacion({
	tipo_servicio,
	isLegacy = true,
	id,
	sp1,
	cna,
	tipo,
}: IUseHomologacion) {
	const {
		registro,
		getJustipreciacionById,
		setJustipreciacion,
		...justipreciacion
	} = useJusti((state) => state);
	const { id: idHomo, type, getHomologacion } = useHomo((state) => state);
	const exists = useRef<RecordStatus>("unset");

	useEffect(() => {
		if (id !== 0) {
			//tipo=terreno&id=322&sp1_superficie=316.71&sp1_factor=1&tipo_servicio=justipreciacion
			setJustipreciacion({ id, sp1, cna });
		}
	}, []);
	const firstCallJusti = async () => {
		const response = await getJustipreciacionById({ isLegacy });
		const {
			data: { exists, ...data },
		} = response?.data;
		console.log(exists);
		setJustipreciacion({ ...transformCnxData(data) });
	};
	useEffect(() => {
		if (registro === null && id !== 0) {
			firstCallJusti();
		}
	}, [registro]);
	// useEffect(() => {
	// 	if(idHomo===0 && exists.current==="unset"){
	// 		getHomologacion({registro,isLegacy});
	// 		exists.current="new";
	// 	}
	// }, [idHomo]);
	return {
		justipreciacion: {
			registro,
			...justipreciacion,
		},
	};
}
