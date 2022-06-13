/** @format */

import { SaveButton } from "../../components/inputs/saveButton";
import { Container } from "../../components/views/Container";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
	getOC as getState,
	addRow,
	removeRow,
} from "../../features/justipreciacion/obrasComplementariasSlice";
import Calculous from "../../components/justipreciacion/obrasComplementarias/calculous/calculous";
import { DocumentationView } from "../../components/justipreciacion/obrasComplementarias/documentacion/documentation";

export default function ObrasComplementarias() {
	const { documentation } = useAppSelector(getState);
	const dispatch = useAppDispatch();
	const DocView = () =>
		documentation.map((item: any, index: number) => (
			<DocumentationView key={`handle documentation values ${index}`} {...item} id={index} />
		));

	return (
		<>
			<Container
				Title={
					<h1>
						<strong>Calculo:</strong> Obras Complementarias
					</h1>
				}
				Errors={[]}
				showErrors={false}
				fixedTop={false}
				dataLimit={1}
				pageLimit={2}
				hideElement={3}
				data={[DocView, Calculous]}
				startAt={1}
				SaveButton={<SaveButton registro={""} actionClick={() => {}} />}
				width={1200}
				height={1024}
				AddButton={
					<button className=" btn btn-sm btn-success" onClick={() => dispatch(addRow())}>
						Agregar Documento
					</button>
				}
				RemoveButton={
					<>
						{documentation.length > 1 && (
							<button
								className=" btn btn-sm btn-link text-danger"
								onClick={() => dispatch(removeRow())}
							>
								Eliminar Ultimo Documento
							</button>
						)}
					</>
				}
			/>
		</>
	);
}
