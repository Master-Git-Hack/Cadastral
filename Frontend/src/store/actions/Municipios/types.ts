export enum Type{
    "municipios"="MUNICIPIOS",
    "municipio"="MUNICIPIO",
    "indicadores"="INDICADORES",
    "rawIndicadores"="RAW_INDICADORES",
    "departamentos"="DEPARTAMENTOS"
}
export interface IuseMunicipios { 
    type?: Type;
    municipio?: string;
}