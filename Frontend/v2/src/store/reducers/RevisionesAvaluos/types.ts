/** @format */
interface Requerimiento {
	referencia: string;
	fecha: string;
	cumplimiento: boolean;
	ponderacion: number;
	observaciones?: string;
}

interface Requirements {
	Documental: Requerimiento[];
	Técnico: Requerimiento[];
}
interface Checklist {
	id: number;
	tipo: "comercial" | "justipreciacion";
	fecha_creacion: string;
	registro: string;
	tipo_bien:
		| "CASA HABITACIÓN"
		| "BODEGA INDUSTRIAL"
		| "NAVE INDUSTRIAL"
		| "OFICINAS"
		| "LOCAL COMERCIAL"
		| "PLAZA-CENTRO COMERCIAL"
		| "EDIFICIO DE OFICINAS"
		| "COMPLEJO DE OFICINAS"
		| "TERRENO"
		| "TERRENO CON CONSTRUCCIONES";
	observaciones: string;
	requerimientos: Requirements;
	total_ponderacion_documental: number;
	total_ponderacion_tecnico: number;
	resultado_ponderado: number;
	valudador?: number;
}
interface Revisiones {
	id: number;
	checklist: number;
	revisor: number;
	tipo_revisor: "jefatura" | "coodinacion";
	fecha_creacion: string;
	requerimientos: Requirements[];
	observaciones: string;
	total: number;
	estatus: "pendiente" | "aprobado" | "rechazado";
	parent?: number;
	parend_record?: Revisiones;
}
export interface ReviewState {
	status: "idle" | "loading" | "failed" | "success";
	level: 1 | 2 | 3;
	view: "working" | "printing";
	checklist: Checklist;
	revisiones: Revisiones;
}
