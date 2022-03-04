import { FC } from "react";
import { toFancyNumber, roundToTenth } from "../../../utils/utils";
import { Row } from "./row";
import { useAppDispatch } from "../../../hooks/hooks";
import {
  updateResults,
  setAreaSubject,
} from "../../../features/homologations/homologationsSlice";
import { FancyInput } from "../../inputs/fancyInput";
const HeadersBegin: FC = (props: any) => (
  <tr className="align-self-middle align-middle text-center">
    <th colSpan={1} rowSpan={2}>
      Oferta
    </th>
    <th colSpan={3} rowSpan={2}>
      Precio de {props.title === "TERRENO" ? "Venta" : "Renta"}
    </th>
    <th colSpan={2} rowSpan={2}>
      {props.title === "TERRENO" ? "Área" : "Sup. Const."} (m<sup>2</sup>)
    </th>
    <th colSpan={3} rowSpan={2}>
      Precio Unitario ($/m<sup>2</sup>)
    </th>
    <th
      colSpan={props.headerForFactors.length}
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
      <br />
      <span
        className={`badge rounded-pill bg-${
          calculate(props.items, "weightingPercentage") === 100
            ? "success"
            : calculate(props.items, "weightingPercentage") > 100
            ? "danger"
            : "warning"
        }`}
      >
        {calculate(props.items, "weightingPercentage")}
      </span>
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
      {props.title === "TERRENO" ? (
        <>
          <td className="text-end" colSpan={4} rowSpan={2}>
            Área de lote moda
          </td>
          <td className="text-center" colSpan={1} rowSpan={2}>
            {toFancyNumber(props.averageLotArea, false, false, 2)}
          </td>
          <td
            colSpan={props.headerForFactors.length - 1}
            rowSpan={2}
            className="text-start"
          >
            m<sup>2</sup>
          </td>
        </>
      ) : (
        <>
          <td className="text-end" colSpan={4} rowSpan={2}>
            Sujeto
          </td>
          <td className="text-center" colSpan={1} rowSpan={2}>
            <FancyInput
              index={props.index}
              name="areaSubject"
              value={props.areaSubject}
              isCurrency={false}
              isPercentage={false}
              onChange={(event) => props.onChange(Number(event.target.value))}
            />
          </td>
          <td colSpan={props.headerForFactors.length - 1} rowSpan={2} />
        </>
      )}

      <td colSpan={7} rowSpan={1} className="text-end">
        {props.title === "TERRENO"
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
          {toFancyNumber(
            roundToTenth(props.averageUnitValue, 1),
            true,
            false,
            2
          )}
        </strong>
      </td>
    </tr>
  </tfoot>
);
const calculate = (items: any, name: string) =>
  items.reduce(
    (previous: number, current: any) => previous + Number(current[name]),
    0
  );
export function Table(props: any) {
  const dispatch = useAppDispatch();
  const handleChanges = (properties: any) =>
    dispatch(updateResults(properties));
  const handleAreaSubject = (value: number) => dispatch(setAreaSubject(value));
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
            type={props.title}
            headerForFactors={props.headerForFactors}
            {...item}
            onChange={handleChanges}
          />
        ))}
      </tbody>
      <Footer {...props} onChange={handleAreaSubject} />
    </table>
  );
}
