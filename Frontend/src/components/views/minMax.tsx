/** @format */

import { useState } from "react";
export const MinMaxView = (props: { children: any; name: string; id: number }) => {
	const [show, setShow] = useState(true);
	return (
		<div className="border">
			<div className="row">
				<div className="col-2 text-start">
					<button
						className={`btn btn-sm btn-${!show ? "outline-" : ""}info`}
						onClick={() => setShow(!show)}
					>
						{show ? "Ocultar" : "Mostrar"}
					</button>
				</div>
				<div className="col-10"></div>
			</div>
			<div className="row">
				<div className="col-12">
					{show ? (
						props.children
					) : (
						<h6 className="text-center badge rounded-pill bg-info">
							Documento: {props.id} - {props.name}
						</h6>
					)}
				</div>
			</div>
		</div>
	);
};
