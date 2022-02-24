import { Fragment } from "react";
import FactorsCompilation from "../components/homologation/factors";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import {
  add,
  remove,
  set,
  select,
  get,
  selectHomologation,
} from "../features/homologations/homologationsSlice";
import { Factors } from "../types/homologation/factors/factors";
export function Homologations() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectHomologation);
  return (
    <Fragment>
      <div className="container m-auto">
        <FactorsCompilation key="factors-compilation-view" />
      </div>
    </Fragment>
  );
}
