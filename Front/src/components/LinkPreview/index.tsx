/** @format */
import { useEffect, useState } from "react";

import { LinkPreview as Component } from "@dhaiwat10/react-link-preview";
import { LinkPreviewProps } from "./linkPreview.types";
import { Text } from "../Input";
import { isURL } from "../../utils/url";
export const LinkPreview = ({ onChange, value, size }: LinkPreviewProps): JSX.Element => {
	const [url, setURL] = useState(isURL(value));
	useEffect(() => {
		setURL(isURL(value));
	}, [url, value]);
	return (
		<>
			<Text
				isArea={!url}
				type={url ? "url" : "text"}
				onChange={onChange}
				value={value}
				size={size}
			/>
			{url && <Component url={value} />}
		</>
	);
};
