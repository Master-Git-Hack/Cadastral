/** @format */

import { MouseEvent, useState } from "react";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tooltip from "../Tooltip";
import { getNotifications } from "../../redux/Notifications";
import { useAppSelector } from "../../redux/app";
import { Alert } from "../Alert";
import { Box } from "@mui/material";
export const Notificaciones = ({ size, showText }: any) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const openMenu = ({ currentTarget }: MouseEvent<HTMLButtonElement>) =>
		setAnchorEl(currentTarget);
	const closeMenu = () => setAnchorEl(null);
	const menuId = "notifications-menu";

	const { notifications, count } = useAppSelector(getNotifications);

	return (
		<>
			<Tooltip helpText={"Notificaciones"}>
				<IconButton
					onClick={openMenu}
					size={size ?? "small"}
					aria-controls={open ? menuId : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
					aria-label={`show ${count(notifications)} new notifications`}
					color="inherit"
					sx={{ mr: 2 }}
				>
					<Badge
						badgeContent={count(notifications)}
						color="info"
						sx={{ mr: count(notifications) ? 2 : showText ? 1 : 0 }}
					>
						<NotificationsIcon />
					</Badge>
					{showText && "Notificaciones"}
				</IconButton>
			</Tooltip>
			{Boolean(count(notifications)) && (
				<Menu
					id={menuId}
					anchorEl={anchorEl}
					open={open}
					onClose={closeMenu}
					MenuListProps={{
						"aria-labelledby": "notifications-button",
					}}
					keepMounted
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
				>
					{notifications.map(({ message, ...props }: Notification, index: number) => (
						<MenuItem key={`menuId item ${message ?? index} `}>
							<Alert {...props}>{message}</Alert>
						</MenuItem>
					))}
				</Menu>
			)}
		</>
	);
};
