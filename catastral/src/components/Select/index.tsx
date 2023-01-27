/** @format */
import { forwardRef } from "react";
import Stack from "@mui/material/Stack";
import { SingleSelect } from "react-select-material-ui";
import Skeleton from "@mui/material/Skeleton";
import { SelectProps } from "./select.interface";
import ReactSelectMaterialUi from "react-select-material-ui";
const options: string[] = ["Africa", "America", "Asia", "Europe"];

export const Select = ({
	loading,
	justifyContent,
	keyValue,
	value,
	label,
	...props
}: SelectProps) => (
	<Stack direction="row" justifyContent={justifyContent} alignItems="center" sx={{ m: 1 }}>
		{loading ? (
			<Skeleton variant="text" width={100} height={50} animation="wave" />
		) : (
			<>
				<SingleSelect
					{...props}
					label={label ?? "Seleccione"}
					value={value[keyValue ?? "value"]}
					SelectProps={{ isClearable: true, autoWidth: true }}
					size="small"
				/>
			</>
		)}
	</Stack>
);
