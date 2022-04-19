/** @format */
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { getState, setIndiviso, request } from "../features/homologation/slice";
import Factors, {
	LocationZoneFactor,
	SelectFactors,
	AgeFactor,
} from "../components/homologation/factors";
import Area from "../components/homologation/documentation/area";
import BigPicture from "../components/homologation/bigPicture";
import ReFactor from "../components/homologation/documentation/reFactor";
import { SaveButton } from "../components/homologation/save";
export default function Homologation() {
	const dispatch = useAppDispatch();
	const { record, documentation, status } = useAppSelector(getState);
	const { isUsed } = documentation.ReFactor;
	const { id } = record.justipreciacion;
	const { type } = record.homologacion;
	const [visibility, setVisibility] = useState({
		factors: true,
		location: false,
		documentation: false,
		selection: false,
		bigPicture: false,
		reFactor: false,
	});
	useEffect(() => {
		dispatch(request.get({ url: `/HOMOLOGATION/${type}/${id}`, type: "/" }));
		if (record.homologacion.status === "exists") {
			setVisibility({
				factors: false,
				location: false,
				documentation: false,
				selection: false,
				bigPicture: true,
				reFactor: false,
			});
		}
	}, []);
	console.log(useAppSelector(getState));
	return (
		<div className="mx-5 px-5">
			<div className="row my-auto">
				<div className="col my-auto">
					<h5>
						Homologación de tipo: <strong>{type}</strong>
					</h5>
				</div>
				<div className="col my-auto">
					{!status.includes("loading") ? <SaveButton /> : null}
				</div>
			</div>
			{!status.includes("loading") ? (
				<>
					<Container
						previous=""
						current="factors"
						target="location"
						hasIndiviso={true}
						visibility={visibility}
						setVisibility={setVisibility}
					>
						<Factors />
					</Container>
					<Container
						previous="factors"
						current="location"
						target="documentation"
						hasIndiviso={true}
						visibility={visibility}
						setVisibility={setVisibility}
					>
						<LocationZoneFactor />
					</Container>
					<Container
						previous="location"
						current="documentation"
						target="selection"
						hasIndiviso={true}
						visibility={visibility}
						setVisibility={setVisibility}
					>
						<AgeFactor />
						<Area />
					</Container>
					<Container
						previous="documentation"
						current="selection"
						target="bigPicture"
						hasIndiviso={true}
						visibility={visibility}
						setVisibility={setVisibility}
					>
						<SelectFactors />
					</Container>
					<Container
						previous="selection"
						current="bigPicture"
						target={isUsed ? "reFactor" : ""}
						hasIndiviso={isUsed}
						visibility={visibility}
						setVisibility={setVisibility}
					>
						{type.includes("TERRENO") ? (
							<div className="form-check form-switch form-check-sm form-switch-sm mb-3">
								<input
									className="form-check-input form-check-input-sm "
									type="checkbox"
									checked={isUsed}
									onChange={(event: any) =>
										dispatch(setIndiviso(event.target.checked))
									}
								/>
								Realizar Proceso de Indiviso
							</div>
						) : null}
						<BigPicture />
					</Container>
					<Container
						previous="bigPicture"
						current="reFactor"
						target=""
						hasIndiviso={false}
						visibility={visibility}
						setVisibility={setVisibility}
					>
						<ReFactor />
					</Container>
				</>
			) : (
				<div className="d-flex justify-content-center">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			)}
		</div>
	);
}
const NavigationButton = (props: {
	previous: string;
	current: string;
	target: string;
	visibility: { [key: string]: boolean };

	setVisibility: Function;
	hasIndiviso: boolean;
}) => {
	const handleVisibility = (target: string) => {
		const aux = props.visibility;
		for (const key in aux) {
			aux[key] = false;
		}
		props.setVisibility({ ...aux, [target]: true });
		return undefined;
	};
	return (
		<div className="row my-2 text-center mb-5">
			<div className="col text-start">
				{!props.current.includes("factors") ? (
					<button
						className="btn btn-sm btn-link"
						onClick={() => handleVisibility(props.previous)}
					>
						Atras
					</button>
				) : null}
			</div>
			<div className="col text-end">
				{!props.current.includes("reFactor") && props.hasIndiviso ? (
					<button
						className="btn btn-sm btn-outline-info"
						onClick={() => handleVisibility(props.target)}
					>
						Siguiente
					</button>
				) : null}
			</div>
		</div>
	);
};
const Container = (props: {
	previous: string;
	current: string;
	target: string;
	hasIndiviso: boolean;
	visibility: { [key: string]: boolean };
	setVisibility: Function;
	children: any;
}) => {
	useEffect(() => {
		if (props.visibility[props.current]) window.scrollTo(0, 0);
	}, [props.visibility[props.current]]);
	return props.visibility[props.current] ? (
		<div className="container container-fluid py-4 px-auto">
			{props.children}
			<NavigationButton {...props} />
		</div>
	) : null;
};

/*
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
	console.log(useAppSelector(selector));
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
};
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
*/
