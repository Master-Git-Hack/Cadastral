import { FC, useState, Fragment } from "react";
import {FactorsCompilation, Location} from "../components/homologation/factors";
import Evaluation from "../components/homologation/evaluation";
import SelectorForFactors from "../components/homologation/selectForFactors";
const Homologations: FC = () => {
  const [options,setOptions]=useState([
    {
        name: "Construcción",
        type: "building",
        value:0,
    },
    {
        name: "Nivel",
        type: "level",
        value:1,
    },
    {
        name: "Proyecto",
        type: "project",
        value:2,
    },
    {
        name: "Calidad",
        type: "quality",
        value:3,
    },
    {
        name: "Topografia",
        type: "topography",
        value:4,
    },
    {
        name: "Forma",
        type: "typeForm",
        value:5,
    },
    {
        name: "Uso",
        type: "usage",
        value:6,
    },
])
  const [showOptions,setShowOptions]=useState(true);
  const [showFactors,setShowFactors]=useState(false);
  const [showLocation,setShowLocation]=useState(false);
  const [showEvaluation,setShowEvaluation]=useState(false);
  const Options:FC=()=>(
      <Fragment>
        {
        showOptions ?
          <div className="row px-5">
            <SelectorForFactors options={options} setOptions={setOptions}/>
            <div className="text-end mt-5">
              <button
                className="btn btn-sm btn-primary"
                onClick={()=>{
                  setShowOptions(false);
                  setShowFactors(true);
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        :null
      }
      </Fragment>
      
    )
  const Factors:FC=()=>(
    <Fragment>
      {
        showFactors ?

          <div className="row"> 
            <FactorsCompilation 
              key="factors-compilation-view"
              options={options}
            />
            <div className="text-end">
              <button
                className="btn btn-sm btn-primary"
                onClick={()=>{
                  setShowFactors(false);
                  setShowLocation(true);
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        :null
      }
    </Fragment>
  )
  const Loc:FC=()=>(
    <Fragment>
      {
        showLocation ?
          <div className="row mt-5">
            <Location key="location-view"/>
            <div className="text-end">
              <button
                className="btn btn-sm btn-primary"
                onClick={()=>{
                  setShowLocation(false);
                  setShowEvaluation(true);
                }}
              >
                Continuar
              </button>
            </div>
          </div>  
          :null
      }
    </Fragment>
  )
  const Eval:FC=()=>(
    <Fragment>
      {
        showEvaluation ?
          <div className="row mt-5">
            <Evaluation options={options} key="evaluation-view"/>
            <div className="text-end">
              <button
                className="btn btn-sm btn-success"
                  onClick={() => {
                    if (window.confirm("En caso de algún cambio, tendra que realizar el proceso nuevamente, favor de verificar que su información sea correcta")) window.opener = null;
                    window.open("about:blank", "_self", "");
                    window.close();
                  }}
              >
                Finalizar
              </button>
            </div>
          </div>
          :null
      }
    </Fragment>
  )
  return(
  <div className="container m-auto">
    <Options/>
    <Factors />
    <Loc/>
    <Eval />
    
  </div>
);
}
export default Homologations;
