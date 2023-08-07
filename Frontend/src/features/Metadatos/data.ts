export const structure=({title}:any) => [{
    id: 1,
    title: "Identificación del conjunto de datos espaciales o producto",

    data: []
}]
interface MetadataItem {
    padding: string;
    hasTooltip?: boolean;
    tooltip?: string;
  colSpan?: string;
}

interface MetadataSection {
  id: number;
    title: string;
    labels?: string[];
    values?: any;
  data: MetadataItem[];
}

export const metadata= ({title}): MetadataSection[]=> [
  {
    id: 1,
    title: "Identificación del conjunto de datos espaciales o producto",
    data: [
     {
        label: "1.1 Título del conjunto de datos espaciales o producto.",
        value:title,
        padding: "3",
        colSpan: "0",
        hasTooltip: false,
        tooltip:""
    }
      // Add more data items here as needed...
    ],
  },
  {
    id: 2,
    title: "Fechas relacionadas con el conjunto de datos espaciales o producto",
    data: [
      // Add data items for section 2...
    ],
  },
  {
    id: 3,
    title: "Unidad del estado responsable del conjunto de datos espaciales o producto",
    data: [
      // Add data items for section 3...
    ],
  },
  {
    id: 4,
    title: "Localización geográfica del conjunto de datos espaciales o producto (Representación espacial)",
    data: [
      // Add data items for section 4...
    ],
  },
  {
    id: 5,
    title: "Sistema de Referencia",
    data: [
      // Add data items for section 5...
    ],
  },
  {
    id: 6,
    title: "Calidad de la información",
    data: [
      // Add data items for section 6...
    ],
  },
  {
    id: 7,
    title: "Entidades y Atributos",
    data: [
      // Add data items for section 7...
    ],
  },
  {
    id: 8,
    title: "Distribución",
    data: [
      // Add data items for section 8...
    ],
  },
  {
    id: 9,
    title: "Información de metadatos",
    data: [
      // Add data items for section 9...
    ],
  },
];