/** @format */
import { useState, MouseEvent } from "react";
import { Link, Popover, Stack, Fab } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ButtonProps } from "./interfaces";

export const Button = ({ justifyContent, successful, type, menu, ...props }: ButtonProps) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const openMenu = ({ currentTarget }: MouseEvent<HTMLButtonElement>) =>
		setAnchorEl(currentTarget);

	const closeMenu = () => setAnchorEl(null);

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	return (
		<Stack direction="row" justifyContent={justifyContent} alignItems="center" sx={{ m: 1 }}>
			{type === "link" ? (
				<Link {...props} />
			) : type === "floating" ? (
				<>
					<Fab {...props} aria-describedby={id} onClick={props.onClick ?? openMenu} />
					{menu && (
						<Popover
							id={id}
							open={open}
							anchorEl={anchorEl}
							onClose={closeMenu}
							anchorOrigin={
								menu.orientation ?? {
									vertical: "bottom",
									horizontal: "right",
								}
							}
						>
							<Stack {...menu.stack} sx={{ m: 1 }}>
								{menu.component}
							</Stack>
						</Popover>
					)}
				</>
			) : (
				<LoadingButton
					color={
						successful !== undefined ? (successful ? "success" : "error") : props.color
					}
					{...props}
				/>
			)}
		</Stack>
	);
};
