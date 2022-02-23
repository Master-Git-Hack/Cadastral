import { useState, MouseEventHandler } from "react";

import ReactTooltip from "react-tooltip";
import DocumentProperties from "./DocumentProperties";
import Viewer from "../pdf/Viewer";

export default function Avaluos(props: any) {
  const [properties, setProperties] = useState<Object>({
    limits: {
      min: 0 as number,
      max: 0 as number,
    } as Object,
    collection: 0 as number,
    year: new Date().getFullYear().toString().split("20")[1] as string,
    zoom: 1 as number,
    watermark: false as boolean,
    recommended_properties: false as boolean,
    moreProperties: {
      page_size: "A4" as string,
      dpi: 100 as number,
      margins: {
        top: 0 as number,
        bottom: 0 as number,
        left: 0 as number,
        right: 0 as number,
      } as Object,
    } as Object,
  } as Object);

  const [data, setData] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const handleShow: MouseEventHandler<HTMLButtonElement> = (): void =>
    setShow(!show);
  return (
    <table className="table table-sm table-responsive table-responsive-sm">
      <thead className="table-light align-self-middle align-middle text-center">
        <tr className="row">
          <th className="col-6 text-start" scope="col">
            <h4 className="text-light ">
              <span className="badge rounded-pill bg-primary">
                ID:
                <strong>{props.key_id}</strong>
              </span>
            </h4>
          </th>
          <th className="col-6 text-end" scope="col">
            <button
              className="btn btn-sm btn-outline-info"
              onClick={handleShow}
              data-tip
              data-for="hide-tooltip"
            >
              {show ? "Ocultar " : "Mostrar "}
            </button>
            <ReactTooltip
              id="hide-tooltip"
              place="top"
              type="dark"
              effect="solid"
            >
              <span>Ocultar/Mostrar</span>
            </ReactTooltip>
          </th>
        </tr>
      </thead>
      <tbody className="align-self-middle align-middle text-center">
        {show ? (
          <tr className="row">
            <td className={`col-${data !== "" ? "6" : "12"}`}>
              <DocumentProperties
                properties={properties}
                key={props.key_id ** 3}
                setProperties={setProperties}
                setData={setData}
                filename={props.files[props.key_id - 1]}
              />
            </td>
            {data !== "" ? (
              <td className={`col-${data !== "" ? "6" : ""}`}>
                <Viewer data={data} key={props.key_id ** 2} />
              </td>
            ) : null}
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
