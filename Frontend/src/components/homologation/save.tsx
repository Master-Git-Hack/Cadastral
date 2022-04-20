/** @format */
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { getState, request } from "../../features/homologation/slice";
import { handleRequest } from "../../features/homologation/handlers";

export const SaveButton = () => {
	const dispatch = useAppDispatch();
	const state = useAppSelector(getState);
	const { record, errors } = state;
	const { id } = record.justipreciacion;
	const { type, status } = record.homologacion;
	const [show, setShow] = useState(false);
	const sendRequest = () => {
		const payload = handleRequest(state);
		const properties = {
			url: `/HOMOLOGATION/${type}/${id}`,
			responseType: "json",
			payload,
		};
		if (errors.length === 0) {
			if (status.includes("exists")) dispatch(request.patch(properties));
			if (status.includes("newOne")) dispatch(request.post(properties));
			alert("Registro guardado exitosamente");
			window.opener = null;
			window.open("about:blank", "_self", "");
			window.close();
			setShow(false);
		} else {
			alert("Favor de revisar los campos vacios");
			setShow(true);
		}
	};

	return (
		<div className="container container-fluid">
			<div className="row my-auto">
				<div className="col my-auto">
					<h5>
						Homologación de tipo: <strong>{type}</strong>
					</h5>
				</div>
				<div className="col my-auto">
					{!status.includes("loading") ? (
						<div className="row text-end">
							<div className="col pt-3 pe-5 ">
								<button className="btn btn-success" onClick={sendRequest}>
									Guardar
								</button>
							</div>
							<br />
						</div>
					) : null}
				</div>
			</div>
			{show && (
				<ul className="list-group my-4">
					{errors.map((error: any, index) => (
						<li
							className="list-group-item salign-items-center list-group-item-danger my-1 rounded border-light font-monospace"
							key={`list of errors, row ${index}`}
						>
							{error?.Location && (
								<div className="row border-bottom border-light">
									<div className="col">
										<strong>{error.Location.name}</strong>:{" "}
										{error.Location.message} para {error.Location.reference}
									</div>
								</div>
							)}
							{error?.Zone && (
								<div className="row border-bottom border-light">
									<div className="col">
										<strong>{error.Zone.name}</strong>: {error.Zone.message}{" "}
										para {error.Zone.reference}
									</div>
								</div>
							)}
							{error?.Area && (
								<>
									{error.Area?.colony && (
										<div className="row border-bottom border-light">
											<div className="col">
												<strong>{error.Area.colony.name}</strong>:{" "}
												{error.Area.colony.message} para{" "}
												{error.Area.colony.reference}
											</div>
										</div>
									)}
									{error.Area?.street && (
										<div className="row border-bottom border-light">
											<div className="col">
												<strong>{error.Area.street.name}</strong>:{" "}
												{error.Area.street.message} para{" "}
												{error.Area.street.reference}
											</div>
										</div>
									)}
									{error.Area?.streetNumber && (
										<div className="row border-bottom border-light">
											<div className="col">
												<strong>{error.Area.streetNumber.name}</strong>:{" "}
												{error.Area.streetNumber.message} para{" "}
												{error.Area.streetNumber.reference}
											</div>
										</div>
									)}
									{error.Area?.observations && (
										<div className="row border-bottom border-light">
											<div className="col">
												<strong>{error.Area.observations.name}</strong>:{" "}
												{error.Area.observations.message} para{" "}
												{error.Area.observations.reference}
											</div>
										</div>
									)}
									{error.Area?.references && (
										<div className="row border-bottom border-light">
											<div className="col">
												<strong>{error.Area.references.name}</strong>:{" "}
												{error.Area.references.message} para{" "}
												{error.Area.references.reference}
											</div>
										</div>
									)}
								</>
							)}
							{error?.Surface?.observations && (
								<div className="row border-bottom border-light">
									<div className="col">
										<strong>{error.Surface.observations.name}</strong>:{" "}
										{error.Surface.observations.message}
									</div>
								</div>
							)}
							{error?.SalesCost?.observations && (
								<div className="row border-bottom border-light">
									<div className="col">
										<strong>{error.SalesCost.observations.name}</strong>:{" "}
										{error.SalesCost.observations.message}
									</div>
								</div>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
