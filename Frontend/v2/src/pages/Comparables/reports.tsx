/** @format */
import { records } from "./fakeData";
import { NumerosALetras } from "numero-a-letras";
import { asFancyNumber } from "@utils/number";
import { Page, Text, View, Document, StyleSheet, Image, Link, Font } from "@react-pdf/renderer";
import RegularFont from "@fonts/AktivGroteskEx_Regular.ttf";
import BoldFont from "@fonts/AktivGroteskEx_Bold.ttf";
export const baseUrl = "https://fakeimg.pl/";
const index = 1;
Font.register({
	family: "AktivGroteskEx",
	fonts: [{ src: RegularFont }, { src: BoldFont, fontWeight: "bold" }],
});

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
interface ICellSize {
	[key: string]:
		| "cell"
		| "doubleCell"
		| "tripleCell"
		| "quadrupleCell"
		| "quintupleCell"
		| "sextupleCell"
		| "septupleCell";
}
interface ColumnsProps {
	text: string;
	value: string | number;
	isURL?: boolean;
	textSize?: ICellSize;
	valueSize?: ICellSize;
}
interface SimpleRowProps {
	leftText: string;
	leftValue: string | number;
	leftTextSize?: ICellSize;
	leftValueSize?: ICellSize;
	rightText: string;
	rightValue: string | number;
	rightTextSize?: ICellSize;
	rightValueSize?: ICellSize;
	isLeftURL?: boolean;
	isRightURL?: boolean;
}
interface IServices {
	agua: boolean;
	drenaje: boolean;
	energia_electrica: boolean;
	alumbrado_publico: boolean;
	banqueta: boolean;
	pavimento: boolean;
	telefonia: boolean;
}
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
			<Image src={`${baseUrl}/${imageLeft}`} style={styles.image} />
			<Text style={styles.gap} />
			<Image src={`${baseUrl}/${imageRight}`} style={styles.image} />
		</View>
		<View style={styles.row}>
			<Text style={{ ...styles.septupleCell, ...styles.textCenter }}>{textLeft}</Text>
			<Text style={styles.gap} />
			<Text style={{ ...styles.septupleCell, ...styles.textCenter }}>{textRight}</Text>
		</View>
	</>
);
export const Reports = () => {
	const t = [records[0], records[0], records[0]];
	return (
		<Document>
			<Page size="A4" orientation="portrait" style={styles.page}>
				{t.map(
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
								textLeft="Comparable 1"
								imageRight={imagen_2}
								textRight="Comparable 2"
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
								rightValue={superficie_terreno}
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
								leftValue="#"
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
									{x_utm}
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
									{asFancyNumber(precio_dolar, { isCurrency: true })}
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
									style={{ ...styles.septupleCell, ...styles.borderHorizontal }}
								/>

								<Text style={styles.gap} />
								<Text style={{ ...styles.septupleCell, ...styles.borderTop }} />
							</View>
							<View style={styles.row}>
								<Text
									style={{ ...styles.septupleCell, ...styles.borderHorizontal }}
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
									style={{ ...styles.septupleCell, ...styles.borderHorizontal }}
								>
									{observaciones}
								</Text>
								<Text style={styles.gap} />

								<Text
									style={{ ...styles.septupleCell, ...styles.borderHorizontal }}
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
								imageRight={google_maps}
								textRight="2do. Recorte de Pantalla, Uso de Suelo o Macrolocalización"
							/>
						</View>
					),
				)}
			</Page>
		</Document>
	);
};
