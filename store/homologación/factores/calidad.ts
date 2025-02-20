import { defaultFactorData} from "./base";
export enum CatalogoConstruccion {
    "PRECARIA" = 0.91,
    "BAJA" = 0.94,
    "ECONÓMICA" = 0.97,
    "COMERCIAL" = 1.0,
    "INTERÉS SOCIAL" = 1.03,
    "MEDIA COMÚN" = 1.06,
    "MEDIA ALTA" = 1.09,
    "ALTA" = 1.12,
    "LUJO" = 1.15,
    "RESIDENCIAL" = 1.2
}

export interface IConstruccion {
    label: keyof typeof CatalogoConstruccion;
    value: number;
}

export const categoriaConstruccionOptions: IConstruccion[] = Object.entries(CatalogoConstruccion)
    .map(([label, value]) => ({
        label: label as keyof typeof CatalogoConstruccion,
        value: value as number
    }));
export const defaultSubject: IConstruccion = categoriaConstruccionOptions[0];
export const defaultData = defaultFactorData({ props: defaultSubject });
export default{
    catalogo: CatalogoConstruccion,
    options: categoriaConstruccionOptions,
    default:{
        subject:defaultSubject,
        data:defaultData,
       
    }
}