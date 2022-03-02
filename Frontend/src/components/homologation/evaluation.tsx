import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import {
  selectHomologation,
  setResults,
} from "../../features/homologations/homologationsSlice";
import { Table } from "./evaluation/table";
export default function Evaluation(props: any) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setResults());
  }, []);

  const { results } = useAppSelector(selectHomologation);
  const classification = props.options.find(
    (object: any) => object.type === "classification"
  );
  const typeForm = props.options.find(
    (object: any) => object.type === "typeForm"
  );
  const usage = props.options.find((object: any) => object.type === "usage");
  const topography = props.options.find(
    (object: any) => object.type === "topography"
  );
  const level = props.options.find((object: any) => object.type === "level");
  const project = props.options.find(
    (object: any) => object.type === "project"
  );
  const quality = props.options.find(
    (object: any) => object.type === "quality"
  );
  const building = props.options.find(
    (object: any) => object.type === "building"
  );
  const headerForFactors = [
    "FSup.",
    "FUbic.",
    "FZo.",
    new URLSearchParams(window.location.search).get("tipo")?.toUpperCase() ===
      "TERRENO" && "FEd.",
    classification && "FClas.",
    typeForm && "FFo.",
    usage && "Fuso",
    topography && "FTop.",
    level && "FNiv.",
    project && "FProy.",
    quality && "FCal.",
    building && "FCons.",
  ];
  return (
    <div>
      <Table
        title="Renta"
        headerForFactors={headerForFactors}
        items={results}
        averageUnitValue={0}
        constructionSurface={0}
        averageLotArea={0}
      />
    </div>
  );
}
