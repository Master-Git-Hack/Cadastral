import { FC, useState, Fragment } from "react";
import {
  FactorsCompilation,
  Location,
} from "../components/homologation/factors";
import Evaluation from "../components/homologation/evaluation";
import SelectorForFactors from "../components/homologation/selectForFactors";
const Homologations: FC = () => {
  const [showOptions, setShowOptions] = useState(true);
  const [showFactors, setShowFactors] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const Options: FC = () => (
    <Fragment>
      {showOptions ? (
        <div className="row card px-5 mt-5 p-4">
          <SelectorForFactors />
          <div className="row">
            <div className="text-end mt-5">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  setShowOptions(false);
                  setShowFactors(true);
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
  const Factors: FC = () => (
    <Fragment>
      {showFactors ? (
        <div className="row card px-5 mt-5 p-4">
          <FactorsCompilation key="factors-compilation-view" />
          <div className="row">
            <div className="col-6 text-start">
              <button
                className="btn btn-sm btn-link text-dark"
                onClick={() => {
                  setShowOptions(true);
                  setShowFactors(false);
                }}
              >
                Atras
              </button>
            </div>
            <div className="col-6 text-end">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  setShowFactors(false);
                  setShowLocation(true);
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
  const Loc: FC = () => (
    <Fragment>
      {showLocation ? (
        <div className="row card px-5 mt-5 p-4">
          <table>
            <tbody>
              <tr>
                <Location key="location-view" />
              </tr>
            </tbody>
          </table>
          <div className="row">
            <div className="col-6 text-start">
              <button
                className="btn btn-sm btn-link text-dark"
                onClick={() => {
                  setShowFactors(true);
                  setShowLocation(false);
                }}
              >
                Atras
              </button>
            </div>
            <div className="col-6 text-end">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  setShowLocation(false);
                  setShowEvaluation(true);
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
  const Eval: FC = () => (
    <Fragment>
      {showEvaluation ? (
        <div className="row mt-5">
          <h6 className="text-center text-muted fw-lighter">
            F.Re, muestra el valor calculado con los datos actuales, favor de
            ingresar los datos faltantes para que se realice el calculo.
          </h6>
          <Evaluation key="evaluation-view" />
          <h6 className="text-center text-muted fw-lighter">
            En caso de ser necesario primero defina los sujetos de comparación.
          </h6>
          <div className="row">
            <div className="col-6 text-start">
              <button
                className="btn btn-sm btn-link text-dark"
                onClick={() => {
                  setShowLocation(true);
                  setShowEvaluation(false);
                }}
              >
                Atras
              </button>
            </div>
            <div className="col-6 text-end">
              <button
                className="btn btn-sm btn-success"
                onClick={() => {
                  if (
                    window.confirm(
                      "En caso de algún cambio, tendra que realizar el proceso nuevamente, favor de verificar que su información sea correcta"
                    )
                  )
                    window.opener = null;
                  window.open("about:blank", "_self", "");
                  window.close();
                }}
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
  return (
    <div className="container m-auto mt-5 p-4">
      <Options />
      <Factors />
      <Loc />
      <Eval />
    </div>
  );
};
export default Homologations;
