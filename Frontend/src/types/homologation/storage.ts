/** @format */

import {AgeProps} from './factors/age';
import {BuildingProps} from './factors/building';
import {ClassificationProps} from './factors/classification';
import {ComparisonProps} from './factors/comparison';
import {LevelProps} from './factors/level';
import {ProjectProps} from './factors/project';
import {QualityProps} from './factors/quality';
import {SurfaceProps} from './factors/surface';
import {State as SymbolsProps} from './factors/symbols';
import {TopographyProps} from './factors/topography';
import {TypeFormProps} from './factors/typeForm';
import {UsageProps} from './factors/usage';
import {AreasProps} from './homologation/areas';
import {SalesCostProps} from './homologation/salesCost';
import {WeightingPercentageProps} from './homologation/weightingPercentage';

export interface FactorsProps {
	[key: string]:
		| AgeProps
		| BuildingProps
		| ClassificationProps
		| ComparisonProps
		| LevelProps
		| ProjectProps
		| QualityProps
		| SurfaceProps
		| SymbolsProps
		| TopographyProps
		| TypeFormProps
		| UsageProps
		| any;
}
export interface HomologationProps {
	[key: string]: AreasProps | SalesCostProps | WeightingPercentageProps | any;
}
interface Storage {
	[key: string]:
		| number
		| string
		| {[key: string]: FactorsProps | HomologationProps};
}
export interface StorageProps extends Storage {
	id: number;
	type: string;
	status: 'complete' | 'loading' | "working" | 'failed'| "exists";
	factors: FactorsProps;
	homologation: HomologationProps;
}
export interface TransactionProps{
	itemID?:number;
	itemName?:string;
	subItemName?:string
	value:any;
}