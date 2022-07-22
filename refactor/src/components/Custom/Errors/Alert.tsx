/** @format */

import { AlertProps } from "./Alert.types";
import { Alert as Component } from "../../Alert/Alert";

export const Alert = (props: AlertProps): JSX.Element => {
	const { name, errors, show } = props;
	return (
		<>
			{show &&
				errors?.map((item: any, index: number) => (
					<Component
						key={`errors alert for component ${name} ${index}`}
						type="danger"
						header={`Se encontro el siguiente error: ${item.title}`}
						body={`${item.message}, favor de revisar ${item.reference}`}
					/>
				))}
		</>
	);
};
