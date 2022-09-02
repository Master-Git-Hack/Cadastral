/** @format */

import { useEffect, useState } from "react";
export const MinMaxView = (props: {
	children: any;
	name: string;
	id: number;
	visibility: boolean;
}) => {
	const [show, setShow] = useState(props.visibility);
	useEffect(() => {
		setShow(props.visibility);
	}, [props.visibility]);
	return (
		<div
			className={` ${
				show ? "border border-top-0 rounded rounded-5" : "border-bottom"
			}  border-info my-4 `}
		>
			<div className="d-flex flex-row justify-content-between pe-1">
				<h5 className={`text-center my-auto ${show ? "invisible" : ""}`}>
					<span className="mx-1 badge rounded-pill bg-info">Documento: {props.id}</span> -{" "}
					{props.name}
				</h5>
				<button
					className={`btn btn-sm btn-${!show ? "outline-" : ""}info text-${
						!show ? "dark" : "light"
					} my-auto`}
					onClick={() => setShow(!show)}
				>
					{show ? "Ocultar" : "Mostrar"}
				</button>
			</div>
			<div className="px-1">{show && props.children}</div>
		</div>
	);
};
