import { FactorPeriphery } from "./periphery";
import { FactorUsage } from "./usage";
import { FactorLevel } from "./level";
import { FactorQuality } from "./quality";
import { FactorProject } from "./project";
import { FactorBuilding } from "./building";
import { FactorTopography } from "./topography";
import { FactorTypeForm } from "./typeForm";
import { LocationZone } from "./location_zone";
import { FactorState } from "./factor";
interface FactorsProps {
  [key: string]:
    | FactorPeriphery
    | FactorUsage
    | FactorLevel
    | FactorQuality
    | FactorProject
    | FactorBuilding
    | FactorTopography
    | FactorTypeForm
    | Array<LocationZone>
    | number
    | Array<number>;
}
export interface Factors extends FactorsProps {
  id: number;
  classification: FactorPeriphery | number;
  typeForm: FactorTypeForm | number;
  usage: FactorUsage | number;
  topography: FactorTopography | number;
  level: FactorLevel | number;
  quality: FactorQuality | number;
  project: FactorProject | number;
  building: FactorBuilding | number;
}

export interface Transaction {
  transaction:
    | FactorPeriphery
    | FactorTypeForm
    | FactorUsage
    | FactorTopography
    | FactorLevel
    | FactorQuality
    | FactorProject
    | FactorBuilding
    | Array<LocationZone>
    | FactorState;
}
