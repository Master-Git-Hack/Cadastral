/** @format */

import { FC, useState } from "react";
import { SelectFactor } from "../../components/homologation/selectFactor";
import { FactorsCompilation } from "../../components/homologation/factors";
import { UnitCost } from "../../components/homologation/unitCost";
import { BigPicture } from "../../components/homologation/bigPicture";
export default function Homologation() {
	const [showSelectFactor, setShowSelectFactor] = useState(true);
	const [showEditFactors, setShowEditFactors] = useState(false);
	const [showUnitCost, setShowUnitCost] = useState(false);
	const [showBigPicture, setShowBigPicture] = useState(false);
	return (
		<>
			<SelectionFactor
				visibility={showSelectFactor}
				setCurrent={setShowSelectFactor}
				setNext={setShowEditFactors}
			/>
			<EditFactor
				visibility={showEditFactors}
				setCurrent={setShowEditFactors}
				setNext={setShowUnitCost}
			/>
			<EditHomologation
				visibility={showUnitCost}
				setCurrent={setShowUnitCost}
				setNext={setShowBigPicture}
			/>
			<ShowBigPicture
				visibility={showBigPicture}
				setCurrent={setShowBigPicture}
				setNext={() => {}}
			/>
		</>
	);
}
const VisibilityButton: FC = (props: any) => (
	<div className="text-end">
		<button
			className="btn btn-sm btn-primary"
			onClick={() => {
				props.setCurrent(false);
				props.setNext(true);
			}}
		>
			Continuar
		</button>
	</div>
);
const SelectionFactor: FC<{
	visibility: boolean;
	setCurrent: Function;
	setNext: Function;
}> = (props: any) => (
	<>
		{props.visibility ? (
			<div className="m-5">
				<SelectFactor />
				<VisibilityButton {...props} />
			</div>
		) : null}
	</>
);
const EditFactor: FC<{
	visibility: boolean;
	setCurrent: Function;
	setNext: Function;
}> = (props) => (
	<>
		{props.visibility ? (
			<div className="m-5">
				<FactorsCompilation />
				<VisibilityButton {...props} />
			</div>
		) : null}
	</>
);
const EditHomologation: FC<{
	visibility: boolean;
	setCurrent: Function;
	setNext: Function;
}> = (props) => (
	<>
		{props.visibility ? (
			<div className="m-5">
				<UnitCost />
				<VisibilityButton {...props} />
			</div>
		) : null}
	</>
);
const ShowBigPicture: FC<{
	visibility: boolean;
	setCurrent: Function;
	setNext: Function;
}> = (props) =>
	props.visibility ? (
		<div className="m-5">
			<BigPicture />
		</div>
	) : null;
