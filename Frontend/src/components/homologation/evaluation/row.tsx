import { FC } from "react";

import { FancyInput } from "../../inputs/fancyInput";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { selectHomologation } from "../../../features/homologations/homologationsSlice";
import { toFancyNumber } from "../../../utils/utils";
const SalesCost: FC = (props: any) => (
  <td colSpan={3}>
    <FancyInput
      index={props.index}
      name="salesCost"
      value={15_000_000.00}
      onChange={() => {}}
      isCurrency={true}
      isPercentage={false}
    />
  </td>
);
const Area: FC = (props: any) => (
  <td colSpan={2}>
    <FancyInput
      index={props.index}
      name="area"
      value={props.area}
      onChange={() => {}}
      isCurrency={false}
      isPercentage={false}
    />
  </td>
);
const Zone: FC = (props: any) => (
  <td colSpan={1}>
    <FancyInput
      index={props.index}
      name="zone"
      value={props.zone}
      onChange={() => {}}
      isCurrency={false}
      isPercentage={false}
    />
  </td>
);

const WeightingPercentage: FC = (props: any) => (
  <td colSpan={1}>
    <FancyInput
      index={props.index}
      name="weightingPercentage"
      value={props.weightingPercentage}
      onChange={() => {}}
      isCurrency={false}
      isPercentage={true}
    />
  </td>
);

const ShowValues: FC<any> = (props: any) => (
  <td
    colSpan={props.colspan}
    id={`Row-Evaluation-${props.index}-show-values-${props.name}`}
    key={`Row-Evaluation-${props.index}-show-values-${props.name}`}
    className="justify-content-center align-self-center align-middle text-center text-muted"
  >
    {props.value
      ? toFancyNumber(
          props.value,
          props.isCurrency,
          props.isPercentage,
          props.decimals
        )
      : 0}
  </td>
);
const Age :FC = (props:any)=>(<></>)
const handleVisibility = (items: any, current: string) =>
  items.find((item: string) => item === current);
export const Row: FC<{
  index: number;
  salesCost: number;
  unitCost: number;
  area: number;
  surface: number;
  classification: number;
  location: number;
  weightingPercentage: number;
  zone: number;
  typeForm: number;
  usage: number;
  topography: number;
  building: number;
  level: number;
  project: number;
  quality: number;
  resultingTypeApprovalFactor: number;
  resultingUnitaryCost: number;
  headerForFactors: any;
}> = (props) => {
  const dispatch = useAppDispatch();
  const { type } = useAppSelector(selectHomologation);
  const edification = handleVisibility(props.headerForFactors, "FEd.");
  const classification = handleVisibility(props.headerForFactors, "FClas.");
  const typeForm = handleVisibility(props.headerForFactors, "FFo.");
  const usage = handleVisibility(props.headerForFactors, "Fuso");
  const topography = handleVisibility(props.headerForFactors, "FTop.");
  const building = handleVisibility(props.headerForFactors, "FCons.");
  const level = handleVisibility(props.headerForFactors, "FNiv.");
  const project = handleVisibility(props.headerForFactors, "FProy.");
  const quality = handleVisibility(props.headerForFactors, "FCal.");
  console.log(props);

  return (
    <tr
      key={`Row-Evaluation-${props.index}`}
      id={`Row-Evaluation-${props.index}`}
      className="justify-content-center align-self-middle align-middle text-center"
    >
      <td>{`C${props.index + 1}`}</td>
      <SalesCost {...props} />
      <Area {...props} />
      <ShowValues
        name="unitCost"
        value={props.unitCost}
        isCurrency={false}
        isPercentage={false}
        decimals={2}
        colspan={3}
        {...props}
      />
      edad
      <ShowValues
        name="surface"
        value={props.surface}
        isCurrency={false}
        isPercentage={false}
        decimals={2}
        colspan={1}
        {...props}
      />
      <ShowValues
        name="location"
        value={props.location}
        isCurrency={false}
        isPercentage={false}
        decimals={2}
        colspan={1}
        {...props}
      />
      <Zone {...props} />
      {edification && <>FEd.</>}
      {classification && (
        <ShowValues
          name="classification"
          value={props.classification}
          isCurrency={false}
          isPercentage={false}
          decimals={2}
          colspan={1}
          {...props}
        />
      )}
      {typeForm && (
        <ShowValues
          name="typeForm"
          value={props.typeForm}
          isCurrency={false}
          isPercentage={false}
          decimals={2}
          colspan={1}
          {...props}
        />
      )}
      {usage && (
        <ShowValues
          name="usage"
          value={props.usage}
          isCurrency={false}
          isPercentage={false}
          decimals={2}
          colspan={1}
          {...props}
        />
      )}

      {topography && (
        <ShowValues
          name="topography"
          value={props.topography}
          isCurrency={false}
          isPercentage={false}
          decimals={2}
          colspan={1}
          {...props}
        />
      )}
      {level && (
        <ShowValues
          name="level"
          value={props.level}
          isCurrency={false}
          isPercentage={false}
          decimals={2}
          colspan={1}
          {...props}
        />
      )}
      {project && (
        <ShowValues
          name="project"
          value={props.project}
          isCurrency={false}
          isPercentage={false}
          decimals={2}
          colspan={1}
          {...props}
        />
      )}
      {quality && (
        <ShowValues
          name="quality"
          value={props.quality}
          isCurrency={false}
          isPercentage={false}
          decimals={2}
          colspan={1}
          {...props}
        />
      )}
      {building && (
        <ShowValues
          name="building"
          value={props.building}
          isCurrency={false}
          isPercentage={false}
          decimals={2}
          colspan={1}
          {...props}
        />
      )}
      <ShowValues
        name="resultingTypeApprovalFactor"
        value={props.resultingTypeApprovalFactor}
        isCurrency={false}
        isPercentage={false}
        decimals={2}
        colspan={1}
        {...props}
      />
      <WeightingPercentage {...props} />
      <ShowValues
        name="resultingUnitaryCost"
        value={props.resultingUnitaryCost}
        isCurrency={true}
        isPercentage={false}
        decimals={2}
        colspan={6}
        {...props}
      />
    </tr>
  );
};
