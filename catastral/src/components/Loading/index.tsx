/** @format */
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { useState, useEffect } from "react";
import { LoadingProps } from "./loading.interfaces";

export const Loading = ({ loading }: LoadingProps) => (
	<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
		<CircularProgress color="inherit" />
	</Backdrop>
);

export default Loading;
