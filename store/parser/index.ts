/** @format */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "../api.config";
import { NextRouter } from "next/router";

export interface IParserState {
	file?: File | File[];
	filename?: string;
	fileType?: string;
	data: object;
}

export interface IParserActions {
	xmlToJson: (file: IParserState, router?: NextRouter) => Promise<any>;
	jsonToXml: (data: object, router?: NextRouter) => Promise<Blob>;
	clearFile: () => void;
	setFile: (file: File | File[]) => void;
	setParser: (data: IParserState) => void;
}
const useParser = create<IParserState & IParserActions>()(
	persist(
		(set, get) => ({
			file: null,
			filename: null,
			fileType: null,
			data: {},
			xmlToJson: async (file: File, router?: NextRouter) => {
				const formData = new FormData();
				formData.append("file", file);
				return await api.post(`parser?from=xml&to=json`, formData, true, {}, router);
			},
			jsonToXml: async (json: any, filename: string, router?: NextRouter) => {},

			clearFile: () => set({ file: null, filename: null, fileType: null, data: {} }),

			setFile: (file: File | File[]) =>
				set({
					...state,
					file: file,
					filename: Array.isArray(file) ? file[0].name : file.name,
					fileType: Array.isArray(file) ? file[0].type : file.type,
				}),
			setParser: (data: IParserState) => set(data),
		}),

		{
			name: "parser-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useParser;
