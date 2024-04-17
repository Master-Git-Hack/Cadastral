/** @format */
import { AlertProps, ErrorsProps } from "./errors.types";
import { Alert } from "../../Alert";
import ScrollBars from "react-scrollbar";
import { useState } from "react";
import { Button } from "../../Button";

export const Errors = ({ name, errors, show }: AlertProps) => {
	const [hide, setHide] = useState(false);
	return (
		<ScrollBars
			vertical
			horizontal
			smoothScrolling
			style={{
				minWidth: 365,

				maxWidth: 395,
				height: "100%",
			}}
		>
			{show && (
				<Button
					type="info"
					block
					appearance={hide ? "primary" : "outline"}
					onClick={() => setHide(!hide)}
				>
					{hide ? "Mostrar" : "Ocultar"}
				</Button>
			)}
			{show &&
				!hide &&
				errors?.map(({ title, message, reference }: ErrorsProps, index: number) => (
					<div key={`errors alert for component ${name} ${index}`} className="py-1">
						<Alert header={`Error encontrado en: ${title}`} type="error">
							<p style={{ textAlign: "justify", textJustify: "inter-word" }}>
								{message}, favor de revisar {reference}
							</p>
						</Alert>
					</div>
				))}
		</ScrollBars>
	);
};
