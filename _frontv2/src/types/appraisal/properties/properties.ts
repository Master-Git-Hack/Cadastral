import { Limits } from "./limits";
import { MoreProperties } from "./moreProperties";

export interface Properties {
  id: number;
  limits: Limits;
  collection: string;
  year: string;
  watermark: boolean;
  zoom: number;
  recommended_properties: boolean;
  moreProperties: MoreProperties;
  data: string;
}
