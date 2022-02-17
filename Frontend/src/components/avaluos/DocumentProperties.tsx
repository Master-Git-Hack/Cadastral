import { useState, Dispatch } from "react";
import ReactTooltip from "react-tooltip";
import axios from "axios";
export default function DocumentProperties(props: {
  properties: any;
  setProperties: Dispatch<
    React.SetStateAction<{
      limits: {
        min: number;
        max: number;
      };
      collection: string;
      year: string;
      zoom: number;
      watermark: boolean;
      recommended_properties: boolean;
      moreProperties: {
        page_size: string;
        dpi: number;
        margins: {
          top: number;
          bottom: number;
          left: number;
          right: number;
        };
      };
    }>
  >;
  setData: Dispatch<string>;
  filename: string;
}) {
  const { REACT_APP_API_URL } = process.env;
  const { properties, setProperties, setData, filename } = props;
  const { moreProperties } = properties;

  const [limits, setLimits] = useState(properties.limits || { min: 0, max: 0 });
  const [collection, setcollection] = useState("0000");
  const [year, setYear] = useState(properties.year);
  const [zoom, setZoom] = useState(properties.zoom * 100);
  const [watermark, setWatermark] = useState(properties.watermark);

  const [recommended_properties, setRecommended_properties] = useState(
    properties.recommended_properties
  );
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const [page_size, setPage_size] = useState(moreProperties.page_size);
  const [dpi, setDpi] = useState(moreProperties.dpi);
  const [margins, setMargins] = useState(moreProperties.margins);

  const handleLimits = (event: any) =>
    setLimits({ ...limits, [event.target.name]: event.target.value });

  const handlecollection = (event: any) => setcollection(event.target.value);
  const handleYear = (event: any) => setYear(event.target.value);
  const handleZoom = (event: any) => setZoom(event.target.value);

  const handleMoreOptions = () => setShowMoreOptions(!showMoreOptions);

  const handleWatermark = (event: any) => setWatermark(event.target.checked);
  const handleRecommended_properties = (event: any) => {
    if (!recommended_properties) {
      setZoom(105);
      setPage_size("A4");
      setDpi(300);
      setMargins({ top: 19, bottom: 0, left: 10, right: 10 });
    }
    setRecommended_properties(!recommended_properties);
  };
  const handlePageSize = (event: any) => setPage_size(event.target.value);
  const handleDpi = (event: any) => setDpi(Number(event.target.value));
  const handleMargins = (event: any) =>
    setMargins({ ...margins, [event.target.name]: event.target.value });

  const api_consume = async (payload: any) => await axios({
    method: "POST",
    url: `${REACT_APP_API_URL}/APPRAISAL/report/collection`,
    data: payload,
    responseType: "blob",
  }).then((response) => setData(URL.createObjectURL(response.data)) );
  const handleDownload = async () => {
    const payload = {
      limits,
      collection,
      year,
      zoom: zoom / 100,
      watermark,
      filename,
      moreProperties: {
        page_size,
        dpi,
        margins,
      },
    };
    setProperties({ ...payload, recommended_properties });
    await api_consume({
      ...payload,
    });
  };
  return (
    <table className="table table-sm table-responsive table-responsive-sm table-striped">
      <tbody className="row">
        <tr className="row">
          <td className="col-3">
            <div className="form-group">
              <label htmlFor="collection">
                <strong>Familia</strong>
              </label>
              <input
                name="collection"
                type="text"
                value={collection}
                className="form-control"
                onChange={handlecollection}
                data-tip
                data-for="collection-tooltip"
              />
              <ReactTooltip
                id="collection-tooltip"
                place="right"
                type="dark"
                effect="solid"
              >
                <span>
                  <strong>Familia</strong>
                  <br />
                  <small>
                    <em>{collection}_XXXX_XXXX</em>
                  </small>
                </span>
              </ReactTooltip>
            </div>
          </td>
          <td className="col-3">
            <div className="form-group">
              <label htmlFor="min">
                <strong>Inicio</strong>
              </label>
              <input
                name="min"
                type="number"
                value={limits.min}
                className="form-control"
                onChange={handleLimits}
                data-tip
                data-for="min-tooltip"
              />
              <ReactTooltip
                id="min-tooltip"
                place="right"
                type="dark"
                effect="solid"
              >
                <span>
                  <strong>Rango de Inicio</strong>
                  <br />
                  <small>
                    <em>XXXX_{limits.min}_XXXX</em>
                  </small>
                </span>
              </ReactTooltip>
            </div>
          </td>
          <td className="col-3">
            <div className="form-group">
              <label htmlFor="max">
                <strong>Termino</strong>
              </label>
              <input
                name="max"
                type="number"
                value={limits.max}
                className="form-control"
                onChange={handleLimits}
                data-tip
                data-for="max-tooltip"
              />
              <ReactTooltip
                id="max-tooltip"
                place="right"
                type="dark"
                effect="solid"
              >
                <span>
                  <strong>Rango de Termino</strong>
                  <br />
                  <small>
                    <em>XXXX_{limits.max}_XXXX</em>
                  </small>
                </span>
              </ReactTooltip>
            </div>
          </td>
          <td className="col-3">
            <div className="form-group">
              <label htmlFor="year">
                <strong>Año</strong>
              </label>
              <input
                name="year"
                type="number"
                value={year}
                className="form-control"
                onChange={handleYear}
                data-tip
                data-for="year-tooltip"
              />
              <ReactTooltip
                id="year-tooltip"
                place="right"
                type="dark"
                effect="solid"
              >
                <span>
                  <strong>Año a 2 digitos</strong>
                  <br />
                  <small>
                    <em>XXXX_XXXX_{year}</em>
                  </small>
                </span>
              </ReactTooltip>
            </div>
          </td>
        </tr>
        {/**htmle white space  */}
        <tr className="row">
          <td className="col-12">
            <div className="form-group">
              <label htmlFor="zoom">
                <strong>Zoom </strong>
                {`( ${zoom} )  `}
              </label>
              <input
                name="zoom"
                type="range"
                value={zoom}
                min={60}
                max={120}
                step={5}
                className="form-range"
                onChange={handleZoom}
                data-tip
                data-for="zoom-tooltip"
              />
              <ReactTooltip
                id="zoom-tooltip"
                place="right"
                type="dark"
                effect="solid"
              >
                <span>
                  <strong> Zoom</strong>
                  <br />
                  <small>
                    <em>{zoom}%</em>
                  </small>
                </span>
              </ReactTooltip>
            </div>
          </td>
        </tr>
        <tr className="row bg-light">
          <td className="col-12">
            <div className="form-check form-switch text-start">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                name="watermark"
                checked={watermark}
                onChange={handleWatermark}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Marca de Agua
              </label>
            </div>
            <div className="form-check form-switch text-start">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                name="recommended_properties"
                checked={recommended_properties}
                onChange={handleRecommended_properties}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Propiedades Recomendadas para el documento
              </label>
            </div>
          </td>
        </tr>
        <tr className="row bg-light">
          <td className="btn-group">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={handleMoreOptions}
            >
              <span>
                <strong>Mostrar más opciones</strong>
              </span>
            </button>
            <button className="btn btn-sm btn-info" onClick={handleDownload}>
              <span>
                <strong> Mostrar preview del documento</strong>
              </span>
            </button>
          </td>
        </tr>
        {showMoreOptions ? (
          <tr className="row">
            <td className="row text-center">
              <div className="col-6 form-group">
                <label htmlFor="font-size">
                  <strong>Tipo de hoja</strong>
                </label>
                <select
                  name="font-size"
                  onChange={handlePageSize}
                  className="form-select"
                  value={page_size}
                  data-tip
                  data-for="page-size-tooltip"
                >
                  <option value="A4">A4</option>
                  <option value="Letter">Carta</option>
                </select>
                <ReactTooltip
                  id="page-size-tooltip"
                  place="right"
                  type="dark"
                  effect="solid"
                >
                  <span>
                    <strong>Tipo de hoja para impresión</strong>
                    <br />
                    <small>
                      <em>{page_size}</em>
                    </small>
                  </span>
                </ReactTooltip>
              </div>
              <div className="col-6 form-group">
                <label htmlFor="dpi">
                  <strong>Resolución</strong>
                </label>
                <input
                  name="dpi"
                  type="number"
                  value={dpi}
                  className="form-control"
                  onChange={handleDpi}
                  min={100}
                  max={1200}
                  step={100}
                  data-tip
                  data-for="dpi-tooltip"
                />
                <ReactTooltip
                  id="dpi-tooltip"
                  place="right"
                  type="dark"
                  effect="solid"
                >
                  <span>
                    <strong>Resolución</strong>
                    <br />
                    <small>
                      <em>{dpi} dpi</em>
                    </small>
                  </span>
                </ReactTooltip>
              </div>
            </td>
            <td className="row text-center">
              <div className="row">
                <strong>Tamaño de los Margenes: </strong>
                <small>
                  <em> ( mm ) </em>
                </small>
              </div>
              <div className="row">
                <div className="col-6 form-group">
                  <label htmlFor="margin-top">
                    <strong>Superior</strong>
                  </label>
                  <input
                    name="top"
                    type="number"
                    value={margins.top}
                    className="form-control"
                    onChange={handleMargins}
                    min={0}
                    max={30}
                    step={1}
                    data-tip
                    data-for="margin-top-tooltip"
                  />
                  <ReactTooltip
                    id="margin-top-tooltip"
                    place="right"
                    type="dark"
                    effect="solid"
                  >
                    <span>
                      <strong>Superior</strong>
                      <br />
                      <small>
                        <em>{margins.top} mm</em>
                      </small>
                    </span>
                  </ReactTooltip>
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="margin-bottom">
                    <strong>Inferior</strong>
                  </label>
                  <input
                    name="bottom"
                    type="number"
                    value={margins.bottom}
                    className="form-control"
                    onChange={handleMargins}
                    min={0}
                    max={30}
                    step={1}
                    data-tip
                    data-for="margin-bottom-tooltip"
                  />
                  <ReactTooltip
                    id="margin-bottom-tooltip"
                    place="right"
                    type="dark"
                    effect="solid"
                  >
                    <span>
                      <strong>Inferior</strong>
                      <br />
                      <small>
                        <em>{margins.bottom} mm</em>
                      </small>
                    </span>
                  </ReactTooltip>
                </div>
              </div>
              <div className="row">
                <div className="col-6 form-group">
                  <label htmlFor="margin-left">
                    <strong>Izquierdo</strong>
                  </label>
                  <input
                    name="left"
                    type="number"
                    value={margins.left}
                    className="form-control"
                    onChange={handleMargins}
                    min={0}
                    max={30}
                    step={1}
                    data-tip
                    data-for="margin-left-tooltip"
                  />
                  <ReactTooltip
                    id="margin-left-tooltip"
                    place="right"
                    type="dark"
                    effect="solid"
                  >
                    <span>
                      <strong>Izquierdo</strong>
                      <br />
                      <small>
                        <em>{margins.left} mm</em>
                      </small>
                    </span>
                  </ReactTooltip>
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="margin-right">
                    <strong>Derecho</strong>
                  </label>
                  <input
                    name="right"
                    type="number"
                    value={margins.right}
                    className="form-control"
                    onChange={handleMargins}
                    min={0}
                    max={30}
                    step={1}
                    data-tip
                    data-for="margin-right-tooltip"
                  />
                  <ReactTooltip
                    id="margin-right-tooltip"
                    place="right"
                    type="dark"
                    effect="solid"
                  >
                    <span>
                      <strong>Derecho</strong>
                      <br />
                      <small>
                        <em>{margins.right} mm</em>
                      </small>
                    </span>
                  </ReactTooltip>
                </div>
              </div>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
