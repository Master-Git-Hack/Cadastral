/** @format */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 } from "uuid";
import { CreateAxiosDefaults } from "axios";
import { now } from "@utils/time";
import { api } from "../api.config";
export interface IScraping {
	survey_point_id: string;
	north: number;
	north_error: number;
	east: number;
	east_error: number;
	height: number;
	height_error: number;
	constraint: string;
}
export interface IPunto {
	id: string;
	image: string;
	title: string;
	x: number;
	y: number;
	z: number;
}
export interface IFotogrametriaState {
	municipios: string[];
	municipio: string | null;
	imagenes: File[];
	scraping: IScraping[];
	puntos: IPunto[];
}
export interface IFotogrametriaActions {
	getMunicipios: () => Promise<void>;
	setMunicipio: (municipio: string) => void;
	setImages: (images: File[]) => void;
	getMap: (etapa?: string) => Promise<void>;

	addImage: (image: File) => void;
	removeImage: (index: number) => void;
	editScraping: (scraping: IScraping) => void;

	addPunto: (punto: IPunto) => void;
	editPunto: (punto: IPunto) => void;
	removePunto: (index: number) => void;

	postScraping: (file: File) => Promise<void>;
	postImages: (file: File[]) => Promise<void>;
	getReport: () => Promise<void>;

	postReport: (data: IFotogrametriaState) => Promise<void>;
	patchReport: (data: IFotogrametriaState) => Promise<void>;
}
const useFotogrametria = create<IFotogrametriaState & IFotogrametriaActions>()(
	persist(
		(set, get) => ({
			municipios: [],
			municipio: null,
			imagenes: [],
			scraping: [],
			puntos: [],
			getMunicipios: async () => {
				const {
					data: { data },
				} = await api.get("fotogrametria/schemas");
				set({ municipios: data });
			},
			setMunicipio: (municipio: string) => set({ municipio }),
			setImages: (imagenes: File[]) => set({ imagenes }),
			getMap: async (etapa?: string) => {
				const {
					data: { data },
				} = await api.get(
					`fotogrametria/map?municipio=${get().municipio}${etapa ? `&etapa=${etapa}` : ""}`,
				);
				set({ scraping: data });
			},
			addImage: (image: File) => set({ imagenes: [...get().imagenes, image] }),
			removeImage: (index: number) =>
				set({ imagenes: get().imagenes.filter((_, i) => i !== index) }),
			editScraping: (scraping: IScraping) =>
				set({
					scraping: get().scraping.map((s) =>
						s.survey_point_id === scraping.survey_point_id ? scraping : s,
					),
				}),
			addPunto: (punto: IPunto) => set({ puntos: [...get().puntos, { id: v4(), ...punto }] }),
			editPunto: (punto: IPunto) =>
				set({ puntos: get().puntos.map((p) => (p.id === punto.id ? punto : p)) }),
			removePunto: (index: number) =>
				set({ puntos: get().puntos.filter((_, i) => i !== index) }),
			postScraping: async (file: File) => {
				const formData = new FormData();
				formData.append("file", file);
				const {
					data: { data },
				} = await api.post("fotogrametria/scraping-project", formData);
				set({ scraping: data });
			},
			postImages: async (files: File[]) => {
				const formData = new FormData();
				files.forEach((file) => formData.append("files", file));
				const {
					data: { data },
				} = await api.post("fotogrametria/metadata-images", formData);
				set({ scraping: data });
			},
			getReport: async () => {
				const {
					data: { data },
				} = await api.get("fotogrametria/report");
				set(data);
			},
			postReport: async () => {
				const {
					data: { data },
				} = await api.post("fotogrametria/report", get());
				// set(data);
			},
			patchReport: async () => {
				const {
					data: { data },
				} = await api.patch("fotogrametria/report", get());
				// set(data);
			},
		}),
		{
			name: "fotogrametria-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
export default useFotogrametria;
