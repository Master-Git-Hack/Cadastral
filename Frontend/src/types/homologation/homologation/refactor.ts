/** @format */

export interface ReFactoringProps {
	[key: string]: { [key: string]: any };
}

export const refactoringTemplate = (type: string = "TERRENO" || "RENTA"): ReFactoringProps => {
	const data: ReFactoringProps = {
		factorResult: {
			name: type === "TERRENO" ? "FACTOR RESULTANTE" : "FACTOR DE TERRENO",
			value: 0,
		},
	};
	if (type === "TERRENO") {
		data["data"] = [
			{
				name: "FACTOR DE SUPERFICIE",
				value: 1,
			},
			{
				name: "FACTOR DE FORMA",
				value: 1,
			},
		];
		data['surface']={
			value:1
		};
		return data;
	} else return data;
};
