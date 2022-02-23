import { FC, useState, ChangeEventHandler } from "react";
import { Table } from "./table";
import { building } from "../../types/homologation/factors/building";
import { level } from "../../types/homologation/factors/level";
import { periphery } from "../../types/homologation/factors/periphery";
import { project } from "../../types/homologation/factors/project";
import { quality } from "../../types/homologation/factors/quality";
import { symbols } from "../../types/homologation/factors/symbols";
import { topography } from "../../types/homologation/factors/topography";
import { type_form } from "../../types/homologation/factors/typeForm";
import { usage } from "../../types/homologation/factors/usage";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { selectHomologation } from "../../features/homologations/homologationsSlice";

const handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (
  event
) => event.target.value;

export default function FactorsCompilation() {
  const dispatch = useAppDispatch();
  const { type, items } = useAppSelector(selectHomologation);

  const Building: FC = () => (
    <Table
      key="building"
      id={0}
      title="CONSTRUCCIÓN"
      name="building"
      collection={building}
    />
  );

  const Level: FC = () => (
    <Table key="level" id={1} title="NIVEL" name="level" collection={level} />
  );

  const Classification: FC = () => (
    <Table
      key="classification"
      id={2}
      title="CLASIFICACIÓN"
      name="classification"
      collection={periphery}
    />
  );
  const Project: FC = () => (
    <Table
      key="project"
      id={3}
      title="PROYECTO"
      name="project"
      collection={project}
    />
  );
  const Quality: FC = () => (
    <Table
      key="quality"
      id={4}
      title="CALIDAD"
      name="quality"
      collection={quality}
    />
  );
  const Topography: FC = () => (
    <Table
      key="topography"
      id={5}
      title="TOPOGRAFÍA"
      name="topography"
      collection={topography(type)}
    />
  );
  const TypeForm: FC = () => (
    <Table
      key="type_form"
      id={6}
      title="FORMA"
      name="type_form"
      collection={type_form(type)}
    />
  );
}