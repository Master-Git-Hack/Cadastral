/** @format */

import { FC, useState, useEffect } from "react";
import { SelectFactor } from "../components/homologation/selectFactor";
import { FactorsCompilation, Location, Zone, Age } from "../components/homologation/factors";
import { UnitCost } from "../components/homologation/homologation/unitCost";
import { Areas } from "../components/homologation/homologation/areas";
import { BigPicture } from "../components/homologation/bigPicture";
import { Save } from "../components/homologation/homologation/save";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { selector, searchForExistence } from "../features/homologation/slice";
import { ReFactor } from "../components/homologation/homologation/reFactor";
import { Indiviso } from "../components/homologation/homologation/indiviso";
import { AdjustedValue } from "../components/homologation/homologation/adjustedValue";
export default function Homologation() {
	const dispatch = useAppDispatch();
	const { id, status, type, errors } = useAppSelector(selector);

	const [showEditFactors, setShowEditFactors] = useState(true);
	const [showLocationZone, setShowLocationZone] = useState(false);
	const [showUnitCost, setShowUnitCost] = useState(false);
	const [showSelectFactor, setShowSelectFactor] = useState(false);
	const [showBigPicture, setShowBigPicture] = useState(false);
	const [showRefactor, setShowRefactor] = useState(false);
	useEffect(() => {
		dispatch(searchForExistence(id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (status === "exists") {
			setShowSelectFactor(false);
			setShowEditFactors(false);
			setShowLocationZone(false);
			setShowUnitCost(false);
			setShowBigPicture(true);
			setShowRefactor(false);
		}
	}, [status]);
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
					{errors.length > 0 ? (
						<ol className="">
							{errors.map((item: any, index: number) => (
								<p key={`list of errors finded ${index}`}>
									<span className="badge rounded-pill bg-danger">
										<h6>{item}</h6>
									</span>
								</p>
							))}
						</ol>
					) : null}
					<div className="text-center">
						<h1>Homolgacion de Tipo:</h1>

						<h1>
							<strong>{type}</strong>
						</h1>
					</div>
					<EditFactor
						name="begin"
						visibility={showEditFactors}
						setPrev={() => {}}
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
						setNext={setShowSelectFactor}
					/>
					<SelectionFactor
						name="select"
						visibility={showSelectFactor}
						setPrev={setShowUnitCost}
						setCurrent={setShowSelectFactor}
						setNext={setShowBigPicture}
					/>
					<ShowBigPicture
						name="bigPicture"
						visibility={showBigPicture}
						setPrev={setShowSelectFactor}
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
/*
const useWindowSize = (width: number, height: number) => {
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		const updateSize = () => setSize([window.innerWidth, window.innerHeight]);
		window.resizeTo(width, height);
		return () => window.removeEventListener("resize", updateSize);
	}, []);
	return size;
};*/
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
	setPrev: Function;
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
				<Areas />
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
			<div className="row">
				<div className="col-5 col-sm-5">
					<ReFactor />
				</div>
				<div className="col-2 col-sm-2 text-center">
					<AdjustedValue />
				</div>
				<div className="col-5 col-sm-5">
					<Indiviso />
				</div>
				<VisibilityButton {...props} />
			</div>
		</div>
	) : null;
