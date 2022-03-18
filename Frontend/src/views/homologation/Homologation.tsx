/** @format */

import { FC, useState, useEffect } from "react";
import { SelectFactor } from "../../components/homologation/selectFactor";
import { FactorsCompilation, Location, Zone, Age } from "../../components/homologation/factors";
import { UnitCost } from "../../components/homologation/unitCost";
import { BigPicture } from "../../components/homologation/bigPicture";
import { Save } from "../../components/homologation/save";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { selector, searchForExistence } from "../../features/homologation/slice";
import { ReFactor } from "../../components/homologation/reFactor";
import { Indiviso } from "../../components/homologation/indiviso";
export default function Homologation() {
	const dispatch = useAppDispatch();
	const { id, status } = useAppSelector(selector);
	const [showSelectFactor, setShowSelectFactor] = useState(true);
	const [showEditFactors, setShowEditFactors] = useState(false);
	const [showLocationZone, setShowLocationZone] = useState(false);
	const [showUnitCost, setShowUnitCost] = useState(false);
	const [showBigPicture, setShowBigPicture] = useState(false);
	const [showRefactor, setShowRefactor] = useState(false);
	console.log(useAppSelector(selector));
	/*useEffect(() => {
		dispatch(searchForExistence(id));
	}, []);
	useEffect(() => {
		if (status === "exists") {
			setShowSelectFactor(false);
			setShowEditFactors(false);
			setShowLocationZone(false);
			setShowUnitCost(false);
			setShowBigPicture(true);
		}
	}, [status]);*/
	return (
		<>
			{status === "loading" ? (
				<div className="d-flex justify-content-center">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) : (
				<>
					<Save />

					<SelectionFactor
						name="begin"
						visibility={showSelectFactor}
						setCurrent={setShowSelectFactor}
						setNext={setShowEditFactors}
					/>
					<EditFactor
						name="edit"
						visibility={showEditFactors}
						setPrev={setShowSelectFactor}
						setCurrent={setShowEditFactors}
						setNext={setShowLocationZone}
					/>
					<LocationZone
						name="location"
						visibility={showLocationZone}
						setPrev={setShowEditFactors}
						setCurrent={setShowLocationZone}
						setNext={setShowUnitCost}
					/>
					<EditHomologation
						name="edit"
						visibility={showUnitCost}
						setPrev={setShowLocationZone}
						setCurrent={setShowUnitCost}
						setNext={setShowBigPicture}
					/>
					<ShowBigPicture
						name="bigPicture"
						visibility={showBigPicture}
						setPrev={setShowUnitCost}
						setCurrent={setShowBigPicture}
						setNext={setShowRefactor}
					/>
					<ShowRefactor
						name="end"
						visibility={showRefactor}
						setPrev={setShowBigPicture}
						setCurrent={setShowRefactor}
						setNext={() => {}}
					/>
				</>
			)}
		</>
	);
}
const VisibilityButton: FC = (props: any) => (
	<div className="row mb-3 me-1">
		{props.name !== "begin" ? (
			<div className="col text-start">
				<button
					className="btn btn-sm btn-link"
					onClick={() => {
						props.setCurrent(false);
						props.setPrev(true);
					}}
				>
					Atras
				</button>
			</div>
		) : null}
		{props.name !== "end" ? (
			<div className=" col text-end">
				<button
					className="btn btn-sm btn-outline-primary"
					onClick={() => {
						props.setCurrent(false);
						props.setNext(true);
					}}
				>
					Continuar
				</button>
			</div>
		) : null}
	</div>
);
const SelectionFactor: FC<{
	name: string;
	visibility: boolean;
	setCurrent: Function;
	setNext: Function;
}> = (props: any) => (
	<>
		{props.visibility ? (
			<div className="m-3 card">
				<SelectFactor />
				<VisibilityButton {...props} />
			</div>
		) : null}
	</>
);
const EditFactor: FC<{
	name: string;
	visibility: boolean;
	setPrev: Function;
	setCurrent: Function;
	setNext: Function;
}> = (props) => (
	<>
		{props.visibility ? (
			<div className="m-3 card">
				<FactorsCompilation />
				<VisibilityButton {...props} />
			</div>
		) : null}
	</>
);
const LocationZone: FC<{
	name: string;
	visibility: boolean;
	setPrev: Function;
	setCurrent: Function;
	setNext: Function;
}> = (props) => (
	<>
		{props.visibility ? (
			<table className="m-3 px-2 pt-4 card">
				<tbody>
					<Location />
					<Zone />

					<VisibilityButton {...props} />
				</tbody>
			</table>
		) : null}
	</>
);
const EditHomologation: FC<{
	name: string;
	visibility: boolean;
	setPrev: Function;
	setCurrent: Function;
	setNext: Function;
}> = (props) => (
	<>
		{props.visibility ? (
			<div className="m-3">
				<Age />
				<UnitCost />
				<VisibilityButton {...props} />
			</div>
		) : null}
	</>
);
const ShowBigPicture: FC<{
	name: string;
	visibility: boolean;
	setPrev: Function;
	setCurrent: Function;
	setNext: Function;
}> = (props) =>
	props.visibility ? (
		<div className="px-5">
			<br />
			<BigPicture />
			<VisibilityButton {...props} />
		</div>
	) : null;
const ShowRefactor: FC<{
	name: string;
	visibility: boolean;
	setPrev: Function;
	setCurrent: Function;
	setNext: Function;
}> = (props) =>
	props.visibility ? (
		<div className="px-5">
			<ReFactor />
			<Indiviso />
		</div>
	) : null;