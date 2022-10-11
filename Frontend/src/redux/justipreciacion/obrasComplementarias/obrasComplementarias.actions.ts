/** @format */

import { roundNumber } from "../../../utils/number";
import { StateProps } from "./obrasComplementarias.interface";

/** @format */
const handleData = (data: any) =>
	data.map(({ ind, value, quantity, ...item }: any) => ({
		...item,
		ind,
		value,
		quantity,
		total: ind * value * quantity,
	}));
export const UpdateDocumentation =({
	Documentation,
getDataTotal, getTotalByUnit, getGTOFactor, getTotalArea ,
	
}:any) => Documentation.map(
	({ data, total, totalByUnit, factorGTO, area, ...item }: any) => ({
		...item,
		area: {
			...area,
			unit: area.data[0].unit,
			total: getTotalArea(area.data),
		},
		data: handleData(data),
		total: getDataTotal(handleData(data)),
		totalByUnit: roundNumber(
			getTotalByUnit(
				getTotalArea(area.data),
				getDataTotal(handleData(data)) * getGTOFactor(factorGTO),
			),
			0,
		),
		factorGTO,
	}),
)
export const updateValuesFN = ({
	Documentation,
	Calculation,
	handlers: {
		documentation: { getDataTotal, getTotalByUnit, getGTOFactor, getTotalArea },
		calculo: { getFactor },
		getFinalTotal,
	},
}: StateProps) => ({
	Documentation: UpdateDocumentation({Documentation,getDataTotal, getTotalByUnit, getGTOFactor, getTotalArea}),
	Calculation: Calculation.map(({ vut, age, conservation, ...item }: any, index: number) => {
		const { totalByUnit, area } = Documentation[index];
		const factor = getFactor(age.value, vut);
		const repositionValue = factor * conservation.value * totalByUnit;
		const total = repositionValue * area.total;
		return { ...item, vut, conservation, age: { ...age, factor }, repositionValue, total };
	}),
	total: getFinalTotal(Calculation),
});
export const updatePartialValuesFN = ({
	Documentation,
	Calculation,
	handlers: {
		documentation: { getDataTotal, getTotalByUnit, getGTOFactor, getTotalArea },
		calculo: { getFactor },
		getFinalTotal,
	},
}: StateProps) => ({
	Calculation: Calculation.map(({ vut, age, conservation, ...item }: any, index: number) => {
		const { totalByUnit, area } = Documentation[index]
		const factor = getFactor(age.value, vut);
		const repositionValue = factor * conservation.value * totalByUnit;
		const total = repositionValue * area.total;
		return { ...item, vut, conservation, age: { ...age, factor }, repositionValue, total };
	}),
	total: getFinalTotal(Calculation),
});
export const checkErrorsFN = ({ Documentation, Calculation }: StateProps) => {
	const errors: Array<{ title: string; message: string; reference: string }> = [];
	Documentation.map(({ area, data, ...item }: any, index: number) => {
		area.data.map(({ description, status, ...elements }: any, indx: number) => {
			if (description.trim() === "") {
				errors.push({
					title: "Descripción de la área",
					message: "La descripción no puede estar vacía",
					reference: `Página 1, Fila ${indx + 1}, Tabla Superior del registro ${
						index + 1
					}`,
				});
			}
			if (status !== null) {
				errors.push({
					title: `Estado de la Fila`,
					message: "No puede dejar la fila sin guardar",
					reference: `Página 1, Fila ${indx + 1}, Tabla Superior del registro ${
						index + 1
					}`,
				});
			}
			return { ...elements, description, status };
		});

		data.map(({ description, status, ...elements }: any, indx: number) => {
			if (description.trim() === "") {
				errors.push({
					title: "Descripción de los materiales",
					message: "La descripción no puede estar vacía",
					reference: `Página 1, Fila ${indx + 1}, Tabla Inferior del registro ${
						index + 1
					}`,
				});
			}
			if (status !== null) {
				errors.push({
					title: `Estado de la Fila`,
					message: "No puede dejar la fila sin guardar",
					reference: `Página 1, Fila ${indx + 1}, Tabla Inferior del registro ${
						index + 1
					}`,
				});
			}
			return {
				...elements,
				description,
				status,
			};
		});
		const { title, status } = Calculation[index];
		if (title.trim() === "") {
			errors.push({
				title: "Título",
				message: "El título no puede estar vacío, es la descripción de la obra",
				reference: `Página 2, Fila ${index + 1} `,
			});
		}
		if (status !== null) {
			errors.push({
				title: `Estado de la Fila`,
				message: "No puede dejar la fila sin guardar",
				reference: `Página 2, Fila ${index + 1}`,
			});
		}
		return { ...item, area, data };
	});
	return errors;
};
