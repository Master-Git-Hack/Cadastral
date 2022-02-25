import { FactorPeriphery } from "./periphery";
import { FactorUsage } from "./usage";
import { FactorLevel } from "./level";
import { FactorQuality } from "./quality";
import { FactorProject } from "./project";
import { FactorBuilding } from "./building";
import { FactorTopography } from "./topography";
import { FactorTypeForm } from "./typeForm";
import { LocationZone } from "./location_zone";

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
    | number;
}
export interface Factors extends FactorsProps {
  id: number;
  classification: FactorPeriphery;
  typeForm: FactorTypeForm;
  usage: FactorUsage;
  topography: FactorTopography;
  level: FactorLevel;
  quality: FactorQuality;
  project: FactorProject;
  building: FactorBuilding;
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
    | Array<LocationZone>;
}
