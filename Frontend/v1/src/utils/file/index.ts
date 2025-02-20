/** @format */

import FileSaver from "file-saver";

/**
 * It takes a file and returns a promise that resolves to the base64 representation of the file
 * @param {any} file - The file to be converted to base64
 */

export const convert2Base64 = (file: any) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
export const exportData2JSON = async (payload: any, url: string) =>
	typeof window !== "undefined" &&
	window.confirm("Desea descargar el registro realizado?") &&
	FileSaver.saveAs(
		URL.createObjectURL(
			new Blob([JSON.stringify(payload)], {
				type: "application/json",
			}),
		),
		`${url}.json`,
	);
