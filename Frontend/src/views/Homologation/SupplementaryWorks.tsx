/** @format */
import { useEffect, useState } from "react";
import SupplementaryWorksComponent from "../../components/homologation/supplementaryWorks/supplementaryWorks";
import DataView from "../../components/homologation/supplementaryWorks/dataView";
export default function SupplementaryWorks() {
	const [visibility, setVisibility] = useState({
		steps: true,
		bigPicture: false,
	});

	return (
		<div className="row py-4 px-5">
			{/* <SupplementaryWorksComponent />*/}
			<Container
				previous=""
				current="steps"
				target="bigPicture"
				visibility={visibility}
				setVisibility={setVisibility}
			>
				<DataView />
			</Container>
			<Container
				previous="steps"
				current="bigPicture"
				target=""
				visibility={visibility}
				setVisibility={setVisibility}
			>
				<>test</>
			</Container>
		</div>
	);
}

const NavigationButton = (props: {
	previous: string;
	current: string;
	target: string;
	visibility: { [key: string]: boolean };
	setVisibility: Function;
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
				{!props.current.includes("steps") && (
					<button
						className="btn btn-sm btn-link"
						onClick={() => handleVisibility(props.previous)}
					>
						{"< "}Atras
					</button>
				)}
			</div>
			<div className="col text-end">
				{!props.current.includes("bigPicture") && (
					<button
						className="btn btn-sm btn-outline-info"
						onClick={() => handleVisibility(props.target)}
					>
						Siguiente{" >"}
					</button>
				)}
			</div>
		</div>
	);
};
const Container = (props: {
	previous: string;
	current: string;
	target: string;
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
