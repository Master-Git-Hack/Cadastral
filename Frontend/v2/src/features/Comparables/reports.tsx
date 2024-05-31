/** @format */
import { NumerosALetras } from "@utils/number/numero_a_letras";
import { asFancyNumber } from "@utils/number";
import { Table } from "flowbite-react";
import moment from "moment";
import { Page, Text, View, Document, StyleSheet, Image, Link } from "@react-pdf/renderer";
import "./styles.css";
import html2canvas from "html2canvas-pro";

const currentEnv = import.meta.env.MODE;
const devUrl = import.meta.env.VITE_API_URL_DEV;
const prodUrl = import.meta.env.VITE_API_URL_PROD;
export const baseUrl = currentEnv === "development" ? devUrl : prodUrl;
import { TabView, TabPanel } from "primereact/tabview";

import { ColumnsProps, SimpleRowProps } from "./types";
function capturePage(url) {
	// Specify the URL of the webpage to capture

	// Make a cross-origin request to fetch the webpage content
	fetch(url)
		.then((response) => response.text())
		.then((html) => {
			// Create a temporary div element and insert the fetched HTML content
			const tempDiv = document.createElement("div");
			tempDiv.innerHTML = html;

			// Capture the contents of the temporary div using html2canvas
			html2canvas(tempDiv).then(function (canvas) {
				// Convert the canvas to base64 image data
				const imageData = canvas.toDataURL("image/png");

				// Create a link element
				const link = document.createElement("a");
				link.href = imageData;
				link.download = "captured_page.png";

				// Append the link to the document body and click it programmatically
				document.body.appendChild(link);
				link.click();

				// Clean up: remove the link from the document body
				document.body.removeChild(link);
			});
		})
		.catch((error) => console.error("Error fetching webpage:", error));
}
// export const Reports = ({ as_report, ...props }) =>
// 	!as_report ? <Cedula {...props} /> : <Mercado {...props} />;
import { PDFViewer } from "@react-pdf/renderer";
export const Reports = (props) => (
	<TabView>
		<TabPanel header="Cedula de Mercado">
			<PDFViewer width="100%" height="100%" className="w-full  min-h-screen">
				<Cedula {...props} />
			</PDFViewer>
		</TabPanel>
		<TabPanel header="Mercado">
			<Mercado {...props} />
		</TabPanel>
	</TabView>
);
const styles = StyleSheet.create({
	page: {
		fontFamily: "Helvetica",
		fontWeight: "normal",
		fontStyle: "normal",
		fontSize: 7,
	},
	table: {
		width: "auto",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		border: "1px solid #EEE",
		marginHorizontal: "0.35cm",
		marginVertical: "0.45cm",
	},
	row: {
		display: "flex",
		flexDirection: "row",
		margin: "auto",
	},
	header: {
		fontSize: 14,
		fontWeight: "heavy",
		textTransform: "uppercase",
		padding: "0.1cm",
	},
	cell: {
		width: "1.4cm",
		padding: "0.1cm",
	},
	doubleCell: {
		width: "2.8cm",
		padding: "0.1cm",
	},
	tripleCell: {
		width: "4.2cm",
		padding: "0.1cm",
	},
	quadrupleCell: {
		width: "5.6cm",
		padding: "0.1cm",
	},
	quintupleCell: {
		width: "7cm",
		padding: "0.1cm",
	},
	sextupleCell: {
		width: "8.4cm",
		padding: "0.1cm",
	},
	septupleCell: {
		width: "9.8cm",
		padding: "0.1cm",
	},
	gap: {
		width: "0.7cm",
	},
	ID: {
		fontSize: 18,
		padding: "0.1cm",
		color: "#FFF",
	},
	title: {
		fontFamily: "Helvetica-Bold",
		fontWeight: "bold",
		fontStyle: "italic",
		fontSize: 9,
	},
	textLeft: {
		textAlign: "left",
	},
	textRight: {
		textAlign: "right",
	},
	textCenter: {
		textAlign: "center",
	},
	image: {
		width: "9.8cm",
		padding: "0.1cm",
		height: "6.3cm",
		border: "1px solid #000",
	},
	border: {
		border: "1px solid #000",
	},
	borderLeft: {
		borderLeft: "1px solid #000",
	},
	borderRight: {
		borderRight: "1px solid #000",
	},
	borderBottom: {
		borderBottom: "1px solid #000",
	},
	borderTop: {
		borderTop: "1px solid #000",
	},
	borderHorizontal: {
		borderLeft: "1px solid #000",
		borderRight: "1px solid #000",
	},
	borderVertical: {
		borderTop: "1px solid #000",
		borderBottom: "1px solid #000",
	},
});

