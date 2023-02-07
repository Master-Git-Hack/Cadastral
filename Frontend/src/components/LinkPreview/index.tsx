/** @format */

const Test = () => {};
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "../Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { LinkState, LinkPreviewProps } from "./linkpreview.interfaces";
import { isURL } from "../../utils/url";
export const LinkPreview = ({ x, loading }: LinkPreviewProps) => {
	const [preview, setPreview] = useState<LinkState | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState<string>("");
	const handle = () => {
		setIsLoading(true);
		getLinkPreview("https://mui.com/material-ui/react-card/#main-content")
			.then((response) => {
				console.log(response);

				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			})
			.catch((error) => {
				console.log(error);
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			});
	};
	return (
		<>
			<TextField value={data} onChange={({ currentTarget: { value } }) => setData(value)} />
			<Card sx={{ maxWidth: 345, borderRadius: 4 }}>
				{isLoading ? (
					<Skeleton variant="rounded" width={345} height={145} animation="wave" />
				) : (
					<CardMedia
						component="img"
						height="140"
						image={preview?.image}
						alt={preview?.title}
					/>
				)}
				<CardContent>
					{isLoading ? (
						<Skeleton variant="text" width={100} height={25} animation="wave" />
					) : (
						<Typography gutterBottom variant="h5" component="div">
							{preview?.title}
						</Typography>
					)}
					{isLoading ? (
						<>
							<Skeleton variant="text" width={310} height={25} animation="wave" />
							<Skeleton variant="text" width={310} height={25} animation="wave" />
						</>
					) : (
						<Typography variant="body2" color="text.secondary">
							{preview?.description}
						</Typography>
					)}
				</CardContent>
				<CardActions>
					<Button type="link" href={preview?.url ?? "#"} onClick={handle}>
						Ir a
					</Button>
				</CardActions>
			</Card>
		</>
	);
};
