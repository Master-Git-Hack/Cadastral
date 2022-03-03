import { FC, Fragment } from "react";
import { toFancyNumber, roundToTenth } from "../../../utils/utils";
import { useAppSelector } from "../../../hooks/hooks";
import { selectHomologation } from "../../../features/homologations/homologationsSlice";
import { Row } from "./row";
const HeadersBegin: FC = (props: any) => (
  <tr className="align-self-middle align-middle text-center">
    <th colSpan={1} rowSpan={2}>
      Oferta
    </th>
    <th colSpan={3} rowSpan={2}>
      Precio de{" "}
      {useAppSelector(selectHomologation).type === "TERRENO"
        ? "Venta"
        : "Renta"}
    </th>
    <th colSpan={2} rowSpan={2}>
      {useAppSelector(selectHomologation).type === "TERRENO"
        ? "Área"
        : "Sup. Const."}{" "}
      (m<sup>2</sup>)
    </th>
    <th colSpan={3} rowSpan={2}>
      Precio Unitario ($/m<sup>2</sup>)
    </th>
    {useAppSelector(selectHomologation).type !== "TERRENO"?
     <th colSpan={1} rowSpan={2}>
        Edad
      </th>
      : null
    }
    <th
      colSpan={
        props.headerForFactors.length
      }
      rowSpan={1}
      className="text-center"
    >
      Factores de {props.title}
    </th>
    <th colSpan={1} rowSpan={2}>
      F.Re.
    </th>
    <th colSpan={1} rowSpan={2}>
      Pond.
    </th>
    <th colSpan={6} rowSpan={2}>
      Valor Unitario Resultante ($/m<sup>2</sup>)
    </th>
  </tr>
);
const HeadersForFactors: FC = (props: any) => (
  <tr className="align-self-middle align-middle text-center">
    {props.headerForFactors.map((header: string, index: number) =>
      header ? (
        <th key={index} colSpan={1} rowSpan={1}>
          {header}
        </th>
      ) : null
    )}
  </tr>
);
const Footer: FC = (props: any) => (
  <tfoot>
    <tr>
      {useAppSelector(selectHomologation).type === "TERRENO" ? (
        <>
          <td className="text-end" colSpan={4} rowSpan={2}>
            Área de lote moda
          </td>
          <td className="text-center" colSpan={1} rowSpan={2}>
            {toFancyNumber(props.averageLotArea, false, false, 2)}
          </td>
          <td
            colSpan={props.headerForFactors.length-1}
            rowSpan={2}
            className="text-start"
          >
            m<sup>2</sup>
          </td>
        </>
      ) : (
        <td colSpan={props.headerForFactors.length + 4} rowSpan={2} />
      )}

      <td colSpan={7} rowSpan={1} className="text-end">
        {useAppSelector(selectHomologation).type === "TERRENO"
          ? "Valor Unitario Promedio"
          : "Valor Unitario Ponderado Homologado"}
      </td>
      <td className="text-center" colSpan={6} rowSpan={1}>
        {toFancyNumber(props.averageUnitValue, true, false, 2)}
      </td>
    </tr>
    <tr>
      <td className="text-end" colSpan={7} rowSpan={1}>
        Valor Unitario Aplicable en Numeros Rendondos
      </td>
      <td className="text-center" colSpan={6} rowSpan={1}>
        <strong>
          {toFancyNumber(roundToTenth(props.averageUnitValue), true, false, 2)}
        </strong>
      </td>
    </tr>
  </tfoot>
);
export function Table(props: any) {
  console.log(props.headerForFactors);
  return (
    <table className="table table-sm table-responsive table-responsive-sm table-striped table-bordered table-hover">
      <thead className="table-light align-self-middle align-middle text-center">
        <HeadersBegin {...props} />
        <HeadersForFactors {...props} />
      </thead>
      <tbody>
        {props.items.map((item: any, index: number) => (
          <Row
            key={index}
            index={index}
            headerForFactors={props.headerForFactors}
            {...item}
          />
        ))}
      </tbody>
      <Footer {...props} />
    </table>
  );
}
