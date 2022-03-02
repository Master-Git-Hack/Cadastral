import { FC } from "react";

import { FancyInput } from "../../inputs/fancyInput";
import { useAppDispatch } from "../../../hooks/hooks";
import { toFancyNumber } from "../../../utils/utils";

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
  const SalesCost: FC = (props: any) => (
    <FancyInput
      index={props.index}
      name="salesCost"
      value={props.salesCost}
      onChange={() => {}}
      isCurrency={true}
      isPercentage={false}
    />
  );
  const Area: FC = (props: any) => (
    <td colSpan={3}>
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

  const Others: FC = (props: any) => (
    <td colSpan={1}>
      <FancyInput
        index={props.index}
        name="others"
        value={props.others}
        onChange={() => {}}
        isCurrency={false}
        isPercentage={false}
      />
    </td>
  );

  const Purchases: FC = (props: any) => (
    <td colSpan={1}>
      <FancyInput
        index={props.index}
        name="purchase"
        value={props.purchase}
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
      id={`Row-Evaluation-${props.index}-show-values`}
      key={`Row-Evaluation-${props.index}-show-values`}
      className="justify-content-center align-self-center align-middle text-center text-muted"
    >
      {toFancyNumber(
        props.value,
        props.isCurrency,
        props.isPercentage,
        props.decimals
      )}
    </td>
  );

  return (
    <tr
      key={`Row-Evaluation-${props.index}`}
      id={`Row-Evaluation-${props.index}`}
      className="justify-content-center align-self-middle align-middle text-center"
    >
      <td>{`C${props.index+1}`}</td>
      <SalesCost {...props} />
      <Area {...props} />
      <ShowValues
        value={props.unitCost}
        isCurrency={false}
        isPercentage={false}
        decimals={2}
        colspan={3}
        {...props}
      />
      <ShowValues
        value={props.classification}
        isCurrency={false}
        isPercentage={false}
        decimals={2}
        colspan={1}
        {...props}
      />
      <ShowValues
        value={props.location}
        isCurrency={false}
        isPercentage={false}
        decimals={2}
        colspan={1}
        {...props}
      />
      <ShowValues
        value={props.typeForm}
        isCurrency={false}
        isPercentage={false}
        decimals={2}
        colspan={1}
        {...props}
      />
      <ShowValues
        value={props.usage}
        isCurrency={false}
        isPercentage={false}
        decimals={2}
        colspan={1}
        {...props}
      />
      <Zone {...props} />
      <ShowValues
        value={props.topography}
        isCurrency={false}
        isPercentage={false}
        decimals={2}
        colspan={1}
        {...props}
      />
      <ShowValues
        value={props.surface}
        isCurrency={false}
        isPercentage={false}
        decimals={2}
        colspan={1}
        {...props}
      />
      <Others {...props} />
      <Purchases {...props} />
      <ShowValues
        value={props.resultingTypeApprovalFactor}
        isCurrency={false}
        isPercentage={false}
        decimals={2}
        colspan={1}
        {...props}
      />
      <WeightingPercentage {...props} />
      <ShowValues
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
