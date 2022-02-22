import { Periphery } from "./periphery";
import { Usage } from "./usage";
import {Level} from "./level";
import {Quality} from "./quality";
import {Project} from "./project";
import {Building} from "./building";
import {LocationZone} from "./location_zone";
import { FactorState } from "./factor";

export interface Factors{
    id:number;
    classification:Periphery;
    typeForm:FactorState;
    usage:Usage;
    topography:FactorState;
    level:Level;
    quality:Quality;
    project:Project;
    building:Building;
    location:LocationZone;
    zone:LocationZone;
}
