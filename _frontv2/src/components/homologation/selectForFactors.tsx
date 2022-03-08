import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  selectHomologation,
  setElements,
} from "../../features/homologations/homologationsSlice";
export default function SelectorForFactors() {
  const dispatch = useAppDispatch();
  const { elements } = useAppSelector(selectHomologation);
  return (
    <Fragment>
      <h1 className="text-center">
        Elimine los factores que sean innecesarios
      </h1>
      <h6 className="text-center text-muted">
        Ubicación y Zona estan por defecto
      </h6>
      <div className="row ">
        <div className="col-12 text-center">
          <ul className="list-group">
            {elements.map((object: any, index: number) => (
              <li
                key={index}
                className="
                className="list-group-item d-flex justify-content-between align-items-center
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{object.name}</div>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    dispatch(
                      setElements(
                        elements.filter((_: any, i: number) => i !== index)
                      )
                    );
                  }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
