/** @format */
import { useState, useEffect, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../app";
import { getHomologacion } from ".";
import { consumeApi } from "../../api";
import {
	getJustipreciacion,
	load as loadJustiState,
	loadTerreno as loadJustiTerreno,
} from "../Justipreciacion";
import { roundNumber } from "../../utils/number";
export const useHomologacion = ({
	id,
	tipo,
	sp1_superficie,
	sp1_factor,
	cna_superficie,
	cna_edad,
	tipo_servicio,
}: any) => {
	const dispatch = useAppDispatch();
	const Homologacion = useAppSelector(getHomologacion);
	const Justipreciacion = useAppSelector(getJustipreciacion);
	const state = { ...Justipreciacion };
	const { factors, documentation } = Homologacion;
	console.log(documentation.Area.data);
	const loadJustipreciacion = async () => {
		if (id !== undefined) {
			const { data, status } = await consumeApi().get({ url: `/justipreciacion/${id}` });
			if (status === 200) {
				dispatch(loadJustiState(data?.data));
				if (tipo.toUpperCase() === "TERRENO") {
					dispatch(
						loadJustiTerreno({
							sp1_superficie: parseFloat(sp1_superficie),
							sp1_factor: parseFloat(sp1_factor),
						}),
					);
				} else {
				}
			} else {
			}
		}
	};

	const areaData = useCallback(() => {
		const { data } = Homologacion.factors.Zone;
		const { Area } = documentation;
		const { zone, factors } = Area.subject;
		return Area.data.map((item: any, index: number) => {
			item.factorResult1 = 1;
			item.factorResult2 = 1;
			const { extras } = item.address;
			let root = !factors[0].type.includes("percentage") ? factors[0].root : 1;
			let value = zone[factors[0].type] / item.address.zone[factors[0].type];
			extras.factor1 = value ** (1 / root);

			root = !factors[1].type.includes("percentage") ? factors[1].root : 1;
			value = zone[factors[1].type] / item.address.zone[factors[1].type];
			extras.factor2 = factors[1].type.includes("useZoneResults")
				? data[index].value
				: value ** (1 / root);

			item.factorResult1 = !isNaN(extras.factor1 * extras.factor2)
				? extras.factor1 * extras.factor2
				: 1;
			item.factorResult2 = !isNaN(item.factorResult1 * data[index].value)
				? item.factorResult1 * data[index].value
				: 1;
			return item;
		});
	}, [documentation, factors]);
	const zoneResults = useCallback(
		() =>
			areaData()?.map(({ factorResult1, factorResult2, id }: any) => ({
				id,
				factor1: factorResult1,
				factor2: factorResult2,
			})),
		[areaData],
	);
	const salesCost = useCallback(() => {
		let resultReFactor = 1;
		const { Area, SalesCost, WeightingPercentage } = documentation;
		const data = SalesCost.data.map(({ value, ...item }: any, index: number) => ({
			...item,
			unitaryCost: value / Area.data[index].value ?? 1,
		}));
		const results = SalesCost.results.map(({ value, ...item }: any, index: number) => ({
			...item,
			value: WeightingPercentage.data[index].value * data[index].unitaryCost ?? 1,
		}));
		const averageUnitCost = () => {
			const { roundedTo, roundedResult } = SalesCost.averageUnitCost;
			const value = data.reduce(
				(previous: number, current: any, index: number) =>
					previous +
					Number(current.value * (WeightingPercentage.data[index].value / 100)),
				0,
			);
			const roundedValue: number = roundNumber(value, roundedTo.value);
			const result: number = roundedValue * resultReFactor;
			const adjustedValue: number = roundNumber(result, roundedResult.value);

			return {
				value,
				roundedValue,
				results,
				adjustedValue,
				roundedTo,
				roundedResult,
			};
		};
		return { data, results, averageUnitCost: averageUnitCost() };
	}, [documentation]);

	useEffect(() => {
		id !== undefined && loadJustipreciacion();
	}, [id]);
	return {
		state,
		areaData,
		salesCost,
	};
};
