/** @format */

module.exports = {
	/**
     * 
{
    id: id ? Number(id) : 0,
	type,
	status: "working",
	rowsCount: 1 as number,
	factors: {
		ages: { ...ageTemplate, isUsed: type === "TERRENO" ? false : true },
		buildings: buildingTemplate,
		classification: classificationTemplate,
		commercial: commercialTemplate,
		level: levelTemplate,
		location: LocationTemplate,
		project: projectTemplate,
		quality: qualityTemplate,
		surface: surfaceTemplate,
		topography: {
			...topographyTemplate,
			data: [topographyData(1, type)],
		},
		typeForm: {
			...typeFormTemplate,
			data: [typeFormData(1, type)],
		},
		usage: usageTemplate,
		zone: ZoneTemplate,
		results: resultsTemplate,
	},
	homologation: {
		areas: areasTemplate(type),
		salesCosts: salesCostTemplate,
		weightingPercentage: weightingPercentageTemplate,
	},
	averageUnitCost: 1 as number,
}
     */
	id: 0,
	type: "TERRENO",
	status: "working",
	rowsCount: 1,
	factors: {
		ages: {
			name: "Edad",
			tag: "FEd.",
			subject: {
				value: 1,
			},
			data: [
				{
					id: 1,
					value: 1,
					result: 1,
				},
			],
			isUsed: false,
		},
		buildings: {
			name: "Construccion",
			tag: "FCons.",
			subject: {
				type: "RESIDENCIAL PLUS",
				value: 1.08,
			},
			data: [
				{
					id: 1,
					type: "RESIDENCIAL PLUS",
					value: 1.08,
					result: 1,
				},
			],
			isUsed: true,
		},
		classification: {
			name: "Clasificacion",
			tag: "FClas.",
			subject: {
				type: "URBANO",
				value: 1.1,
			},
			data: [
				{
					id: 1,
					type: "URBANO",
					value: 1.1,
					result: 1,
				},
			],
			isUsed: true,
		},
		commercial: {
			name: "Comercial",
			tag: "FCom.",
			data: [
				{
					id: 1,
					value: 1,
				},
			],
			isUsed: true,
		},
		level: {
			name: "Nivel",
			tag: "FNiv.",
			subject: {
				type: "SOTANO 1",
				value: 0.9,
			},
			data: [
				{
					id: 1,
					type: "SOTANO 1",
					value: 0.9,
					result: 1,
				},
			],
			isUsed: true,
		},
		location: {
			name: "Ubicación",
			tag: "FUbic.",
			data: [
				{
					id: 1,
					C1: {
						type: "+",
						value: 1,
					},
					percentage: 0,
					observations: "",
				},
			],
			results: [
				{
					id: 1,
					value: 1,
				},
			],
			isUsed: true,
		},
		project: {
			name: "Proyecto",
			tag: "FProy.",
			subject: {
				type: "EXCELENTE",
				value: 1.06,
			},
			data: [
				{
					id: 1,
					type: "EXCELENTE",
					value: 1.06,
					result: 1,
				},
			],
			isUsed: true,
		},
		quality: {
			name: "Calidad",
			tag: "FCal.",
			subject: {
				type: "PRECARIA",
				value: 0.91,
			},
			data: [
				{
					id: 1,
					type: "PRECARIA",
					value: 0.91,
					result: 1,
				},
			],
			isUsed: true,
		},
		surface: {
			name: "Superficie",
			tag: "FSup.",
			data: [
				{
					id: 1,
					value: 1,
				},
			],
			isUsed: true,
		},
		topography: {
			name: "Topografía",
			tag: "FTop.",
			subject: {
				type: "PLANA",
				value: 1,
			},
			data: [
				{
					id: 1,
					type: "PLANA",
					value: 1,
					result: 1,
				},
			],
			isUsed: true,
		},
		typeForm: {
			name: "Forma",
			tag: "FFo.",
			subject: {
				type: "REGULAR",
				value: 1,
			},
			data: [
				{
					id: 1,
					type: "REGULAR",
					value: 1,
					result: 1,
				},
			],
			isUsed: true,
		},
		usage: {
			name: "Uso",
			tag: "FUso.",
			subject: {
				type: "HABITACIONAL",
				value: 1,
			},
			data: [
				{
					id: 1,
					type: "HABITACIONAL",
					value: 1,
					result: 1,
				},
			],
			isUsed: true,
		},
		zone: {
			name: "Zona",
			tag: "FZo.",
			results: [
				{
					id: 1,
					value: 1,
				},
			],
			data: [
				{
					id: 1,
					C1: {
						type: "+",
						value: 1,
					},
					percentage: 0,
					observations: "",
				},
			],
			isUsed: true,
		},
		results: {
			name: "Homologación Resultante",
			tag: "F.Ho.Re.",
			data: [
				{
					id: 1,
					value: 1,
				},
			],
			isUsed: false,
		},
	},
	homologation: {
		areas: {
			averageLotArea: 1,
			data: [
				{
					id: 1,
					value: 1,
				},
			],
		},
		salesCosts: {
			data: [
				{
					id: 1,
					value: 1,
					unitaryCost: 1,
				},
			],
			results: [
				{
					id: 1,
					value: 1,
				},
			],
			averageUnitCost: 1,
		},
		weightingPercentage: {
			total: 1,
			data: [
				{
					id: 1,
					value: 100,
				},
			],
		},
	},
	averageUnitCost: 1,
};
