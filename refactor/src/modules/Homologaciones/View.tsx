/** @format */

import { Alert } from "../../utils/utils.alert";
import { Container } from "../../components/Container/Container";
import { useAppDispatch, useAppSelector } from "../../hooks/Redux";
import {
	addRow,
	getHomologaciones,
	loadFactors,
	rmRow,
} from "../../Slices/Justipreciacion/Homologacion/homologaciones.slice";
import { Factors } from "./Factores/Factores";
import { Area } from "./Registros/Areas/Area";
import { BigPicture } from "./BigPicture/BigPicture";
import { useEffect, useState } from "react";
import { View as Component } from "../../components/PaginatedView/PaginatedView";
import { Button } from "../../components/Button/Button";
const { Compilation, AgeContainer, Selection } = Factors;
const Pages = (type: string) => ({
	1: <Compilation />,
	2: <AgeContainer type={type} />,
	3: <Area.Component />,
	4: <Selection />,
	5: <BigPicture />,
});
export const View = () => {
	const AgeContainer = () => Factors.AgeContainer({ type: "RENTA" });

	const dispatch = useAppDispatch();
	const [startAt, setStartAt] = useState(1);
	const { Save, Success, Error } = Alert;
	useEffect(() => {
		dispatch(loadFactors());
	}, []);
	useEffect(() => {
		startAt !== 7 &&
			setTimeout(() => {
				setStartAt(7);
			}, 1000);
	}, [startAt]);
	return (
		<Component
			title={
				<div className="d-flex justify-content-between flex-fill">
					<h1 className="text-nowrap">
						<span>
							Homologación de tipo: <strong>Terreno</strong>
						</span>
					</h1>
					<Button type="success" className="ms-auto my-auto">
						Save
					</Button>
				</div>
			}
			limitPages={7}
			pages={Pages("RENTA")}
			startAt={startAt}
			hidePage={6}
		/>
	);
};
