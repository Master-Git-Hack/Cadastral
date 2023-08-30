/** @format */

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ci_responsibleparty_role } from "./ci_responsibleparty_role";
import { datatype } from "./datatype";
import { groupcategory } from "./groupcategory";
import { level } from "./level";
import { maintenanceandupdatefrequency } from "./maintenanceandupdatefrequency";
import { md_dataidentification_characterset } from "./md_dataidentification_characterset";
import { md_dataidentification_language } from "./md_dataidentification_language";
import { presentationform } from "./presentationform";
import { spatialrepresentationtype } from "./spatialrepresentationtype";
import { topiccategory } from "./topiccategory";

interface Input extends InputHTMLAttributes<HTMLInputElement> {}
interface Area extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export interface Restriction {
	title: Input;
	purpose: Area;
	abstract: Area;
	md_dataidentification_language: any;
	ci_onlineresource_linkage: Input;
}
export const restrictions: Restriction = {
	title: {
		type: "text",
		required: true,
		placeholder: "Texto libre...",
		className: "w-6/12",
	},
	purpose: {
		required: true,
		rows: 2,
		placeholder: "Texto libre...",
		className: "w-6/12",
	},
	abstract: { required: true, rows: 2, placeholder: "Texto libre...", className: "w-6/12" },
	md_dataidentification_language: {},
	ci_onlineresource_linkage: {
		type: "url",
		required: true,
	},
};
