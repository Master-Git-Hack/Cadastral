import Selector from "../inputs/Selector";

export default function Table(props: {
  title: string;
  name: string;
  collection: Array<any>;
  rows: Array<any>;
  toFancyNumber: Function;
  setData: Function;
}) {
  const { title, name, collection, rows, setData, toFancyNumber } = props;
  const updateData= (currentName:string,value:any,id:number)=>{
    value = collection.find((object)=>object.value===value);
    setData([...rows.slice(0,id),{...rows[id],[currentName]:{...rows[id][currentName],current:value}},...rows.slice(id+1)])
}
  return (
    <table className="table table-sm table-responsive table-responsive-sm table-bordered table-stripped">
      <tbody className="align-self-middle align-middle text-center">
        <tr>
          <td colSpan={6}>FACTOR POR {title}</td>
        </tr>
        <tr>
          <td colSpan={1} rowSpan={1}>
            #
          </td>
          <td colSpan={1} rowSpan={1}>
            Tipo
          </td>
          <td colSpan={1} rowSpan={1}>
            Calificación
          </td>
          <td colSpan={1} rowSpan={2}>
            Factores
          </td>
        </tr>
        <tr>
          <td colSpan={1} rowSpan={1}>
            SUJETO
          </td>
          <td colSpan={1} rowSpan={1}>
            <Selector
              currentName="subject"
              subject={rows[0][name].subject}
              selector={collection}
              handleChange={(event: any) =>
                setData([{...rows[0],
                  [name]:{...rows[0][name],
                    subject:collection.find((object:any)=>object.value===Number(event.target.value))
                  }},
                  ...rows.slice(1)])
              }
              styles="bg-warning"
            />
          </td>
          <td colSpan={1} rowSpan={1}>
            {toFancyNumber(
              rows[0][name].subject.value,
              false,
              false
            )}
          </td>
        </tr>
        {rows.map((row:any)=>row[name]).map((row: any, index: number) => {
          return (
            <tr key={`${name}-row-${index}`}>
              <td colSpan={1} rowSpan={1}>
                C{index + 1}
              </td>
              <td colSpan={1} rowSpan={1}>
                <Selector
                  currentName={name}
                  subject={row.current}
                  selector={collection}
                  handleChange={(event: any) =>
                    updateData(event.target.name,Number(event.target.value),index)
                  }
                  styles="bg-light"
                />
              </td>
              <td colSpan={1} rowSpan={1}>
                {toFancyNumber(row.current.value, false, false)}
              </td>
              <td colSpan={1} rowSpan={1}>
                {toFancyNumber(
                  (row.subject.value / row.current.value)
                    ? (
                        row.subject.value / row.current.value
                      ).toFixed(2)
                    : 0,
                  false,
                  false
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
