/** @format */
import { AlertProps, ErrorsProps } from "./errors.types";
import { Alert } from "../../Alert";

export const Errors = ({ name, errors, show }: AlertProps) => (
	<>
		{show &&
			errors?.map((error: ErrorsProps, index: number) => (
				<Alert
					key={`errors alert for component ${name} ${index}`}
					header={`Se encontro el siguiente error: ${error.title}`}
					type="error"
				>
					{error.message}, favor de revisar {error.reference}
				</Alert>
			))}
	</>
);
