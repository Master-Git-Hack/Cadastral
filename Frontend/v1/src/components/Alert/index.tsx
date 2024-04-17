/** @format */
import React from "react";

import { Message } from "rsuite";
import { AlertProps } from "./alert.types";

export const Alert = ({ closable, duration, header, type, children }: AlertProps): JSX.Element => (
	<div>
		<Message closable={closable} duration={duration} showIcon header={header} type={type}>
			{children}
		</Message>
	</div>
);
