import { Fragment, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import {
  add,
  remove,
  set,
  select,
  get,
  selectHomologation,
} from "../features/homologations/homologationsSlice";
import { Factors } from "../types/homologation/factors/factors";
export function Homologations() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectHomologation);
  const [factor, setFactors] = useState<Factors>({
    id: items.length,
    classification: {
      subject: {
        type: "URBANO",
        value: 1.1,
      },
      current: {
        type: "URBANO",
        value: 1.1,
      },
    },
    typeForm: {
      subject: {
        type: "REGULAR",
        value: 1,
      },
      current: {
        type: "REGULAR",
        value: 1,
      },
    },
    usage: {
      subject: {
        type: "MIXTO I-C",
        value: 1.09,
      },
      current: {
        type: "MIXTO I-C",
        value: 1.09,
      },
    },
    topography: {
      subject: {
        type: "PLANA",
        value: 1,
      },
      current: {
        type: "PLANA",
        value: 1,
      },
    },
    level: {
      subject: {
        type: "P.B. NIVEL DE CALLE",
        value: 1,
      },
      current: {
        type: "P.B. NIVEL DE CALLE",
        value: 1,
      },
    },
    quality: {
      subject: {
        type: "LUJO",
        value: 1.12,
      },
      current: {
        type: "LUJO",
        value: 1.12,
      },
    },
    project: {
      subject: {
        type: "EXCELENTE",
        value: 1.06,
      },
      current: {
        type: "EXCELENTE",
        value: 1.06,
      },
    },
    building: {
      subject: {
        type: "RESIDENCIAL PLUS",
        value: 1.08,
      },
      current: {
        type: "RESIDENCIAL PLUS",
        value: 1.08,
      },
    },
    location: {
      id: 1,
      name: "location",
      columns: [
        {
          name: "C1",
          value: {
            type: "+",
            value: 1,
          },
        },
      ],
      percentage: 0,
      addNextRow: true,
    },
    zone: {
      id: 1,
      name: "zone",
      columns: [
        {
          name: "C1",
          value: {
            type: "+",
            value: 1,
          },
        },
      ],
      percentage: 0,
      addNextRow: true,
    },
  });
  return (
    <Fragment>
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => dispatch(add(factor))}
      >
        Add
      </button>
      {items.map((factor: Factors, index: number) => (
        <div key={index}>{factor.id}</div>
      ))}
    </Fragment>
  );
}
