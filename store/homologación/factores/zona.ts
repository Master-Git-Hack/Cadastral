import {
    defaultFactorData,
    defaultSymbolResult,
    defaultSubject
} from "./base";
export enum CatalogoZona {
    MANZANA,
    VIALIDAD,
    PAVIMENTO,
}

export default {
    catalogo: CatalogoZona,
    default: {
        subject: defaultSubject({}),
        data: defaultFactorData(),
        results: defaultSymbolResult({}),
    },
};
