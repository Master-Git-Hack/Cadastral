import { FC } from "react";
import { Table } from "./table";
import { LocationZoneComponent } from "./locationZone";
import { building } from "../../types/homologation/factors/building";
import { level } from "../../types/homologation/factors/level";
import { periphery } from "../../types/homologation/factors/periphery";
import { project } from "../../types/homologation/factors/project";
import { quality } from "../../types/homologation/factors/quality";
import { topography } from "../../types/homologation/factors/topography";
import { type_form } from "../../types/homologation/factors/typeForm";
import { usage } from "../../types/homologation/factors/usage";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import {
  selectHomologation,
  addNextRow,
  removeLastRow,
} from "../../features/homologations/homologationsSlice";
import { handleVisibility } from "../../utils/utils";
export const Building: FC = () => (
  <td
    id="col-building"
    key="col-building"
    className="col"
    colSpan={6}
    rowSpan={1}
  >
    <Table
      key="building"
      id={0}
      title="CONSTRUCCIÓN"
      name="building"
      collection={building}
    />
  </td>
);

export const Level: FC = () => (
  <td id="col-level" key="col-level" className="col" colSpan={6} rowSpan={1}>
    <Table key="level" id={1} title="NIVEL" name="level" collection={level} />
  </td>
);

export const Classification: FC = () => (
  <td
    id="col-classification"
    key="col-classification"
    className="col"
    colSpan={6}
    rowSpan={1}
  >
    <Table
      key="classification"
      id={2}
      title="CLASIFICACIÓN"
      name="classification"
      collection={periphery}
    />
  </td>
);
export const Project: FC = () => (
  <td
    id="col-project"
    key="col-project"
    className="col"
    colSpan={6}
    rowSpan={1}
  >
    <Table
      key="project"
      id={3}
      title="PROYECTO"
      name="project"
      collection={project}
    />
  </td>
);
export const Quality: FC = () => (
  <td
    id="col-quality"
    key="col-quality"
    className="col"
    colSpan={6}
    rowSpan={1}
  >
    <Table
      key="quality"
      id={4}
      title="CALIDAD"
      name="quality"
      collection={quality}
    />
  </td>
);
export const Topography: FC<{ type: string }> = (props) => (
  <td
    id="col-topography"
    key="col-topography"
    className="col"
    colSpan={6}
    rowSpan={1}
  >
    <Table
      key="topography"
      id={5}
      title="TOPOGRAFÍA"
      name="topography"
      collection={topography(props.type)}
    />
  </td>
);
export const TypeForm: FC<{ type: string }> = (props) => (
  <td
    id="col-type-form"
    key="col-type-form"
    className="col"
    colSpan={6}
    rowSpan={1}
  >
    <Table
      key="type_form"
      id={6}
      title="FORMA"
      name="typeForm"
      collection={type_form(props.type)}
    />
  </td>
);
export const Usage: FC = () => (
  <td id="col-usage" key="col-usage" className="col" colSpan={6} rowSpan={1}>
    <Table key="usage" id={7} title="USO" name="usage" collection={usage} />
  </td>
);

export const Zone: FC = () => (
  <td
    id="col-location-zone"
    key="col-location-zone"
    className="col"
    colSpan={6}
    rowSpan={1}
  >
    <LocationZoneComponent
      key="location-zone"
      id={8}
      title="UBICACIÓN"
      type="location"
    />
  </td>
);
export const Location: FC = () => (
  <td
    id="col-location-zone"
    key="col-location-zone"
    className="col"
    colSpan={6}
    rowSpan={1}
  >
    <LocationZoneComponent
      key="location-zone"
      id={9}
      title="UBICACIÓN"
      type="location"
    />
  </td>
);
export function FactorsCompilation() {
  const typeLocationZone = "location";
  const dispatch = useAppDispatch();
  const { type, items, elements } = useAppSelector(selectHomologation);
  const AddRow: FC = () => (
    <td
      key="factor-btn-add"
      id="10"
      className="col text-start"
      colSpan={12}
      rowSpan={1}
    >
      <button
        id="btn-add"
        name="btn-add"
        className="btn btn-sm btn-success text-center"
        onClick={() =>
          dispatch(
            addNextRow({
              itemName: typeLocationZone,
            })
          )
        }
      >
        Agregar nueva fila
      </button>
    </td>
  );

  const RemoveRow: FC = () => (
    <td
      key="factor-btn-remove"
      id="11"
      className="col text-end"
      colSpan={12}
      rowSpan={1}
    >
      <button
        id="btn-remove"
        name="btn-remove"
        className="btn btn-sm btn-outline-danger text-center"
        onClick={() =>
          dispatch(
            removeLastRow({
              itemName: typeLocationZone,
            })
          )
        }
      >
        Eliminar fila
      </button>
    </td>
  );
  const Actions: FC<{ style: string }> = (props) => (
    <tr id="12" key="actions" className={`row ${props.style}`}>
      <AddRow />
      <RemoveRow />
    </tr>
  );
  const classification = handleVisibility(elements, "classification");
  const typeForm = handleVisibility(elements, "typeForm");
  const usage = handleVisibility(elements, "usage");
  const topography = handleVisibility(elements, "topography");
  const level = handleVisibility(elements, "level");
  const project = handleVisibility(elements, "project");
  const quality = handleVisibility(elements, "quality");
  const building = handleVisibility(elements, "building");

  return (
    <table
      id="factors-table-compilation"
      key="factors-table-compilation"
      className="table table-sm table-responsive table-responsive-sm table-stripped"
    >
      <thead
        id="factors-table-compilation-head"
        key="factors-table-compilation-head"
      >
        <Actions key="superior-actions" style="my-1" />
      </thead>
      <tbody
        id="factors-table-compilation-body"
        key="factors-table-compilation-body"
        className="align-self-center align-middle text-center"
      >
        <tr
          id="factor-table-compilation-row-1"
          key="factor-table-compilation-row-1"
          className="row"
        >
          {classification && <Classification />}
          {typeForm && <TypeForm type={type} />}
        </tr>
        <tr
          id="factor-table-compilation-row-2"
          key="factor-table-compilation-row-2"
          className="row"
        >
          {usage && <Usage />}
          {topography && <Topography type={type} />}
        </tr>
        <tr
          id="factor-table-compilation-row-3"
          key="factor-table-compilation-row-3"
          className="row"
        >
          {level && <Level />}
          {quality && <Quality />}
        </tr>
        <tr
          id="factor-table-compilation-row-4"
          key="factor-table-compilation-row-4"
          className="row"
        >
          {project && <Project />}
          {building && <Building />}
        </tr>
      </tbody>
    </table>
  );
}
