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
              subject={
                rows
                  .map((row: any, index: number) =>
                    row[name] && index === 0 ? row[name].subject : undefined
                  )
                  .filter((object) => object !== undefined)[0]
              }
              selector={collection}
              handleChange={(event: any) =>
                setData(
                  rows.map((row: any, index: number) =>
                    index === 0
                      ? {
                          ...row,
                          [name]: {
                            ...row[name],
                            subject: collection.find(
                              (object) =>
                                object.value === Number(event.target.value)
                            ),
                          },
                        }
                      : row
                  )
                )
              }
              styles="bg-warning"
            />
          </td>
          <td colSpan={1} rowSpan={1}>
            {toFancyNumber(
              rows
                .map((row: any, index: number) =>
                  row[name] && index === 0 ? row[name].subject : undefined
                )
                .filter((object) => object !== undefined)[0].value,
              false,
              false
            )}
          </td>
        </tr>
        {rows.map((row: any, index: number) => {
          return (
            <tr key={`${name}-row-${index}`}>
              <td colSpan={1} rowSpan={1}>
                C{index + 1}
              </td>
              <td colSpan={1} rowSpan={1}>
                <Selector
                  currentName={`${name}-${index}`}
                  subject={row[name].current}
                  selector={collection}
                  handleChange={(event: any) =>
                    setData(
                      rows.map((r: any, id: number) =>
                        index === id
                          ? {
                              ...r,
                              [name]: {
                                ...r[name],
                                current: collection.find(
                                  (object) =>
                                    object.value === Number(event.target.value)
                                ),
                              },
                            }
                          : r
                      )
                    )
                  }
                  styles="bg-light"
                />
              </td>
              <td colSpan={1} rowSpan={1}>
                {toFancyNumber(row[name].current.value, false, false)}
              </td>
              <td colSpan={1} rowSpan={1}>
                {toFancyNumber(
                  (row[name].subject.value / row[name].current.value).toFixed(2)
                    ? (
                        row[name].subject.value / row[name].current.value
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
