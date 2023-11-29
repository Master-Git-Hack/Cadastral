/** @format */

export const maintenanceandupdatefrequency = [
	{ label: "Diariamente", description: "Los datos se actualizan cada día", code: "1" },
	{ label: "Semanalmente", description: "Los datos se actualizan cada semana", code: "2" },
	{ label: "Quincenalmente", description: "Los datos se actualizan cada 2 semanas", code: "3" },
	{ label: "Mensualmente", description: "Los datos se actualizan cada mes", code: "4" },
	{ label: "Trimestralmente", description: "Los datos se actualizan cada 3 meses", code: "5" },
	{ label: "Semestralmente", description: "Los datos se actualizan 2 veces al año", code: "6" },
	{ label: "Anualmente", description: "Los datos se actualizan cada año", code: "7" },
	{
		label: "Irregular",
		description: "Los datos se actualizan en intervalos desiguales en duración",
		code: "8",
	},
	{
		label: "No programado",
		description: "La actualización de los datos no está planeada",
		code: "9",
	},
	{
		label: "Desconocido",
		description: "La frecuencia de mantenimiento de los datos no se conoce",
		code: "10",
	},
	{
		label: "Otro",
		description: "Especificar la frecuencia de mantenimiento que aplica a los datos",
		code: "11",
	},
];
