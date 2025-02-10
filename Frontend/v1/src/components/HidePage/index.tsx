/** @format */

import { useState } from "react";
import { Button } from "../Button";
import { Container } from "../Container";
import { HidePageProps } from "./hidePage.types";

export const HidePage = ({ children, elementOnHide, title }: HidePageProps): JSX.Element => {
	const [hide, setHide] = useState(true);

	return (
		<Container
			sidebar={{
				children: (
					<div className="my-2">
						<Button
							appearance={hide ? "outline" : "primary"}
							block
							onClick={() => setHide(!hide)}
						>
							{!hide ? <span>Ocultar </span> : <span>Mostrar </span>}
							{title && <span>{title}</span> as React.ReactElement}
						</Button>
					</div>
				),
				position: "right",
				outside: true,
			}}
		>
			{!hide && children as React.ReactElement}
			{hide && <div className="mx-3 my-2">{elementOnHide}</div> as React.ReactElement}
		</Container>
	);
};
