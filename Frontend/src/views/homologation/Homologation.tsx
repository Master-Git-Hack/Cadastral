/** @format */

import { FC, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/store";
import { selector, setFactors } from "../../features/homologation/slice";
import { SelectFactor } from "../../components/homologation/selectFactor";
import { FactorsCompilation } from "../../components/homologation/factors";

export default function Homologation() {
	const { factors, homologation } = useAppSelector(selector);
	const [showSelectFactor, setShowSelectFactor] = useState(true);
	const [showEditFactors, setShowEditFactors] = useState(false);
	const [showResults, setShowResults] = useState(false);
	console.log(factors, homologation);
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
				setNext={setShowResults}
			/>
		</>
	);
}
const VisibilityButton: FC = (props: any) => (
	<button
		className="btn btn-sm btn-primary"
		onClick={() => {
			props.setCurrent(false);
			props.setNext(true);
		}}
	>
		Continuar
	</button>
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
				<div className="text-end">
					<VisibilityButton {...props} />
				</div>
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
				<div className="text-end">
					<VisibilityButton {...props} />
				</div>
			</div>
		) : null}
	</>
);
