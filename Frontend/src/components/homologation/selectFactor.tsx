import {FC} from 'react';
export const SelectFactor:FC<{
    factors:any,
    setFactorsUsed:Function
}> =(props:any)=>(<div className="m-5 py-1">
    <h2 className="text-center">Favor de seleccionar, aquellos factores que no sean requeridos dentro de la homologación</h2>
    <div
        className="row text-center"
    >
        <div
            className="col-12 col-sm-12"
        >
            <ul className="list-group">
                {
                    Object.keys(props.factors).map((key: string,index:number)=>{
                        if(props.factors[key].isUsed){
                            return (<li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{props.factors[key].name}</div>
                                    </div>
                                    <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={()=>props.setFactorsUsed(key)}
                                    >
                                    Eliminar
                                    </button>
                            </li>)
                        }
                    })
                }
            </ul>
        </div>
    </div>
</div>)