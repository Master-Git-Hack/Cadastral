/** @format */

import { HideShowProps } from "./HideShow.types";
import { useState, useEffect } from "react";
import { Button } from "../Button/Button";
export const HideShow = (props: HideShowProps): JSX.Element => {
	const { name, label, className, children, onClick } = props;
	const [isHidden, setIsHidden] = useState<boolean>(props.isHidden ?? false);
	useEffect(() => {
		props?.isHidden && setIsHidden(props.isHidden);
	}, [props.isHidden]);
	return (
		<div
			className={`${
				!isHidden ? "border border-top-0 rounded rounded-5" : "border-bottom"
			} ${className}`}
		>
			<div className="d-flex flex-row justify-content-between pe-1 mb-2">
				<h5 className={`text-center my-auto ${!isHidden ? "invisible" : ""}`}>
					{label ?? (
						<>
							<span className="mx-1 badge rounded-pill bg-info">
								{`Documento: ${props.id} `}
							</span>
							{name}
						</>
					)}
				</h5>
				<Button
					text={!isHidden ? "Ocultar" : "Mostrar"}
					type={"info"}
					outline={!isHidden}
					onClick={() => onClick ?? setIsHidden(!isHidden)}
				/>
			</div>
			{!isHidden && children}
		</div>
	);
};
