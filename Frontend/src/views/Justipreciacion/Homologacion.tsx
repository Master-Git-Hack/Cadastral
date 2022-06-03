/** @format */
import { useEffect } from "react";
import { SaveButton } from "../../components/inputs/saveButton";
import BigPicture from "../../components/justipreciacion/homologacion/bigPicture/bigPicture";
import Area from "../../components/justipreciacion/homologacion/documentacion/Area/area";
import Factores, {
	AgeFactor,
	LocationZoneFactor,
	SelectFactors,
} from "../../components/justipreciacion/homologacion/factores/Factores";
import { Justipreciacion } from "../../components/justipreciacion/Justipreciacion";
import { Container } from "../../components/views/Container";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
const AgeArea = () => (
	<>
		<AgeFactor />
		<Area />
	</>
);
export default function Homologacion() {
	const dispatch = useAppDispatch();
	const { id, type, appraisalPurpose, status } = useAppSelector(
		(state: any) => state.homologacion.record,
	);
	useEffect(() => {
		if (id === 0) {
		}
	}, [id]);

	console.log(id, type, appraisalPurpose, status);
	return (
		<>
			<Justipreciacion />
			<Container
				Title={
					<h1>
						Homologación de tipo: <strong>{type}</strong>
					</h1>
				}
				startAt={5}
				dataLimit={1}
				pageLimit={5}
				data={[Factores, LocationZoneFactor, AgeArea, SelectFactors, BigPicture]}
				SaveButton={<SaveButton registro={status} actionClick={() => {}} />}
				Errors={[Error, Error]}
				showErrors={false}
				fixedTop={false}
				width={1200}
				height={1024}
			/>
		</>
	);
}