const splitText = (text: string, first: boolean = false): string => {
	const words = text.split(" ");
	const half = Math.ceil(words.length / 2);

	if (first) {
		return words.slice(0, half).join(" ");
	}
	return words.slice(half).join(" ");
};
const checkServices = ({
	agua,
	drenaje,
	energia_electrica,
	alumbrado_publico,
	banqueta,
	pavimento,
	telefonia,
}): string => {
	const serviciosCompletos =
		agua &&
		drenaje &&
		energia_electrica &&
		alumbrado_publico &&
		banqueta &&
		pavimento &&
		telefonia;

	if (serviciosCompletos) {
		return "Sí Tiene Completos";
	} else if (
		!agua &&
		!drenaje &&
		!energia_electrica &&
		!alumbrado_publico &&
		!banqueta &&
		pavimento &&
		!telefonia
	) {
		return "No Tiene";
	} else {
		return "Tiene Algunos";
	}
};
const checkDescServices = (kwargs) => {
	const servicios = [
		["agua", "Red de Agua Potable"],
		["drenaje", "Red de Drenaje"],
		["energia_electrica", "Red de Energía Eléctrica"],
		["alumbrado_publico", "Alumbrado Público, Voz y Datos"],
		["pavimento", "Pavimento"],
		["banqueta", "Banquetas"],
	];

	let response = "";
	let current = false;

	servicios.forEach(([key, value], index) => {
		if (index > 0 && index < servicios.length - 1 && current) {
			response += ", ";
		}
		current = kwargs[key] || false;
		if (current) {
			response += value;
		}
	});

	return response;
};
const Columns = ({
	text,
	value,
	isURL = false,
	textSize = "tripleCell",
	valueSize = "quadrupleCell",
}: ColumnsProps) => {
	switch (textSize) {
		case "cell":
			valueSize = "sextupleCell";
			break;
		case "doubleCell":
			valueSize = "quintupleCell";
			break;
		case "tripleCell":
			valueSize = "quadrupleCell";
			break;
		case "quadrupleCell":
			valueSize = "tripleCell";
			break;
		case "quintupleCell":
			valueSize = "doubleCell";
			break;
		case "sextupleCell":
			valueSize = "cell";
			break;
		default:
			break;
	}
	return (
		<>
			<Text
				style={{
					...styles[textSize],
					...styles.title,
					...styles.textRight,
					...styles.borderLeft,
				}}
			>
				{text ? `${text}:` : ""}
			</Text>
			{isURL ? (
				<Link
					src={value}
					style={{
						...styles[valueSize],
						...styles.textLeft,
						...styles.borderRight,
						fontSize: 5,
					}}
				>
					{value}
				</Link>
			) : (
				<Text
					style={{
						...styles[valueSize],
						...styles.textLeft,
						...styles.borderRight,
					}}
				>
					{value}
				</Text>
			)}
		</>
	);
};
const SimpleRow = ({
	leftText,
	leftValue,
	rightText,
	rightValue,
	isLeftURL = false,
	isRightURL = false,
	leftTextSize = "tripleCell",
	leftValueSize = "quadrupleCell",
	rightTextSize = "tripleCell",
	rightValueSize = "quadrupleCell",
}: SimpleRowProps) => (
	<View style={styles.row}>
		<Columns
			text={leftText}
			value={leftValue}
			textSize={leftTextSize}
			valueSize={leftValueSize}
			isURL={isLeftURL}
		/>
		<Text style={styles.gap} />
		<Columns
			text={rightText}
			value={rightValue}
			textSize={rightTextSize}
			valueSize={rightValueSize}
			isURL={isRightURL}
		/>
	</View>
);
const ImageRow = ({ imageLeft, textLeft, imageRight, textRight }) => (
	<>
		<View style={styles.row}>
			<Image src={`${baseUrl}/comparables/image/${imageLeft}/0`} style={styles.image} />
			<Text style={styles.gap} />
			<Image src={`${baseUrl}/comparables/image/${imageRight}/0}`} style={styles.image} />
		</View>
		<View style={styles.row}>
			<Text style={{ ...styles.septupleCell, ...styles.textCenter }}>{textLeft}</Text>
			<Text style={styles.gap} />
			<Text style={{ ...styles.septupleCell, ...styles.textCenter }}>{textRight}</Text>
		</View>
	</>
);
const Cedula = ({ data }) => (
	<Document>
		{data?.map(({ records }, index: number) => (
			<Page size="A4" orientation="portrait" style={styles.page} key={`cedula view ${index}`}>
				{records.map(
					(
						{
							id,
							fecha_captura,
							tipo_inmueble,
							tipo_operacion,
							captura_pantalla,
							imagen_1,
							imagen_2,
							url_fuente,
							nombre_anunciante,
							telefono_anunciante,
							x_utm,
							y_utm,
							tipo_vialidad,
							nombre_vialidad,
							numero_exterior,
							numero_interior,
							edificio,
							entrecalles,
							nombre_asentamiento,
							tipo_asentamiento,
							localidad,
							municipio,
							estado,
							regimen_propiedad,
							tipo_zona,
							uso_suelo_observado,
							uso_suelo_oficial,
							ubicacion_manzana,
							numero_frentes,
							longitud_frente,
							longitud_fondo,
							longitud_frente_tipo,
							forma,
							topografia,
							superficie_terreno,
							superficie_construccion,
							calidad_proyecto,
							estado_conservacion,
							tipo_construccion,
							calidad_construccion,
							edad,
							niveles,
							unidades_rentables,
							descripcion_espacios,
							agua,
							drenaje,
							energia_electrica,
							alumbrado_publico,
							banqueta,
							pavimento,
							telefonia,
							valor_total_mercado,
							valor_renta,
							precio_dolar,
							observaciones,
							usuario,
							fh_modificacion,
							zona_utm,
							google_maps,
							geom,
							vtm_usd = 1,
							tipo,
							registro,
							imagen3,
						},
						idx: number,
					) => (
						<View style={styles.table} key={`${index}-${tipo}-${idx}`}>
							<View style={styles.row}>
								<Text style={styles.header}>Comparables de {tipo}</Text>
							</View>
							<View style={styles.row}>
								<Text
									style={{
										...styles.quadrupleCell,
										...styles.border,
										...styles.ID,
										backgroundColor:
											tipo[0] === "T"
												? "#F87171"
												: tipo[0] === "R"
													? "#A78BFA"
													: "#A7F3D0",
									}}
								>
									{tipo[0]}
									{idx + 1}
								</Text>
								<Text style={styles.tripleCell} />
								<Text style={styles.gap} />
								<Text style={styles.quintupleCell} />
								<Text style={styles.doubleCell}>{registro}</Text>
							</View>
							<View style={{ ...styles.row, height: "0.2cm" }}></View>
							<ImageRow
								imageLeft={imagen_1}
								textLeft={`Comparable ${idx + 1}`}
								imageRight={imagen_2}
								textRight="Microlocalización"
							/>

							<View style={styles.row}>
								<Text
									style={{
										...styles.septupleCell,
										...styles.title,
										...styles.textLeft,
										...styles.borderBottom,
									}}
								>
									Datos de Verificación
								</Text>

								<Text style={styles.gap} />
								<Text
									style={{
										...styles.septupleCell,
										...styles.title,
										...styles.textLeft,
										...styles.borderBottom,
									}}
								>
									Características
								</Text>
							</View>
							<SimpleRow
								leftText="Fecha de Captura"
								leftValue={fecha_captura}
								rightText="Periferia"
								rightValue={tipo_zona}
							/>

							<SimpleRow
								leftText="Tipo de Inmueble"
								leftValue={tipo_inmueble}
								rightText="Zona Económica"
								rightValue={uso_suelo_observado}
							/>

							<SimpleRow
								leftText="Informante"
								leftValue={nombre_anunciante}
								rightText="Uso de Suelo"
								rightValue={uso_suelo_oficial}
							/>
							<SimpleRow
								leftText="Teléfono del Informante"
								leftValue={telefono_anunciante}
								rightText="Entre Calles"
								rightValue={entrecalles}
							/>
							<SimpleRow
								leftText="URL Fuente"
								leftValue={url_fuente}
								isLeftURL
								rightText="Ubicación en la MZA"
								rightValue={ubicacion_manzana}
							/>
							<SimpleRow
								leftText=""
								leftValue=""
								rightText="Superficie"
								rightValue={superficie_terreno}
							/>
							<SimpleRow
								leftText="Tipo de Operación"
								leftValue={tipo_operacion}
								rightText="No. de Frentes"
								rightValue={`${numero_frentes} (${NumerosALetras(numero_frentes).toUpperCase()}${numero_frentes === 1 ? "O" : ""})`}
							/>
							<View style={styles.row}>
								<Text style={{ ...styles.septupleCell, ...styles.borderTop }} />
								<Text style={styles.gap} />
								<Text
									style={{
										...styles.tripleCell,
										...styles.borderLeft,
										...styles.textRight,
									}}
								>
									Frente ML:
								</Text>
								<Text
									style={{
										...styles.cell,
										...styles.textLeft,
									}}
								>
									{longitud_frente}
								</Text>
								<Text style={{ ...styles.doubleCell, ...styles.textRight }}>
									Fondo:
								</Text>
								<Text
									style={{
										...styles.cell,
										...styles.textLeft,
										...styles.borderRight,
									}}
								>
									{longitud_frente}
								</Text>
							</View>
							<View style={styles.row}>
								<Text style={{ ...styles.septupleCell, ...styles.borderBottom }}>
									Ubicación
								</Text>
								<Text style={styles.gap} />
								<Text
									style={{
										...styles.tripleCell,
										...styles.borderLeft,
										...styles.textRight,
									}}
								>
									Frente Tipo:
								</Text>
								<Text
									style={{
										...styles.quadrupleCell,
										...styles.textLeft,
										...styles.borderRight,
									}}
								>
									{longitud_frente_tipo}
								</Text>
							</View>
							<SimpleRow
								leftText="Estado"
								leftValue={estado}
								rightText="Forma"
								rightValue={forma}
							/>
							<SimpleRow
								leftText="Municipio"
								leftValue={municipio}
								rightText="Topografía"
								rightValue={topografia}
							/>
							<SimpleRow
								leftText="Ciudad/Población"
								leftValue={localidad}
								rightText="Servicios"
								rightValue={checkServices({
									agua,
									drenaje,
									energia_electrica,
									alumbrado_publico,
									banqueta,
									pavimento,
									telefonia,
								})}
							/>
							<SimpleRow
								leftText="Colonia/Asentamiento"
								leftValue={`${tipo_asentamiento} ${nombre_asentamiento}`}
								rightText="Régimen de Propiedad"
								rightValue={regimen_propiedad}
							/>
							<View style={styles.row}>
								<Text
									style={{
										...styles.tripleCell,
										...styles.borderLeft,
										...styles.textRight,
									}}
								>
									Nombre de la Vialidad:
								</Text>
								<Text style={{ ...styles.quadrupleCell, ...styles.borderRight }}>
									{tipo_vialidad} {nombre_vialidad}
								</Text>
								<Text style={styles.gap} />
								<Text style={{ ...styles.septupleCell, ...styles.borderTop }} />
							</View>
							<View style={styles.row}>
								<Text
									style={{
										...styles.tripleCell,
										...styles.borderLeft,
										...styles.textRight,
									}}
								>
									No. Exterior:
								</Text>
								<Text style={{ ...styles.cell, ...styles.textLeft }}>
									{numero_exterior}
								</Text>
								<Text style={{ ...styles.doubleCell, ...styles.textRight }}>
									No. Interior:
								</Text>
								<Text style={{ ...styles.cell, ...styles.borderRight }}>
									{numero_interior}
								</Text>
								<Text style={styles.gap} />
								<Text style={{ ...styles.septupleCell, ...styles.borderBottom }}>
									Valores
								</Text>
							</View>
							<SimpleRow
								leftText="Edificio Predio Prototipo"
								leftValue={edificio}
								rightText="Precio"
								rightValue={asFancyNumber(valor_total_mercado, {
									isCurrency: true,
								})}
							/>
							<View style={styles.row}>
								<Text
									style={{
										...styles.tripleCell,
										...styles.borderLeft,
										...styles.textRight,
										...styles.borderBottom,
									}}
								>
									Coordenadas:
								</Text>
								<Text
									style={{
										...styles.cell,

										...styles.textRight,
										...styles.borderBottom,
										fontSize: 6,
									}}
								>
									X:
								</Text>
								<Text
									style={{
										...styles.cell,

										...styles.textLeft,
										...styles.borderBottom,
									}}
								>
									{x_utm}
								</Text>
								<Text
									style={{
										...styles.cell,

										...styles.textRight,
										...styles.borderBottom,
										fontSize: 6,
									}}
								>
									Y:
								</Text>
								<Text
									style={{
										...styles.cell,
										...styles.borderRight,
										...styles.textLeft,
										...styles.borderBottom,
									}}
								>
									{y_utm}
								</Text>
								<Text style={styles.gap} />
								<Text
									style={{
										...styles.tripleCell,
										...styles.borderBottom,
										...styles.borderLeft,
										...styles.textRight,
									}}
								>
									Precio Unitario:
								</Text>
								<Text
									style={{
										...styles.quadrupleCell,
										...styles.borderBottom,
										...styles.borderRight,
										...styles.textLeft,
									}}
								>
									{asFancyNumber(
										(tipo === "RENTA" ? valor_renta : valor_total_mercado) /
											superficie_terreno,
										{ isCurrency: true },
									)}
								</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.septupleCell} />
								<Text style={styles.gap} />
								<Text
									style={{
										...styles.tripleCell,
										...styles.textRight,
										...styles.borderLeft,
									}}
								>
									Precio USD:
								</Text>
								<Text style={{ ...styles.quadrupleCell, ...styles.borderRight }}>
									Precio Unitario USD:
								</Text>
							</View>
							<View style={styles.row}>
								<Text style={{ ...styles.septupleCell, ...styles.borderBottom }}>
									Observaciones
								</Text>
								<Text style={styles.gap} />
								<Text
									style={{
										...styles.tripleCell,
										...styles.textRight,
										...styles.borderLeft,
									}}
								>
									{isNaN(asFancyNumber(precio_dolar, { isCurrency: true }))
										? "$"
										: asFancyNumber(precio_dolar, { isCurrency: true })}
								</Text>
								<Text style={{ ...styles.quadrupleCell, ...styles.borderRight }}>
									{asFancyNumber(
										(tipo === "RENTA" ? valor_renta : valor_total_mercado) /
											superficie_terreno /
											vtm_usd,
										{ isCurrency: true },
									)}
								</Text>
							</View>
							<View style={styles.row}>
								<Text
									style={{
										...styles.septupleCell,
										...styles.borderHorizontal,
									}}
								/>

								<Text style={styles.gap} />
								<Text style={{ ...styles.septupleCell, ...styles.borderTop }} />
							</View>
							<View style={styles.row}>
								<Text
									style={{
										...styles.septupleCell,
										...styles.borderHorizontal,
									}}
								/>
								<Text style={styles.gap} />
								<Text style={{ ...styles.tripleCell, ...styles.borderBottom }}>
									Infraestructura
								</Text>
								<Text style={{ ...styles.quadrupleCell, ...styles.borderBottom }}>
									{checkServices({
										agua,
										drenaje,
										energia_electrica,
										alumbrado_publico,
										banqueta,
										pavimento,
										telefonia,
									})}
								</Text>
							</View>
							<View style={styles.row}>
								<Text
									style={{
										...styles.septupleCell,
										...styles.borderHorizontal,
									}}
								>
									{observaciones}
								</Text>
								<Text style={styles.gap} />

								<Text
									style={{
										...styles.septupleCell,
										...styles.borderHorizontal,
									}}
								>
									{agua && "Red de Agua Potable, "}
									{drenaje && "Red de Drenaje, "}
									{energia_electrica && "Red de Energía Eléctrica, "}
									{alumbrado_publico && "Alumbrado Público, Voz y Datos."}
									{pavimento && "Pavimento, "}
									{banqueta && "Banquetas"}
								</Text>
							</View>
							<View style={styles.row}>
								<Text
									style={{
										...styles.tripleCell,
										...styles.border,
										...styles.textCenter,
									}}
								>
									Elaboró
								</Text>
								<Text
									style={{
										...styles.quadrupleCell,
										...styles.border,
										...styles.textCenter,
									}}
								>
									{usuario}
								</Text>
								<Text style={styles.gap} />
								<Text
									style={{
										...styles.septupleCell,
										...styles.borderHorizontal,
										...styles.borderBottom,
									}}
								/>
							</View>
							<View style={{ ...styles.row, height: "0.2cm" }} />
							<ImageRow
								imageLeft={captura_pantalla}
								textLeft="Recorte De Pantalla"
								imageRight={imagen3}
								textRight="2do. Recorte de Pantalla, Uso de Suelo o Macrolocalización"
							/>
						</View>
					),
				)}
			</Page>
		))}
	</Document>
);

