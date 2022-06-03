/** @format */

import { ReactElement, useEffect, useState } from "react";
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
export const Container = (props: {
	Title: ReactElement<any, any> | string;
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
}) => {
	const {
		Title,
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
	} = props;
	const [pages] = useState(Math.round(data.length / dataLimit));

	const [currentPage, setCurrentPage] = useState(startAt);
	const goToNextPage = () => setCurrentPage((page) => (page < pages ? page + 1 : page));

	const goToPreviousPage = () => setCurrentPage((page) => page - 1);
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
		window.resizeTo(width, height);
	}, []);

	return (
		<div className="row m-5 py-4">
			<div className={fixedTop ? "fixed-top mt-3 px-5" : ""}>
				<div className="d-flex flex-row justify-content-between">
					<div className="p-2">
						{typeof Title === "object" && Title}
						{typeof Title === "string" && <h1>{Title}</h1>}
					</div>
					{currentPage === pages && <div className="p-2">{SaveButton}</div>}
				</div>
			</div>

			{showErrors && Errors.length > 0 && (
				<div className="mb-5 mt-3">
					{Errors.map((Element: any, index: number) => (
						<Element key={`Container view for Errors ${index}`} />
					))}
				</div>
			)}
			<div className="container mb-5 mt-5">
				{getPaginatedData().map((Element: any, index: number) => (
					<Element key={`Container view for Data ${index}`} />
				))}
			</div>
			{/* show the pagination
				it consists of next and previous buttons
				along with page numbers, in our case, 5 page
				numbers at a time
			*/}
			<nav className="position-sticky mb-3 mt-5">
				<ul className=" pagination justify-content-center mb-2">
					{/* previous button */}
					{currentPage !== 1 && (
						<li className="page-item">
							<button
								onClick={goToPreviousPage}
								className={`page-link 
				}`}
							>
								<div className="d-flex flex-row">
									<span aria-hidden="true">&laquo; Atras</span>
									<span></span>
								</div>
							</button>
						</li>
					)}

					{/* show page numbers */}
					{getPaginationGroup().map((item, index) => (
						<li
							className={`page-item ${currentPage === item ? "active" : null}`}
							key={index}
						>
							<button onClick={changePage} className={`page-link `}>
								<span>{item}</span>
							</button>
						</li>
					))}

					{/* next button */}
					{currentPage !== pages && (
						<li className={`page-item ${currentPage === pages ? "disabled" : ""}`}>
							<button onClick={goToNextPage} className={`page-link`}>
								<span aria-hidden="true">Siguiente &raquo;</span>
							</button>
						</li>
					)}
				</ul>
			</nav>
		</div>
	);
};
