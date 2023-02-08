/** @format */
import { Alert } from "./alert";
import { colorPicker, appearancePicker, colorAlert } from "./color";
import { convert2Base64, exportData2JSON } from "./file";
import {
	formatNumb,
	asFancyNumber,
	roundNumber,
	average,
	standardDeviation,
	mergeSort,
} from "./number";
import { searchByType, searchByValue } from "./search";
import { getURLParams, isURL } from "./url";
import { close } from "./window";
export const Utils = {
	Alert,
	colorPicker,
	appearancePicker,
	colorAlert,
	convert2Base64,
	exportData2JSON,
	formatNumb,
	asFancyNumber,
	roundNumber,
	average,
	standardDeviation,
	mergeSort,
	searchByType,
	searchByValue,
	getURLParams,
	isURL,
	closeWindow: close,
};
export default {
	Alert,
	colorPicker,
	appearancePicker,
	colorAlert,
	convert2Base64,
	exportData2JSON,
	formatNumb,
	asFancyNumber,
	roundNumber,
	average,
	standardDeviation,
	mergeSort,
	searchByType,
	searchByValue,
	getURLParams,
	isURL,
	closeWindow: close,
} as Object;
