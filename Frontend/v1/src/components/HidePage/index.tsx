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
							{!hide ? "Ocultar " : "Mostrar "}
							{title}
						</Button>
					</div>
				),
				position: "right",
				outside: true,
			}}
		>
			{!hide && children}
			{hide && <div className="mx-3 my-2">{elementOnHide}</div>}
		</Container>
	);
};
