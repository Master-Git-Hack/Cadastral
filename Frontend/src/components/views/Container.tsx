/** @format */
import { forwardRef, ReactElement, useEffect, useState } from "react";

/** 
 * @description Container component
 * @param {ReactElement | string} Title - Title of the container
 * @params {number} dataLimit - The number of elements to show in the container
 * @params {number} pageLimit - The number of elements to show in the pagination
 * @params {ReactElement} data - The elements to show in the container
 * @params {ReactElement} SaveButton - The button to save or update the data
 * @params {ReactElement} Errors - The errors to show in the container
 * @params {boolean} showErrors - Show the errors or not
 * @params {boolean} fixedTop - Fix the title and save button to the top of the page
 * @returns {React.ReactNode}
 * @Example <Container
				Title={<h1><strong>Titulo: </strong> Acción</h1>|"title"}
				dataLimit={1}
				pageLimit={4}
				data={[Element, Element]}
				SaveButton={<SaveButton/>}
				Errors={[Error, Error]}
				showErrors={false}
				fixedTop={false}
				width={1200};
				height=-{1024};
			/>
*/
const CustomResizeHandle = forwardRef((props: any, ref) => {
	const { handleAxis, ...restProps } = props;
	return (
		<div
			className={`custom-handle custom-handle-${handleAxis} custom-resize-handle-component`}
			ref={ref}
			{...restProps}
		></div>
	);
});
export const Container = (props: {
	Title: string;
	titleStrong: string;
	Errors: Array<any>;
	startAt: number;
	showErrors: boolean;
	dataLimit: number;
	data: Array<any>;
	pageLimit: number;
	SaveButton: ReactElement<any, any>;
	fixedTop: boolean;
	width: number;
	height: number;
	hideElement?: number;
	AddButton?: ReactElement<any, any>;
	RemoveButton?: ReactElement<any, any>;
}) => {
	const [animate, setAnimate] = useState(false);
	const {
		Title,
		titleStrong,
		dataLimit,
		data,
		startAt,
		pageLimit,
		SaveButton,
		Errors,
		showErrors,
		fixedTop,
		width,
		height,
		hideElement,
		AddButton,
		RemoveButton,
	} = props;
	const [pages] = useState(Math.round(data.length / dataLimit));
	const [currentPage, setCurrentPage] = useState(startAt);
	const goToNextPage = () => {
		setCurrentPage((page) => {
			setAnimate(true);
			return page + 1 <= pageLimit ? page + 1 : page;
		});
	};

	const goToPreviousPage = () =>
		setCurrentPage((page) => {
			setAnimate(true);
			return page > 0 ? page - 1 : page;
		});
	const changePage = (event: any) => setCurrentPage(Number(event.target.textContent));

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
			}, 500);
	}, [animate]);

	useEffect(() => {
		window.resizeTo(width, height);
	}, []);

	useEffect(() => {
		setCurrentPage(startAt);
	}, [startAt]);

	return (
		<div className="d-flex flex-column justify-content-center m-1 align-self-center flex-fill shadow-lg p-3 my-4 bg-body rounded h-auto vw-75 ">
			<div className={fixedTop ? "fixed-top mt-3 px-5" : ""}>
				<div className="clearfix">
					<div
						className={`${
							currentPage >= pages - 2
								? "float-start"
								: "d-flex justify-content-center"
						}`}
					>
						<h1>
							{`${Title} `}
							<strong>{` ${titleStrong}`}</strong>
						</h1>
					</div>
					{currentPage >= pages - 2 && <div className="float-end">{SaveButton}</div>}
				</div>
			</div>
			<div className={`mx-5 px-5 animate__animated ${animate ? "animate__fadeIn" : null}`}>
				{getPaginatedData().map(
					(Element: any, index: number) =>
						hideElement !== index && (
							<Element key={`Container view for Components ${index}`} />
						),
				)}
			</div>
			{showErrors && Errors.length > 0 && (
				<div
					className={`mx-5 px-5 animate__animated ${animate ? "animate__fadeIn" : null}`}
				>
					{Errors.map((Element: any, index: number) => Element)}
				</div>
			)}
			{/* show the pagination
				it consists of next and previous buttons
				along with page numbers, in our case, 5 page
				numbers at a time
			*/}
			<div className="d-flex flex-row justify-content-between">
				{currentPage === 1 && (
					<div className="d-flex flex-row justify-content-center my-2 mx-2 align-self-center">
						{AddButton}
					</div>
				)}
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
				{currentPage === 1 && (
					<div className="d-flex flex-row justify-content-center my-2 mx-2 align-self-center">
						{RemoveButton}
					</div>
				)}
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