const Mercado = ({ data }) => (
	<div className=" my-5">
		{data?.map(({ tipo, records }, index) => (
			<Table striped hoverable key={`mercado view ${index}`}>
				<Table.Head>
					<Table.HeadCell
						colSpan={57}
						style={{
							backgroundColor:
								tipo === "TERRENO"
									? "#fd0d00"
									: tipo === "RENTA"
										? "#b2a1c7"
										: "#10a870",
						}}
						className={` text-white`}
					>
						{tipo}
					</Table.HeadCell>
				</Table.Head>
				<Table.Head className="text-white text-center ">
					<Table.HeadCell colSpan={7} style={{ backgroundColor: "#ddd9c3" }}>
						Datos de Verificación
					</Table.HeadCell>
					<Table.HeadCell colSpan={10} style={{ backgroundColor: "#b2a1c7" }}>
						Ubicación
					</Table.HeadCell>
					<Table.HeadCell />
					<Table.HeadCell
						colSpan={12}
						className=" text-white"
						style={{ backgroundColor: "#fd0d00" }}
					>
						Características de Terreno
					</Table.HeadCell>
					<Table.HeadCell colSpan={10} style={{ backgroundColor: "#12b050" }}>
						Características de Construcción
					</Table.HeadCell>
					<Table.HeadCell colSpan={2} style={{ backgroundColor: "#ddd9c3" }}>
						Infraestructura
					</Table.HeadCell>
					<Table.HeadCell
						colSpan={6}
						className=" text-white"
						style={{ backgroundColor: "#548dd4" }}
					>
						Valores
					</Table.HeadCell>
					<Table.HeadCell colSpan={4} style={{ backgroundColor: "#d99594" }}>
						Vigencia
					</Table.HeadCell>
				</Table.Head>
				<Table.Head className="text-center">
					<Table.HeadCell>Folio</Table.HeadCell>
					<Table.HeadCell>Tipo de Inmueble</Table.HeadCell>
					<Table.HeadCell>Tipo de Operación</Table.HeadCell>
					<Table.HeadCell>Fecha de Captura</Table.HeadCell>
					<Table.HeadCell className="text-center">URL Fuente</Table.HeadCell>
					<Table.HeadCell>Informante</Table.HeadCell>
					<Table.HeadCell>Teléfono de Informante</Table.HeadCell>
					<Table.HeadCell>Coordenada UTM X</Table.HeadCell>
					<Table.HeadCell>Coordenada UTM Y</Table.HeadCell>
					<Table.HeadCell>Estado</Table.HeadCell>
					<Table.HeadCell>Municipio</Table.HeadCell>
					<Table.HeadCell>Ciudad o Población</Table.HeadCell>
					<Table.HeadCell>Tipo y Nombre de Colonia / Asentamiento</Table.HeadCell>
					<Table.HeadCell>Tipo y Nombre de la Calle</Table.HeadCell>
					<Table.HeadCell>No. Exterior</Table.HeadCell>
					<Table.HeadCell>No. Interior</Table.HeadCell>
					<Table.HeadCell>Nombre Edificio / Proto / Predio</Table.HeadCell>
					<Table.HeadCell>Régimen de Propiedad</Table.HeadCell>
					<Table.HeadCell>Clasificación Periférica</Table.HeadCell>
					<Table.HeadCell>Clasificación Económica de la Zona (Campo)</Table.HeadCell>
					<Table.HeadCell>Uso de Suelo Carta, Uso Plan</Table.HeadCell>
					<Table.HeadCell>Entre Calles</Table.HeadCell>
					<Table.HeadCell>Ubicación en la Manzana</Table.HeadCell>
					<Table.HeadCell>Número de Frentes</Table.HeadCell>
					<Table.HeadCell>Superficie Terreno M2</Table.HeadCell>
					<Table.HeadCell>Frente ML</Table.HeadCell>
					<Table.HeadCell>Frente Tipo ML</Table.HeadCell>
					<Table.HeadCell>Fondo</Table.HeadCell>
					<Table.HeadCell>Forma</Table.HeadCell>
					<Table.HeadCell>Topografía</Table.HeadCell>
					<Table.HeadCell>Superficie Construcción M2</Table.HeadCell>
					<Table.HeadCell>Proyecto</Table.HeadCell>
					<Table.HeadCell>Edo. Conservación</Table.HeadCell>
					<Table.HeadCell>Tipo de Construcción</Table.HeadCell>
					<Table.HeadCell>Calidad</Table.HeadCell>
					<Table.HeadCell>Edad</Table.HeadCell>
					<Table.HeadCell>Niveles</Table.HeadCell>
					<Table.HeadCell>Unidades Rentables</Table.HeadCell>
					<Table.HeadCell>Descripción de Espacios</Table.HeadCell>
					<Table.HeadCell>T / C</Table.HeadCell>
					<Table.HeadCell>Servicios</Table.HeadCell>
					<Table.HeadCell>Descripción de Servicios</Table.HeadCell>
					<Table.HeadCell>Precio</Table.HeadCell>
					<Table.HeadCell>Precio Unitario</Table.HeadCell>
					<Table.HeadCell>Precio Total USD</Table.HeadCell>
					<Table.HeadCell>Precio Unitario USD</Table.HeadCell>
					<Table.HeadCell>Precio Total Aplicable en la Homologación MXN</Table.HeadCell>
					<Table.HeadCell>
						Precio Unitario Aplicable en la Homologación MXN
					</Table.HeadCell>
					<Table.HeadCell>Observaciones</Table.HeadCell>
					<Table.HeadCell>Hoy</Table.HeadCell>
					<Table.HeadCell>Días</Table.HeadCell>
					<Table.HeadCell>Caduca en 6 meses Fecha</Table.HeadCell>
					<Table.HeadCell rowSpan={3} className="text-black 	">
						Elaboró
					</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					{records?.map(
						(
							{
								id,
								fecha_captura,
								tipo_inmueble,
								tipo_operacion,
								url_fuente,
								nombre_anunciante,
								telefono_anunciante,
								x_utm,
								y_utm,
								tipo_vialidad,
								nombre_vialidad,
								numero_exterior,
								numero_interior,
								edificio,
								entrecalles,
								nombre_asentamiento,
								tipo_asentamiento,
								localidad,
								municipio,
								estado,
								regimen_propiedad,
								tipo_zona,
								uso_suelo_observado,
								uso_suelo_oficial,
								ubicacion_manzana,
								numero_frentes,
								longitud_frente,
								longitud_fondo,
								longitud_frente_tipo,
								forma,
								topografia,
								superficie_terreno,
								superficie_construccion,
								calidad_proyecto,
								estado_conservacion,
								tipo_construccion,
								calidad_construccion,
								edad,
								niveles,
								unidades_rentables,
								descripcion_espacios,
								agua,
								drenaje,
								energia_electrica,
								alumbrado_publico,
								banqueta,
								pavimento,
								telefonia,
								valor_total_mercado,
								valor_renta,
								precio_dolar,
								observaciones,
								usuario,
								vtm_usd,
								tipo,
								registro,
							},
							recordIndex,
						) => (
							<Table.Row key={`Record ${tipo} ${index} ${recordIndex} ${id}`}>
								<Table.Cell>{index + recordIndex + 1}</Table.Cell>
								<Table.Cell>{tipo_inmueble}</Table.Cell>
								<Table.Cell>{tipo_operacion}</Table.Cell>
								<Table.Cell>{fecha_captura}</Table.Cell>
								<Table.Cell>
									<a
										href={url_fuente}
										className="link text-blue-600 visited:text-purple-600"
										target="_blank"
									>
										{url_fuente}
									</a>
								</Table.Cell>
								<Table.Cell>{nombre_anunciante}</Table.Cell>
								<Table.Cell>{telefono_anunciante}</Table.Cell>
								<Table.Cell>{x_utm}</Table.Cell>
								<Table.Cell>{y_utm}</Table.Cell>
								<Table.Cell>{estado}</Table.Cell>
								<Table.Cell>{municipio}</Table.Cell>
								<Table.Cell>{localidad}</Table.Cell>
								<Table.Cell>
									{tipo_asentamiento} {nombre_asentamiento}
								</Table.Cell>
								<Table.Cell>
									{tipo_vialidad} {nombre_vialidad}
								</Table.Cell>
								<Table.Cell>{numero_exterior}</Table.Cell>
								<Table.Cell>{numero_interior}</Table.Cell>
								<Table.Cell>{edificio}</Table.Cell>
								<Table.Cell>{regimen_propiedad}</Table.Cell>
								<Table.Cell>{tipo_zona}</Table.Cell>
								<Table.Cell>{uso_suelo_observado}</Table.Cell>
								<Table.Cell>{uso_suelo_oficial}</Table.Cell>
								<Table.Cell>{entrecalles}</Table.Cell>
								<Table.Cell>{ubicacion_manzana}</Table.Cell>
								<Table.Cell>
									{numero_frentes} ({NumerosALetras(numero_frentes).toUpperCase()}
									{numero_frentes === 1 ? "O" : ""})
								</Table.Cell>
								<Table.Cell>{superficie_terreno}</Table.Cell>
								<Table.Cell>{longitud_frente}</Table.Cell>
								<Table.Cell>{longitud_frente_tipo}</Table.Cell>
								<Table.Cell>{longitud_fondo}</Table.Cell>
								<Table.Cell>{forma}</Table.Cell>
								<Table.Cell>{topografia}</Table.Cell>
								<Table.Cell>{superficie_construccion}</Table.Cell>
								<Table.Cell>{calidad_proyecto}</Table.Cell>
								<Table.Cell>{estado_conservacion}</Table.Cell>
								<Table.Cell>{tipo_construccion}</Table.Cell>
								<Table.Cell>{calidad_construccion}</Table.Cell>
								<Table.Cell>{edad}</Table.Cell>
								<Table.Cell>{niveles}</Table.Cell>
								<Table.Cell>{unidades_rentables}</Table.Cell>
								<Table.Cell>{descripcion_espacios}</Table.Cell>
								<Table.Cell>
									{superficie_terreno / superficie_construccion}
								</Table.Cell>
								<Table.Cell>
									{checkServices({
										agua,
										drenaje,
										energia_electrica,
										alumbrado_publico,
										banqueta,
										pavimento,
										telefonia,
									})}
								</Table.Cell>
								<Table.Cell>
									{checkDescServices({
										agua,
										drenaje,
										energia_electrica,
										alumbrado_publico,
										banqueta,
										pavimento,
										telefonia,
									})}
								</Table.Cell>
								<Table.Cell>{valor_total_mercado}</Table.Cell>
								<Table.Cell>{valor_total_mercado / superficie_terreno}</Table.Cell>
								<Table.Cell>{vtm_usd ? vtm_usd : "-"}</Table.Cell>
								<Table.Cell>
									{vtm_usd ? vtm_usd / superficie_terreno : "-"}
								</Table.Cell>
								<Table.Cell>$ -</Table.Cell>
								<Table.Cell>$ -</Table.Cell>
								<Table.Cell>{observaciones}</Table.Cell>
								<Table.Cell>{moment().format("DD [de] MMM [del] YYYY")}</Table.Cell>
								<Table.Cell>
									{moment().diff(
										moment(fecha_captura, "DD [de] MMM [del] YYYY"),
										"days",
									)}
								</Table.Cell>
								<Table.Cell>
									{moment(fecha_captura, "DD [de] MMM [del] YYYY")
										.clone()
										.add(6, "months")
										.format("DD [de] MMM [del] YYYY")
										.toString()}
								</Table.Cell>
								<Table.Cell>{usuario}</Table.Cell>
							</Table.Row>
						),
					)}
				</Table.Body>
			</Table>
		))}
	</div>
);
