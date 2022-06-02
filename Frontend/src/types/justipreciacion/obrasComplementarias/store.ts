/** @format */
import { Storage } from "./properties";
import { docHandler } from "./documentacion/docHandler";
import { calculousHandler } from "./calculo/calculousHandler";

export const initialState: Storage = {
	documentation: [docHandler.template(1)],
	calculous: [calculousHandler.template(1)],
    total: 1,
    message:"",
	status: "working",
	record: {
		id: 0,
		register: "",
		status: "newOne",
    },
    errors:[],
    handlers: {
        documentation: docHandler,
        calculous: calculousHandler,
        getTotal:(data: any): number =>data.reduce(
            (previous: number, current: any) => previous + Number(current.total),
            0,
        )
    }
}