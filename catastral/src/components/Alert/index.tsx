/** @format */

import { Alert as Component, AlertTitle, Stack } from "@mui/material";
import { AlertProps } from "./interfaces";

export const Alert = ({ children, title, reference, justifyContent, ...props }: AlertProps) => (
	<Stack direction="row" justifyContent={justifyContent} alignItems="center" sx={{ m: 1 }}>
		<Component {...props}>
			{title && <AlertTitle>{title}</AlertTitle>}
			{children}
			{reference && (
				<>
					- <strong>{reference}</strong>
				</>
			)}
		</Component>
	</Stack>
);
