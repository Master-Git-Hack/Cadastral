/** @format */

import FileSaver from "file-saver";

/**
 * It takes a file and returns a promise that resolves to the base64 representation of the file
 * @param {any} file - The file to be converted to base64
 */

export const convertToBase64 = (file: any): Promise<string> =>
	new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

export const exportDataAsJSON = async (payload: any, fileName: string) => {
	const confirmed =
		typeof window !== "undefined" && window.confirm("Do you want to download the record?");
	if (confirmed) {
		const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
		FileSaver.saveAs(blob, `${fileName}.json`);
	}
};
