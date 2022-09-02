/** @format */
import { useEffect, useState } from "react";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { LinkPreviewProps } from "./linkPreview.types";
import { Text } from "../Input";
import { isURL } from "../../utils/url";
import { Notification } from "rsuite";

export const LinkPreviewed = ({ onChange, value, size }: LinkPreviewProps): JSX.Element => {
	const [url, setURL] = useState(isURL(value));
	useEffect(() => {
		setURL(isURL(value));
	}, [url, value]);

	return (
		<>
			<Text
				isArea={!url}
				rows={4}
				type={url ? "url" : "text"}
				onChange={onChange}
				value={value}
				size={size}
			/>
			{url && (
				<LinkPreview
					showLoader
					showPlaceholderIfNoImage
					url={value}
					fallback={
						<div className="my-2 text-center">
							<Notification closable type="error" header="Error">
								No se pudo obtener la información del enlace, para mostrar una
								previsualización.
							</Notification>
						</div>
					}
				/>
			)}
		</>
	);
};
