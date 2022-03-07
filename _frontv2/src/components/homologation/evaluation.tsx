import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import {
  selectHomologation,
  setResults,
  sendPatchRequest,
} from "../../features/homologations/homologationsSlice";
import { Table } from "./evaluation/table";
import { handleVisibility } from "../../utils/utils";
export default function Evaluation(props: any) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setResults());
  }, []);

  const {
    id,
    results,
    elements,
    type,
    areaSubject,
    averageLotArea,
    averageUnitValue,
  } = useAppSelector(selectHomologation);
  const classification = handleVisibility(elements, "classification");
  const typeForm = handleVisibility(elements, "typeForm");
  const usage = handleVisibility(elements, "usage");
  const topography = handleVisibility(elements, "topography");
  const level = handleVisibility(elements, "level");
  const project = handleVisibility(elements, "project");
  const quality = handleVisibility(elements, "quality");
  const building = handleVisibility(elements, "building");
  const headerForFactors = [
    "FSup.",
    "FUbic.",
    "FZo.",
    type !== "TERRENO" && "FEd.",
    classification && "FClas.",
    typeForm && "FFo.",
    usage && "Fuso",
    topography && "FTop.",
    level && "FNiv.",
    project && "FProy.",
    quality && "FCal.",
    building && "FCons.",
    "FCom.",
  ];
  console.log(results);
  const handleRequest =()=>{
    const message = window.confirm(
      "En caso de algún cambio, tendra que realizar el proceso nuevamente, favor de verificar que su información sea correcta.")
    if (message === true) {
      const payload = {id,value:averageUnitValue,type};
      const response = dispatch(sendPatchRequest(payload));
      if(response !== null){
        console.log("response");
        //window.opener = null;
        //window.open("about:blank", "_self", "");
        //window.close();
      }
    }
  }
  return (
    <div className="row">
      <h6 className="text-center text-muted fw-lighter">
            F.Re, muestra el valor calculado con los datos actuales, favor de
            ingresar los datos faltantes para que se realice el calculo.
      </h6>
      <div className="row">
        <div className="col-12">
        <Table
          title={type}
          headerForFactors={headerForFactors.filter((key: string) => key)}
          items={results}
          averageLotArea={averageLotArea}
          areaSubject={areaSubject}
          averageUnitValue={averageUnitValue}
        />
        </div>
      </div>
      <h6 className="text-center text-muted fw-lighter">
            En caso de ser necesario primero defina los sujetos de comparación.
      </h6>
      <div className="row">
        <div className="text-end">
          <button 
            className="btn btn-sm btn-success"
            onClick={handleRequest}
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}
