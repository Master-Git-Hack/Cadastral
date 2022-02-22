import {Factors} from '../../types/homologation/factors/factors';
export function fetchFactors(current = {
    id:0,
    classification:{
        type: "URBANO",
        value: 1.1,
    },
    typeForm:{
        type: "REGULAR",
        value: 1,
    },
    usage:{
        type: "MIXTO I-C",
        value: 1.09,
    },
    topography:{
        type: "PLANA",
        value: 1,
    },
    level:{
        type: "P.B. NIVEL DE CALLE",
        value: 1,
    },
    quality:{
        type: "LUJO",
        value: 1.12,
    },
    project:{
        type: "EXCELENTE",
        value: 1.06,
    },
    building:{
        type: "RESIDENCIAL PLUS",
        value: 1.08,
    },
    location:{
        id:0,
        name:"location",
        columns:[{
            name:"C1",
            value:{
                type: "+",
                value: 1
            },
        }],
        percentage:0,
        addNextRow: true,
    },
    zone:{
        id:0,
        name:"zone",
        columns:[{
            name:"C1",
            value:{
                type: "+",
                value: 1
            },
        }],
        percentage:0,
        addNextRow: true,
    }

} as Factors) {
    return new Promise<{ row: Factors }>((resolve) =>
      setTimeout(() => resolve({ row: current }), 500)
    );
  }