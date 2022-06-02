import { calculousStorage } from "./calculo/calculousStorage";
import { dataStorage } from "./documentacion/docStorage";

export interface properties {
    [key: string|number]: any;
}
export interface record {
    id: number;
	register: string;
	status: string;
}
export interface Storage{
	documentation: Array<dataStorage>;
	calculous: Array<calculousStorage>;
    total: number;
    message: string;
    status: string;
    errors: Array<properties>;
    record: record;
    handlers: properties;
}