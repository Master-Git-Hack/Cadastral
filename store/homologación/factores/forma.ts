import { Tipo} from "./base";
export enum CatalogoFormaTipoRenta {
    "REGULAR" = 1.0,
    "IRREGULAR LIGERO" = 0.98,
    "P.I. DE 4 LADOS" = 0.96,
    "P.I. DE 5 LADOS" = 0.94,
    "P.I. DE 6 LADOS" = 0.92,
    "IRREGULAR PESADO" = 0.9
}

export enum CatalogoFormaTipoTerreno {
    "REGULAR" = 1.0,
    "IRREGULAR LIGERO" = 0.98,
    "P.I. DE 4 LADOS" = 0.95,
    "P.I. DE 5 LADOS" = 0.93,
    "P.I. DE 6 LADOS" = 0.9,
    "IRREGULAR PESADO" = 0.85
}

// 🔥 Función reutilizable para convertir enums a arrays de opciones
const enumToOptions = (enumObj: Record<string, number>) =>
    Object.entries(enumObj).map(([label, value]) => ({ label, value }));

// ✅ Aplicación de la función a los enums
export const opcionesRenta = enumToOptions(TipoRenta);
export const opcionesTerreno = enumToOptions(TipoTerreno);