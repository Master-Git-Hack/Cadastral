/** @format */

import { Grid, Row, Col } from "rsuite";
import { Calculation } from "./Calculation";
import { Documentation } from "./Documentation";
import { Zone } from "./Zone";

/** @format */
export const Component = () => (
	<Grid fluid>
		<Row>
			<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
				<Documentation />
			</Col>
			<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
				<Calculation />
			</Col>
		</Row>
	</Grid>
);
export const Area = { Zone, Documentation, Calculation, Component };
