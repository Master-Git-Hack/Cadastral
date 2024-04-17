/** @format */

import { ReviewState } from "./types";
import { getNow } from "@utils/datetime";
import { PayloadAction } from "@reduxjs/toolkit";

const comercial = {
	Documental: [
		{
			label: "Antecedentes",
			children: [
				{
					label: "Revisar dentro de las bases de Catastro si existe algún registro realizado anteriormente del mismo inmueble.",
				},
				{ label: "Verificar que se este usando el formato vigente del avalúo." },
			],
			value: 5,
		},
		{
			label: "Fecha de Servicio",
			children: [{ label: "Revisar que la fecha coincida en todo el documento." }],
			value: 2,
		},
		{
			label: "Folios",
			children: [
				{
					label: "Revisar que los folios de solicitud y su fecha correspondan a los capturados en el avalúo.",
				},
				{
					label: "Revisar, para los casos de embargo o peritajes, el número de expediente dentro del servicio.",
				},
			],
			value: 3,
		},
		{
			label: "Solicitante",
			children: [
				{
					label: "Revisar que el nombre del solicitante corresponda con el capturado en el oficio de solicitud.",
				},
				{
					label: "Revisar que el propietario corresponda con la información legal proporcionada.",
				},
			],
			value: 5,
		},
		{
			label: "Observaciones",
			children: [{ label: "Verificar que las notas sean consistentes con el avalúo." }],
			value: 5,
		},
		{
			label: "Documentos",
			children: [
				{
					label: "Verificar que en documentación se cuente con la información completa y acorde al tipo de inmueble valuado.",
				},
				{ label: "Verificar que la información sea legible." },
				{
					label: "Verificar que la información sea la correcta y que corresponde al inmueble valuado.",
				},
				{ label: "Verificar que se incluya el soporte del cálculo de áreas." },
			],
			value: 3,
		},
		{
			label: "Impresión",
			children: [
				{
					label: "Revisión y ortografía de todo el documento previo a la impresión del servicio.",
				},
				{
					label: "No deberán existir hojas en blanco en la impresión, así como tampoco hojas que prácticamente toda esta en blanco (tiene muy pocos renglones escritos), se deberá ajustar el archivo.",
				},
				{ label: "Verificar los pie de páginas y la paginación para que estén correctos." },
				{
					label: "Verificar que los textos están completos en las celdas, en ocasiones se cortan dichos textos por no ajustar las celdas.",
				},
				{
					label: "Verificar que no aparezcan símbolos raros en el documento (#REF, ###, etc.).",
				},
				{
					label: "Verificar que el documento NO tenga celdas en colores que se quedan de algunas revisiones.",
				},
				{
					label: "Verificar que las fotos y anexos queden dentro de los recuadros establecidos  y que el pie de foto describa correctamente la foto que se anexa.",
				},
			],
			value: 4,
		},
		{
			label: "Otro",
			children: [{ label: "OTRO" }],
			value: 1,
		},
	],
	Técnico: [
		{
			label: "Ubicación",
			children: [
				{
					label: "Incluir plano en mapa o satelital de macrolocalización y microlocalización del bien, claro y legible hasta identificar los textos de las calles, forzosamente vialidades principales. Indicando la poligonal del sujeto cuando aplique (Terrenos).",
				},
				{
					label: "Verificar que los datos de la ubicación sean correctos (Calle, número, municipio, etc…)",
				},
			],
			value: 4,
		},
		{
			label: "Uso de Suelo",
			children: [
				{
					label: "Indicar dentro del servicio el uso de suelo actual, así como anexo de la evidencia mediante el documento de respaldo vigente (uso de suelo, PDU, Gaceta, etc.), Incluir la tabla de compatibilidad de usos, en caso de no existir describir los usos permitidos u observados.",
				},
			],
			value: 5,
		},
		{
			label: "Comparables",
			children: [
				{
					label: "Se requieren al menos 4 comparables de mercado con una vigencia de 6 meses. Se deberán incluir las cédulas de mercado da cada uno de los comparables utilizados (para cada enfoque y contraste) la información de las fichas debe estar completa.",
				},
				{
					label: "Las cédulas de mercado deben describir todos los aspectos relativos a lamisma. Observar tipo de pavimentos, amenidades con los que se cuenta, etc…",
				},
				{
					label: "Incluir mapeo en archivo kml de la ubicación de los comparables y sujeto (opcional) con relación al Perímetro de Contención Urbana (PCU) y/o Plan de Desarrollo Urbano (PDU) o documento similar, para cada enfoque y contraste aplicado, cuando estos no existan en la zona de estudio se considera como cumplida.",
				},
			],
			value: 15,
		},
		{
			label: "Restricción / Afectación / Servidumbre",
			children: [
				{
					label: "Señalar si existe algún tipo de restricción, afectación, servidumbre, invasión y/o expropiación de acuerdo a lo indicado en elinstructivo de trabajo (IT-XXXX), anexando al servicio el documento que lo justifique; invariablemente cuando se presente algún tipo de situación, deberá presentar un plano que sea legible, señalando el área (con cotas) motivo de restricción, afectación, servidumbre, invasión, expropiación. Cuando esta situación no exista en el sujeto, este punto se considera como cumplido.",
				},
				{
					label: "En caso de existir afectación en el terreno, el valor de dicha fracción no deberá ser considerado en el valor concluido. Cuando esta situación no exista en el sujeto, este punto se considera como cumplido.",
				},
			],
			value: 5,
		},
		{
			label: "Factores Aplicados, Homologación y Dispersiones",
			children: [
				{
					label: "Se deberá de integrar dentro del servicio la justificación numérica de los factores utilizados fuera de los rangos del 0.80 a 1.10. Excepto; FIC, superficie y edad. Nota 1: No deben incluir factores que integren temas sociales y/o legales.",
				},
				{
					label: "Las tablas de factores deben ser coincidentes con las condiciones del sujeto.",
				},
				{
					label: "Observar los tres filtros de dispersión para que se cumplan por lo menos 2 de los 3 filtros:",
				},
				{
					label: "Cumple con factores de homologación resultante de cada comparable en el rango de 0.70 a 1.30.",
				},
				{
					label: "La relación entre el máximo y mínimo de los valores homologados no deberá ser mayor a la relación entre el máximo y mínimo de los valores naturales.",
				},
				{
					label: "El coeficiente de variación (Desviación estandar / Media) entre los comparables no deberá superar el 9%.",
				},
				{
					label: "En caso de no cumplir con los filtros de dispersión, justificar y proceder.",
				},
			],
			value: 20,
		},
		{
			label: "Capitalización de Ingresos",
			children: [
				{
					label: "Aplicación de la superficie rentable de acuerdo a las consideraciones de mercado. Si la oferta de mercado incluye como superficie rentable las oficinas, bodegas, estacionamiento, etc. se deberá de integrar las notas correspondientes que justifiquen la superficie rentable utilizada.",
				},
				{
					label: "Aplicación de deducciones y tasa de capitalización, de acuerdo a la información actualizada (cetes, INPC, Beta), considerando el tipo de bien y edad cronológica. Se deben considerar los vacíos reales reportados en el rent roll o contrato(s).",
				},
			],
			value: 5,
		},
		{
			label: "Valores de Reposición Nuevo (VRN)",
			children: [
				{
					label: "Que exista una tipología de construcciones (integrar tabla de áreas desglosada por cada una y plano y/o croquis donde se identifiquen gráficamente), así como la vida útil total, edad y VRN diferenciada de acuerdo a dicha tipología; se deberá integrar las notas correspondientes que justifiquen los puntos anteriores utilizados.  Cuando esta situación no exista en el sujeto, este punto se considera como cumplido.",
				},
				{
					label: "Dentro del Lote con Servicios al contar con construcciones, IE, EA, OC, indicar tipología de construcciones, así como la vida útil total, edad y VRN diferenciada de acuerdo a dicha tipología.",
				},
			],
			value: 5,
		},
		{ label: "Obsolescencias", children: [{ label: "" }], value: 3 },
	],
};
//{ label: "", children: [{label:""},], value: 0 },
export const initialState: ReviewState = {
	status: "idle",
	level: 1,
	view: "working",
	checklist: {
		id: 0,
		tipo: "comercial",
		registro: "",
		fecha_creacion: getNow(),
		tipo_bien: "CASA HABITACIÓN",
		observaciones: "",
		requerimientos: {
			Documental: [],
			Técnico: [],
		},
		total_ponderacion_documental: 0.0,
		total_ponderacion_tecnico: 0.0,
		resultado_ponderado: 0.0,
	},
};
export const reducers = {};
