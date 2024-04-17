/** @format */

import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import FileSaver from "file-saver";
export const xmlToJson = async (file: File): Promise<any> => {
	if (!file) return null;

	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = async ({ target }: ProgressEvent<FileReader>) => {
			const xmlText = target?.result as string;

			try {
				const parser = new XMLParser({
					ignoreAttributes: true,
					alwaysCreateTextNode: false,
					ignorePiTags: true,
					trimValues: true,
					ignoreDeclaration: true,
				});
				const result = parser.parse(xmlText);
				console.log(result);
				resolve(result);
			} catch (error) {
				reject(error);
			}
		};

		reader.readAsText(file);
	});
};

export const jsonToXml = async (json: any, filename: string): Promise<any> => {
	if (!json) return null;

	return new Promise((resolve, reject) => {
		try {
			const builder = new XMLBuilder();
			const xml = builder.build(json);
			const blob = new Blob([xml], { type: "text/xml;charset=utf-8" });
			FileSaver.saveAs(blob, filename);
			resolve(xml);
		} catch (error) {
			reject(error);
		}
	});
};
