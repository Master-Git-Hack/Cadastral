import Factors from "../components/factors/Interface";

export default function Homologaciones(props: any) {
  const typeFactor = "TERRENO";
  const typeLocation = "location";
  return (
    <div className="container container-fluid">
      <table>
        <thead>
          <tr>
            <th className="text-end">
              <button className="btn btn-outline-primary">Continuar</button>
            </th>
          </tr>
        </thead>
        <tbody>
        <Factors
          key="table-of-factors"
          typeFactor={typeFactor}
          typeLocation={typeLocation}
        />
        </tbody>
        <tfoot>
          <tr>
            <td className="text-end">
              <button className="btn btn-outline-primary">Continuar</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
