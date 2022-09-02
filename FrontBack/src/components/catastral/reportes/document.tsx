/** @format */
import { current } from "@reduxjs/toolkit";
import { ReactElement, useEffect, useState } from "react";
import {
	addDocument,
	consumeReport,
	getAvaluos,
	removeDocument,
} from "../../../features/catastral/avaluosSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { SaveButton } from "../../inputs/saveButton";
import { DocumentProperties } from "./properties";
export const ContainerDocument = () => {
	const dispatch = useAppDispatch();
	const { reports, status, message, filename, documents } = useAppSelector(getAvaluos);
	const [animate, setAnimate] = useState(false);

	const [pages] = useState(reports.length / 5);
	const [currentPage, setCurrentPage] = useState(1);
	const goToNextPage = () => {
		setCurrentPage((page) => {
			setAnimate(true);
			return page + 1 <= reports.length ? page + 1 : page;
		});
	};

	const goToPreviousPage = () =>
		setCurrentPage((page) => {
			setAnimate(true);
			return page - 1 > -1 ? page - 1 : page;
		});
	const changePage = (event: any) => setCurrentPage(Number(event.target.textContent));

	const getPaginatedData = () => {
		const start = currentPage - 1;
		const end = start + 1;

		return reports.slice(start, end);
	};
	const getPaginationGroup = () => {
		let start = Math.floor((currentPage - 1) / reports.length);

		return new Array(reports.length).fill(0).map((_, index) => start + index + 1);
	};

	useEffect(() => {
		animate &&
			setTimeout(() => {
				setAnimate(false);
			}, 500);
	}, [animate]);

	return (
		<div className="d-flex flex-column justify-content-center m-1 align-self-center flex-fill shadow-lg p-3 my-4 bg-body rounded h-auto vw-75 ">
			<>
				<div className="clearfix mb-2">
					<div
						className={`${
							reports.length > 1
								? "float-start"
								: "d-flex justify-content-center mb-2"
						}`}
					>
						<h1>
							Reportes de avaluos por lotes {reports.length > 1 && `: ${currentPage}`}
						</h1>
					</div>
					{reports.length > 1 && (
						<div className="float-end">
							<SaveButton
								customText="Descargar Conjunto"
								registro="newOne"
								actionClick={() => {}}
							/>
						</div>
					)}
				</div>
			</>

			<div className={`mx-5 px-5 animate__animated ${animate ? "animate__fadeIn" : null}`}>
				{getPaginatedData().map((data: any, index: number) => (
					<DocumentProperties
						{...data}
						key={`document properties view ${index}`}
						id={data.id - 1}
					/>
				))}
			</div>

			{/* show the pagination
				it consists of next and previous buttons
				along with page numbers, in our case, 5 page
				numbers at a time
			*/}
			<div className="d-flex flex-row justify-content-between">
				<div className="d-flex flex-row justify-content-center my-1 mx-2 align-self-center">
					<button
						className="btn btn-sm btn-outline-success"
						onClick={() => dispatch(addDocument())}
					>
						Agregar Documento
					</button>
				</div>
				{reports.length > 1 && (
					<nav className="d-flex flex-row justify-content-center my-1 mx-2 align-self-center flex-fill">
						<ul className="pagination mb-2">
							{/* previous button */}
							<li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
								<button onClick={goToPreviousPage} className="page-link">
									<div className="d-flex flex-row">
										<span aria-hidden="true">&laquo; Atras</span>
									</div>
								</button>
							</li>
							{/* show page numbers */}
							{getPaginationGroup().map(
								(item, index) =>
									item > 0 &&
									item <= reports.length && (
										<li
											className={`page-item ${
												currentPage === item ? "active" : null
											}`}
											key={index}
										>
											<button onClick={changePage} className="page-link">
												<span>{item}</span>
											</button>
										</li>
									),
							)}

							<li
								className={`page-item ${
									currentPage === reports.length ? "disabled" : ""
								}`}
							>
								<button onClick={goToNextPage} className={`page-link`}>
									<span aria-hidden="true">Siguiente &raquo;</span>
								</button>
							</li>
						</ul>
					</nav>
				)}

				<div className="d-flex flex-row justify-content-center my-1 mx-2 align-self-center">
					<button
						className={`btn btn-sm btn-link  ${
							currentPage < reports.length ? "text-danger" : "text-light disabled"
						}`}
						disabled={currentPage === reports.length}
						onClick={() => dispatch(removeDocument())}
					>
						Remover ultimo documento
					</button>
				</div>
			</div>
		</div>
	);
};
