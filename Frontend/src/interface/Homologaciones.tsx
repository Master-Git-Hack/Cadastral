import React, { useState } from "react";
import Factors from "../components/factors/Interface";

export default function Homologaciones(props: any) {
  const typeFactor = "TERRENO";
  const periphery: Array<any> = [
    {
      type: "URBANO",
      value: 1.1,
    },
    {
      type: "SUBURBANO",
      value: 1.05,
    },
    {
      type: "RÚSTICO",
      value: 1.0,
    },
    {
      type: "RURAL",
      value: 0.95,
    },
  ];
  const type_form: Array<any> = [
    {
      type: "REGULAR",
      value: 1.0,
    },
    {
      type: "IRREGULAR LIGERO",
      value: typeFactor === "TERRENO" ? 0.97 : 0.98,
    },
    {
      type: "P.I. DE 4 LADOS",
      value: typeFactor === "TERRENO" ? 0.95 : 0.96,
    },
    {
      type: "P.I. DE 5 LADOS",
      value: typeFactor === "TERRENO" ? 0.93 : 0.94,
    },
    {
      type: "P.I. DE 6 LADOS",
      value: typeFactor === "TERRENO" ? 0.9 : 0.92,
    },
    {
      type: "IRREGULAR PESADO",
      value: typeFactor === "TERRENO" ? 0.85 : 0.9,
    },
  ];
  const usage: Array<any> = [
    {
      type: "HABITACIONAL",
      value: 1.0,
    },
    {
      type: "COMERCIAL",
      value: 1.03,
    },
    {
      type: "MIXTO H-C",
      value: 1.05,
    },
    {
      type: "INDUSTRIAL",
      value: 1.07,
    },
    {
      type: "MIXTO I-H",
      value: 0.97,
    },
    {
      type: "MIXTO I-C",
      value: 1.09,
    },
    {
      type: "SERVICIOS",
      value: 1.04,
    },
  ];
  const topography: Array<any> = [
    {
      type: "PLANA",
      value: 1.0,
    },
    {
      type: "PENDIENTE LIGERA",
      value: typeFactor === "TERRENO" ? 0.97 : 0.98,
    },
    {
      type: "PENDIENTE INCLINADA",
      value: typeFactor === "TERRENO" ? 0.94 : 0.96,
    },
    {
      type: "PENDIENTE ACCIDENTADA",
      value: typeFactor === "TERRENO" ? 0.91 : 0.94,
    },
  ];
  const level: Array<any> = [
    {
      type: "SOTANO 1",
      value: 0.9,
    },
    {
      type: "SOTANO 2",
      value: 0.95,
    },
    {
      type: "P.B. NIVEL DE CALLE",
      value: 1.0,
    },
    {
      type: "P.A. NIVEL DE CALLE",
      value: 1.0,
    },
  ];
  const quality: Array<any> = [
    {
      type: "PRECARIA",
      value: 0.91,
    },
    {
      type: "BAJA",
      value: 0.94,
    },
    {
      type: "ECONOMICA",
      value: 0.97,
    },
    {
      type: "COMERCIAL",
      value: 1.0,
    },
    {
      type: "MEDIA COMÚN",
      value: 1.03,
    },
    {
      type: "MEDIA ALTA",
      value: 1.06,
    },
    {
      type: "ALTA",
      value: 1.09,
    },
    {
      type: "LUJO",
      value: 1.12,
    },
  ];
  const project: Array<any> = [
    {
      type: "EXCELENTE",
      value: 1.06,
    },
    {
      type: "MUY BUENO",
      value: 1.03,
    },
    {
      type: "FUNCIONAL",
      value: 1.0,
    },
    {
      type: "ADECUADO",
      value: 0.98,
    },
    {
      type: "REGULAR",
      value: 0.96,
    },
    {
      type: "INADECUADO",
      value: 0.94,
    },
    {
      type: "DEFICIENTE",
      value: 0.92,
    },
    {
      type: "OBSOLETO",
      value: 0.9,
    },
    {
      type: "INEXISTENTE",
      value: 0.88,
    },
  ];
  const building: Array<any> = [
    {
      type: "RESIDENCIAL PLUS",
      value: 1.08,
    },
    {
      type: "RESIDENCIAL",
      value: 1.06,
    },
    {
      type: "SEMILUJO",
      value: 1.04,
    },
    {
      type: "MEDIA",
      value: 1.02,
    },
    {
      type: "MEDIA COMÚN",
      value: 1.0,
    },
    {
      type: "INTERÉS SOCIAL ALTA",
      value: 0.98,
    },
    {
      type: "INTERÉS SOCIAL MEDIA",
      value: 0.96,
    },
    {
      type: "INTERÉS SOCIAL BAJA",
      value: 0.94,
    },
    {
      type: "ECONÓMICA ALTA",
      value: 0.92,
    },
    {
      type: "ECONÓMICA BAJA",
      value: 0.9,
    },
    {
      type: "MÍNIMA",
      value: 0.88,
    },
  ];
  const symbols: Array<any> = [
    {
      type: "+",
      value: 1,
    },
    {
      type: "=",
      value: 0,
    },
    {
      type: "-",
      value: -1,
    },
  ];
  const factors = {
    classification: periphery,
    type_form,
    usage,
    topography,
    level,
    quality,
    project,
    building,
    symbols,
  };
  const template = {
    id: 0,
    classification: {
      subject: periphery[0],
      current: periphery[0],
    },
    type_form: {
      subject: type_form[0],
      current: type_form[0],
    },
    usage: {
      subject: usage[0],
      current: usage[0],
    },
    topography: {
      subject: topography[0],
      current: topography[0],
    },
    level: {
      subject: level[0],
      current: level[0],
    },
    quality: {
      subject: quality[0],
      current: quality[0],
    },
    project: {
      subject: project[0],
      current: project[0],
    },
    building: {
      subject: project[0],
      current: project[0],
    },
    location: 1,
    zone: 1,
  };
  const [data, setData] = useState([template]);
  const toFancyNumber: Function = (
    number: number,
    isCurrency = false,
    isPercentage = false
  ) =>
    new Intl.NumberFormat("es-MX", {
      style: isCurrency ? "currency" : isPercentage ? "percent" : "decimal",
      minimumFractionDigits: 2,
      currency: isCurrency ? "MXN" : undefined,
    }).format(isPercentage && !isCurrency ? number / 100 : number);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const roundToDecena: Function = (number: number, digits = 2) =>
    (Math.round(number / 10) * 10).toFixed(0);
  return (
    <div className="container container-fluid">
      <Factors
        type_factor={typeFactor}
        factors={factors}
        data={data}
        template={template}
        setData={setData}
        toFancyNumber={toFancyNumber}
      />
    </div>
  );
}
