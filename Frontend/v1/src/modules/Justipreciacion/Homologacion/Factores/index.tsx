/** @format */

import { useState, useEffect } from "react";
import { Grid, Col, Row, FlexboxGrid } from "rsuite";
import { Container } from "../../../../components/Container";
import { Area } from "../Registros/Area";
import { Age } from "./Age";
import { Common } from "./Common";
import { AgeContainerProps, ContainerProps } from "./factores.interface";
import { Selector } from "./Selector";
import { Symbols } from "./Symbols";
import { LocationZoneProps } from "./Symbols/symbols.types";

export const AgeContainer = ({ type }: AgeContainerProps) => {
	const [colSpan, setColSpan] = useState(24);
	useEffect(() => {
		window.innerWidth < 992 && setColSpan(24);
		window.innerWidth >= 992 && setColSpan(12);
	}, [window.innerWidth]);
	return (
		<Grid fluid>
			<Row>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
					<FlexboxGrid justify="center">
						<FlexboxGrid.Item colspan={colSpan}>
							{!type.includes("TERRENO") && <Age />}
						</FlexboxGrid.Item>
					</FlexboxGrid>
				</Col>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
					<Area.Zone />
				</Col>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
					<Symbols name="Zone" />
				</Col>
			</Row>
		</Grid>
	);
};

const CommonContainer = ({ components }: ContainerProps) => (
	<Grid fluid>
		<Row>
			<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
				<Common name={components[0]} />
			</Col>
			<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
				<Common name={components[1]} />
			</Col>
		</Row>
	</Grid>
);
const SymbolContainer = ({ name }: LocationZoneProps) => (
	<Grid fluid>
		<Row>
			<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
				<Symbols name={name} />
			</Col>
		</Row>
	</Grid>
);
export const Compilation = () => (
	<Container>
		<CommonContainer components={["Classification", "TypeForm"]} />
		<SymbolContainer name="Location" />
		<CommonContainer components={["Usage", "Topography"]} />
		<CommonContainer components={["Level", "Quality"]} />
		<CommonContainer components={["Project", "Building"]} />
	</Container>
);
export const Factores = {
	Age,
	AgeContainer,
	Common,
	Symbols,
	Compilation,
	Selector,
};
