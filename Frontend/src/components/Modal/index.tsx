/** @format */

import { ModalProps, HeaderProps, FooterProps, TitleProps } from "./modal.interfaces";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, Ref, useEffect, useState } from "react";
import { DialogActions, DialogTitle, DialogContent, Divider, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Button } from "../Button";
import { ButtonProps } from "../Button/interfaces";
const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement;
	},
	ref: Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});
const Title = ({ sx, ...props }: TitleProps) => (
	<Typography sx={{ ml: 2, flex: 1, ...sx }} {...props} />
);

const Header = ({
	title,
	color,
	sx,
	button,
	asSimpleDialog,
	onClick,
}: HeaderProps & { asSimpleDialog?: boolean; onClick: () => void }) => (
	<>
		{!asSimpleDialog ? (
			<AppBar
				color={color ?? "transparent"}
				sx={{ position: "relative", ...sx }}
				enableColorOnDark
			>
				<Toolbar>
					{title && (title?.align === undefined || title?.align === "left") && (
						<Title {...title} />
					)}
					<IconButton
						edge={title !== undefined ? "start" : "end"}
						color={color && color !== "transparent" ? "inherit" : "error"}
						onClick={onClick}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					{title && title?.align === undefined && title?.align === "right" && (
						<Title {...title} />
					)}
					{button && <Button autoFocus {...button} />}
				</Toolbar>
			</AppBar>
		) : (
			<DialogTitle id="responsive-dialog-title">{title && <Title {...title} />}</DialogTitle>
		)}
	</>
);
const Footer = ({
	children,
	actions,
	sx,
	asSimpleDialog,
}: FooterProps & { asSimpleDialog?: boolean }) => (
	<>
		{!asSimpleDialog && children !== undefined && <Divider />}
		{children}
		<DialogActions sx={sx}>
			{actions?.map(
				({ type, ...props }: ButtonProps, index: number) =>
					type !== "link" && (
						<Button
							{...(props as ButtonProps)}
							key={`action-buttons-footer-${index}`}
						/>
					),
			)}
		</DialogActions>
	</>
);
export default function Modal({
	children,
	modalBtn,
	asSimpleDialog,
	open,
	header,
	footer,
	fullWidth,
	size,
	sx,
}: ModalProps) {
	const [openModal, setOpenModal] = useState<boolean>(open ?? false);
	const { breakpoints } = useTheme();
	const fullScreen = useMediaQuery(breakpoints.down("sm"));

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		isMounted && setOpenModal(open ?? false);
		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [open]);
	return (
		<>
			{modalBtn && <Button {...modalBtn} onClick={() => setOpenModal(true)} />}
			<Dialog
				fullScreen={fullScreen}
				fullWidth={fullWidth ?? true}
				maxWidth={size ?? "xs"}
				sx={sx}
				open={openModal}
				onClose={() => setOpenModal(false)}
				TransitionComponent={Transition}
			>
				<Header
					{...header}
					asSimpleDialog={asSimpleDialog ?? false}
					onClick={() => setOpenModal(false)}
				/>
				<DialogContent>{children}</DialogContent>
				<Footer {...footer} asSimpleDialog={asSimpleDialog ?? false} />
			</Dialog>
		</>
	);
}
