import { useState } from "react";
import Avaluos from "../components/avaluos/Avaluos";
import axios from "axios";
import FileSaver from "file-saver";
export default function Catastral() {
  const { REACT_APP_API_URL } = process.env;
  const [pages, setPages] = useState<number>(1);
  const [files, setFiles] = useState<Array<string>>([`report_${new Date().toISOString()}_temp.pdf`]);

  const addPages = () => {
    setPages(pages + 1);
    setFiles([...files, `report_${new Date().toISOString()}_temp.pdf`]);
  }
  const removePages = () => {
    setPages(pages - 1);
    setFiles(files.filter((file, index) => index !== files.length - 1));
  }
  const renderPages = Array.from(
    { length: pages as number },
    (_: any, i: number) => i + 1
  );
  const handleFiles = async () => {
    await axios({
      method: "POST",
      url: `${REACT_APP_API_URL}/APPRAISAL/report/merge`,
      data: {files},
      responseType: "blob",
    }).then((response:any) => FileSaver.saveAs(response.data, `report_${new Date().toISOString()}.pdf`)).then(() => setTimeout(window.location.reload, 5000));
    
  }
  return (
    <div className="container container-fluid mt-5">
      <table className="table table-sm table-responsive table-responsive-sm">
        <thead className="table-light align-self-middle align-middle">
          <tr className="row">
            <th scope="col" className="col text-end">
              <button className="btn btn-sm btn-primary " onClick={addPages}>
                Agregar página
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="align-self-middle align-middle">
          {renderPages.map((key_id: number) => (
            <tr className="row p-1">
              <td className="col-12 text-start">
                <Avaluos
                  key={key_id}
                  key_id={key_id}
                  files={files}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="align-self-middle align-middle">
          {renderPages.length > 1 ? (
            <tr className="row">
              <td className="col-6 text-start">
                <button
                  className="btn btn-sm btn-success"
                  onClick={handleFiles}
                >
                  Descargar documentos
                </button>
              </td>
              <td className="col-6 text-end">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={removePages}
                >
                  Eliminar página
                </button>
              </td>
            </tr>
          ) : null}
        </tfoot>
      </table>
    </div>
  );
}
