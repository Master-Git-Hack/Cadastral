/** @format */
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { getState, setIndiviso, consume } from "../features/homologation/slice";
import Factors, {
	LocationZoneFactor,
	SelectFactors,
	AgeFactor,
} from "../components/homologation/factors";
import Area from "../components/homologation/documentation/area";
import BigPicture from "../components/homologation/bigPicture";
import ReFactor from "../components/homologation/documentation/reFactor";
import { SaveButton } from "../components/homologation/save";
import { Spinner } from "../components/spinner/spinner";
export default function Homologation() {
	const dispatch = useAppDispatch();
	const { record, documentation, status } = useAppSelector(getState);
	const { isUsed } = documentation.ReFactor;
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
		const { id } = record.justipreciacion;
		dispatch(consume.get({ url: `/HOMOLOGATION/${type}/${id}`, type: "/" }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
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
	}, [record.homologacion.status]);

	return (
		<div className="mx-5 px-5">
			<SaveButton />
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
				<Spinner />
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
						{"< "}Atras
					</button>
				) : null}
			</div>
			<div className="col text-end">
				{!props.current.includes("reFactor") && props.hasIndiviso ? (
					<button
						className="btn btn-sm btn-outline-info"
						onClick={() => handleVisibility(props.target)}
					>
						Siguiente{" >"}
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.visibility[props.current]]);
	return props.visibility[props.current] ? (
		<div className="row py-4">
			{props.children}
			<NavigationButton {...props} />
		</div>
	) : null;
};
