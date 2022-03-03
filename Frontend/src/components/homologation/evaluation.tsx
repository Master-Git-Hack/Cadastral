import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import {
  selectHomologation,
  setResults,
} from "../../features/homologations/homologationsSlice";
import { Table } from "./evaluation/table";
import { handleVisibility } from "../../utils/utils";
export default function Evaluation(props: any) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setResults());
  }, []);

  const { results, elements, type } = useAppSelector(selectHomologation);
  const classification = handleVisibility(elements, "classification");
  const typeForm = handleVisibility(elements, "typeForm");
  const usage = handleVisibility(elements, "usage");
  const topography = handleVisibility(elements, "topography");
  const level = handleVisibility(elements, "level");
  const project = handleVisibility(elements, "project");
  const quality = handleVisibility(elements, "quality");
  const building = handleVisibility(elements, "building");
  const headerForFactors = [
    "FSup.",
    "FUbic.",
    "FZo.",
    type !== "TERRENO" && "FEd.",
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
        title={type}
        headerForFactors={headerForFactors.filter((key: string) => key)}
        items={results}
        averageUnitValue={0}
        constructionSurface={0}
        averageLotArea={0}
      />
    </div>
  );
}
