/** @format */

import { ContainerProps } from "./Container.types";
import { useState, useEffect } from "react";
import { Alert } from "../Custom/Errors/Alert";
import { Button } from "../Button/Button";

export const Container = (props: ContainerProps) => {
	const [animate, setAnimate] = useState(false);
	const {
		header,
		title,
		titleStrong,
		dataLimit,
		data,
		startAt,
		pageLimit,
		saveBtn,
		saveBtnText,
		saveOnClick,
		errors,
		showErrors,
		fixedTop,
		width,
		height,
		addBtn,
		addOnClick,
		rmBtn,
		rmOnClick,
	} = props;
	const hidePage = props?.hidePage ?? -1;
	const [pages] = useState(Number((data.length / dataLimit).toFixed(0)));
	const [currentPage, setCurrentPage] = useState(startAt ?? 1);
	const goToNextPage = () =>
		setCurrentPage((page) => {
			setAnimate(true);
			return page + 1 <= pageLimit ? page + 1 : pageLimit;
		});
	const goToPreviousPage = () =>
		setCurrentPage((page) => {
			setAnimate(true);
			return page > 0 ? page - 1 : page;
		});
	const changePage = (event: any) => setCurrentPage(Number(event.currentTarget.textContent));

	const getPaginatedData = () => {
		const start = (currentPage - 1) * dataLimit;
		const end = start + dataLimit;
		return data.slice(start, end);
	};
	const getPaginationGroup = () => {
		let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
		return new Array(pageLimit).fill(0).map((_, index) => start + index + 1);
	};

	useEffect(() => {
		animate &&
			setTimeout(() => {
				setAnimate(false);
			}, 500) &&
			window.scrollTo(0, 0);
	}, [animate]);

	useEffect(() => {
		window.resizeTo(width ?? window.innerWidth, height ?? window.innerHeight);
	}, [width, height]);
	useEffect(() => {
		setCurrentPage(startAt ?? 1);
	}, [startAt]);
	const AddBtn = () => (
		<>
			{addBtn && (
				<div className="d-flex flex-row justify-content-center my-2 mx-2 align-self-center">
					<Button text={"Agregar Fila"} type={"success"} outline onClick={addOnClick} />
				</div>
			)}
		</>
	);
	const RmBtn = () => (
		<>
			{rmBtn && currentPage < pageLimit && (
				<div className="d-flex flex-row justify-content-center my-2 mx-2 align-self-center">
					<Button
						text={"Remover Ultima Fila"}
						type={"link"}
						className="text-danger"
						onClick={rmOnClick}
					/>
				</div>
			)}
		</>
	);
	return (
		<div className="d-flex flex-column justify-content-center m-1 align-self-center flex-fill shadow-lg p-3 my-4 bg-body rounded h-auto vw-75 ">
			<div className="d-flex flex-row justify-content-between">
				<h1 className="me-auto">
					{header ?? (
						<>
							{title}
							<strong>{titleStrong}</strong>
						</>
					)}
				</h1>
				<h1>
					{saveBtn && (
						<Button
							text={saveBtnText ?? "Guardar"}
							type={"success"}
							onClick={saveOnClick}
						/>
					)}
				</h1>
			</div>
			{fixedTop && currentPage === 1 && (
				<div className="d-flex flex-row justify-content-center ">
					<div className="me-auto">
						<AddBtn />
					</div>
					<RmBtn />
				</div>
			)}
			<div
				className={`mx-5 mt-3 px-5 animate__animated ${animate ? "animate__fadeIn" : null}`}
			>
				{getPaginatedData().map(
					(Element: any, index: number) =>
						hidePage !== index && (
							<Element key={`Container view for Components ${index}`} />
						),
				)}
			</div>
			{errors && (
				<div
					className={`mx-5 px-5 animate__animated ${animate ? "animate__fadeIn" : null}`}
				>
					<Alert
						name={title ?? `errors alert for current component`}
						show={showErrors}
						errors={errors}
					/>
				</div>
			)}
			{/* show the pagination
				it consists of next and previous buttons
				along with page numbers, in our case, 5 page
				numbers at a time
			*/}
			<div className="d-flex flex-row justify-content-between">
				{!fixedTop && <AddBtn />}
				<nav className="d-flex flex-row justify-content-center my-2 mx-2 align-self-center flex-fill">
					<ul className="pagination mb-2">
						{/* previous button */}
						{currentPage !== 1 && (
							<li className="page-item">
								<button onClick={goToPreviousPage} className="page-link">
									<div className="d-flex flex-row">
										<span aria-hidden="true">&laquo; Atras</span>
										<span></span>
									</div>
								</button>
							</li>
						)}
						{/* show page numbers */}
						{getPaginationGroup().map(
							(item, index) =>
								item - 1 <= pageLimit && (
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

						{currentPage <= pages + 1 && (
							<li
								className={`page-item ${
									currentPage === pageLimit ? "disabled" : ""
								}`}
							>
								<button onClick={goToNextPage} className={`page-link`}>
									<span aria-hidden="true">Siguiente &raquo;</span>
								</button>
							</li>
						)}
					</ul>
				</nav>
				{!fixedTop && <RmBtn />}
			</div>
			<div className="d-flex flex-row justify-content-end">
				<small className="fw-light">
					Previo a realizar el proceso de Guardado/Actualización se validara que no
					existan campos vacios, en caso de existir, estos apareceran abajo de las tablas
					de datos, podrán ser cerrados momentaneamente, despues de 30 segundos
					reaparecerán nuevamente, hasta que se acate la indicación del mensaje.
				</small>
			</div>
		</div>
	);
};
