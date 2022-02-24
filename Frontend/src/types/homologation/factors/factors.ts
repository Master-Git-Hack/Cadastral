import { FactorPeriphery } from "./periphery";
import { FactorUsage } from "./usage";
import { FactorLevel } from "./level";
import { FactorQuality } from "./quality";
import { FactorProject } from "./project";
import { FactorBuilding } from "./building";
import { FactorTopography } from "./topography";
import { FactorTypeForm } from "./typeForm";
import { LocationZone } from "./location_zone";
export interface Factors {
  id: number;
  classification: FactorPeriphery;
  typeForm: FactorTypeForm;
  usage: FactorUsage;
  topography: FactorTopography;
  level: FactorLevel;
  quality: FactorQuality;
  project: FactorProject;
  building: FactorBuilding;
  location?: Array<LocationZone> | undefined;
  zone?: Array<LocationZone> | undefined;
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
    | LocationZone;
}
