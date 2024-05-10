/** @format */
import { NumerosALetras } from "numero-a-letras";
import { Table } from "flowbite-react";
import moment from "moment";
import { Page, Text, View, Document, StyleSheet, Image, Link } from "@react-pdf/renderer";
import "./styles.css";
import axios from "axios";
// import { useGetImageMutation } from "@api/Comparables";
import { useEffect, useState } from "react";
const currentEnv = import.meta.env.MODE;
const devUrl = import.meta.env.VITE_API_URL_DEV;
const prodUrl = import.meta.env.VITE_API_URL_PROD;
export const baseUrl = currentEnv === "development" ? devUrl : prodUrl;
import ls from "@utils/localstorage";
export const Reports = ({ as_report, ...props }) =>
	!as_report ? <Cedula {...props} /> : <Mercado {...props} />;
const styles = StyleSheet.create({
	page: {
		fontSize: 24,
		margin: 10,
		flexDirection: "column",
	},
	table: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 50,
		marginRight: 50,
		marginTop: 150,
		marginBottom: 150,
		border: "1px solid #EEE",
	},
	row: {
		display: "flex",
		flexDirection: "row",
		borderTop: "1px solid #EEE",
		paddingTop: 8,
		paddingBottom: 8,
	},
	header: {
		borderTop: "none",
	},
	bold: {
		fontWeight: "bold",
	},
	// So Declarative and unDRY 👌
	cellA: { width: "1.015%" },
	cellB: { width: "6.8%" },
	cellC: { width: "7.8%" },
	cellD: { width: "6.8%" },
	cellE: { width: "6.8%" },
	cellF: { width: "6.8%" },
	cellG: { width: "6.8%" },
	cellH: { width: "6.8%" },
	cellI: { width: "1.015%" },
	cellJ: { width: "2.03%" },
	cellK: { width: "1.015%" },
	cellL: { width: "6.8%" },
	cellM: { width: "7.8%" },
	cellN: { width: "6.8%" },
	cellO: { width: "6.8%" },
	cellP: { width: "6.8%" },
	cellR: { width: "6.8%" },
	cellS: { width: "6.8%" },
	cell: { width: "1.015%" },
	cellHeader: {
		width: "100%",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 44,
		textTransform: "uppercase",
	},
	//cellID is the sum from cellA to cellE
	cellID: {
		width: "27.2%",

		fontWeight: "bold",
		fontSize: 52,
		color: "white",
	},
	//image width is the sum from cellB to cellH
	image: {
		width: "45.94%",
		height: 500,
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
	cellBC: {
		width: "14.6%",
	},
	cellDH: {
		width: "34%",
	},
	cellDE: {
		width: "13.6%",
	},
	cellGH: {
		width: "13.6%",
	},
	cellKL: {
		width: "14.6%",
	},
	cellMP: {
		width: "13.6%",
	},
	cellLM: {
		width: "13.6%",
	},
	cellOP: {
		width: "13.6%",
	},
	cellMiddle: {
		width: "47.97%",
	},
});
const getImage = async (imageData: string) => {
	const binaryString = atob(imageData);
	const length = binaryString.length;
	const bytes = new Uint8Array(length);

	for (let i = 0; i < length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}

	return bytes.buffer;
};
export const TestPdf = ({ data }) => {
	// const [getImage] = useGetImageMutation();

	const handleImage = async (fileName: string) => {
		// getImage({ fileName }).then((response) => {
		// 	setImages((prev) => ({
		// 		...prev,
		// 		[fileName]: response,
		// 	}));
		// });
		await axios
			.get(`${baseUrl}/comparables/image/${fileName}`, {
				// headers: {
				// 	Authorization: `Bearer ${ls.get("token")}`,
				// },
				responseType: "blob",
			})
			.then((response) => {
				//the response is a blob save the data as url object in a state
				console.log("response", response);
				return URL.createObjectURL(response.data);
				console.log("inside", data);
			});
		// return images[fileName];
		return null;
	};

	return (
		<Document>
			{data?.map(({ records }, index: number) => (
				<Page size="A4" orientation="portrait" wrap dpi={300} style={styles.page}>
					{records?.map(
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
								vtm_usd,
								tipo,
								registro,
							},
							idx: number,
						) => {
							return (
								<View style={styles.table} key={`${index}-${tipo}-${idx}`}>
									<View style={styles.row}>
										<Text style={styles.cellHeader}>Comparables de {tipo}</Text>
									</View>
									<View style={styles.row}>
										<Text style={styles.cellA} />
										<Text style={styles.cellB} />
										<Text style={styles.cellC} />
										<Text style={styles.cellD} />
										<Text style={styles.cellE} />
										<Text style={styles.cellF} />
										<Text style={styles.cellG} />
										<Text style={styles.cellH} />
										<Text style={styles.cellI} />
										<Text style={styles.cellJ} />
										<Text style={styles.cellK} />
										<Text style={styles.cellL} />
										<Text style={styles.cellM} />
										<Text style={styles.cellN} />
										<Text style={styles.cellO} />
										<Text style={styles.cellP} />
										<Text style={styles.cellQ} />
									</View>
									<View style={styles.row}>
										<Text style={styles.cellA} />
										<Text
											style={{
												...styles.cellID,
												backgroundColor:
													tipo[0] === "T"
														? "#F87171"
														: tipo[0] === "R"
															? "#A78BFA"
															: "#A7F3D0",
												color: "#FFFFFF",
											}}
										>
											{tipo[0]}
											{idx + 1}
										</Text>
										<Text style={styles.cellF} />
										<Text style={styles.cellG} />
										<Text style={styles.cellH} />
										<Text style={styles.cellI} />
										<Text style={styles.cellJ} />
										<Text style={styles.cellK} />
										<Text style={styles.cellL} />
										<Text style={styles.cellM} />
										<Text style={styles.cellN} />
										<Text style={{ ...styles.cellO, ...styles.bold }}>
											{registro}
										</Text>
										<Text style={styles.cellP} />
										<Text style={styles.cellQ} />
									</View>
									<View style={styles.row}>
										<Text style={styles.cellA} />
										<Image
											src={`${baseUrl}/comparables/image/${imagen_1}`}
											style={styles.image}
										/>

										<Text style={styles.cellI} />
										<Image
											src={`${baseUrl}/comparables/image/${imagen_2}`}
											style={styles.image}
										/>
										<Text style={styles.cellQ} />
									</View>
									<View style={styles.row}>
										<Text style={styles.cellA} />
										<Text
											style={{ ...styles.cellMiddle, ...styles.textCenter }}
										>
											Comparable 1
										</Text>
										<Text style={styles.cellI} />
										<Text
											style={{ ...styles.cellMiddle, ...styles.textCenter }}
										>
											Microlocalización
										</Text>
										<Text style={styles.cellQ} />
									</View>
									<View style={styles.row}>
										<Text style={styles.cellA} />
										<Text
											style={{
												...styles.cellMiddle,
												...styles.textLeft,
												...styles.bold,
											}}
										>
											Datos de Verificación
										</Text>
										<Text style={styles.cellI} />
										<Text
											style={{
												...styles.cellMiddle,
												...styles.textLeft,
												...styles.bold,
											}}
										>
											Características
										</Text>
										<Text style={styles.cellQ} />
									</View>
									<View style={styles.row}>
										<Text style={styles.cellA} />
										<Text
											style={{
												...styles.cellBC,
												...styles.textRight,
												...styles.bold,
											}}
										>
											Fecha de Captura:
										</Text>
										<Text style={{ ...styles.cellDH, ...styles.textLeft }}>
											{fecha_captura}
										</Text>
										<Text style={styles.cellH} />
										<Text style={styles.cellI} />
										<Text style={styles.cellJ} />
										<Text
											style={{
												...styles.cellKL,
												...styles.textRight,
												...styles.bold,
											}}
										>
											Periferia:
										</Text>
										<Text style={{ ...styles.cellMP, ...styles.textLeft }}>
											{tipo_zona}
										</Text>

										<Text style={styles.cellQ} />
									</View>
								</View>
							);
						},
					)}
				</Page>
			))}
		</Document>
	);
};

const Cedula = ({ data }) => (
	<div id="capture">
		{data?.map(({ records }, index: number) => {
			return (
				<div key={`mercado view ${index}`}>
					{records?.map(
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
								vtm_usd,
								tipo,
								registro,
							},
							idx: number,
						) => (
							<Table key={`${index}-${tipo}-${idx}`}>
								<Table.Head>
									<Table.HeadCell colSpan={17}>
										Comparables de {tipo}
									</Table.HeadCell>
								</Table.Head>
								<Table.Body>
									<Table.Row>
										<Table.Cell
											colSpan={4}
											className={`${
												tipo === "TERRENO"
													? "bg-red-500"
													: tipo === "RENTA"
														? "bg-purple-500"
														: "bg-green-500"
											} text-white`}
										>
											{id}
										</Table.Cell>
										<Table.Cell colSpan={3} />
										<Table.Cell colSpan={5} />
										<Table.Cell colSpan={2}>{registro}</Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell colSpan={17} />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={7}>
											<figure className="max-w-lg">
												<img
													crossOrigin="anonymous"
													className="h-auto max-w-full rounded-lg"
													src={imagen_1}
												/>
												<figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
													Comparable 1
												</figcaption>
											</figure>
										</Table.Cell>
										<Table.Cell />
										<Table.Cell colSpan={7}>
											<figure className="max-w-lg">
												<img
													crossOrigin="use-credentials"
													className="h-auto max-w-full rounded-lg"
													src={imagen_2}
												/>
												<figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
													Microlocalización
												</figcaption>
											</figure>
										</Table.Cell>
										<Table.Cell />
									</Table.Row>

									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={7}>Datos de Verificación</Table.Cell>
										<Table.Cell />
										<Table.Cell colSpan={7}>Características</Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Fecha de captura:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{moment(fecha_captura).format("DD de MM del YYYY")}
										</Table.Cell>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Periferia:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{tipo_zona}
										</Table.Cell>
										<Table.Cell />
									</Table.Row>

									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Tipo de Inmueble:
										</Table.Cell>

										<Table.Cell colSpan={5} className="text-left">
											{tipo_inmueble}
										</Table.Cell>

										<Table.Cell />

										<Table.Cell colSpan={2} className="text-right">
											Zona Económica:
										</Table.Cell>

										<Table.Cell colSpan={5} className="text-left">
											{uso_suelo_observado}
										</Table.Cell>

										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Informante:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{nombre_anunciante}
										</Table.Cell>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Uso de Suelo:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{uso_suelo_oficial}
										</Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Telefono del Informante:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{telefono_anunciante}
										</Table.Cell>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Entre Calles:
										</Table.Cell>
										<Table.Cell>{entrecalles}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											URL Fuente:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{url_fuente}
										</Table.Cell>
										<Table.Cell colSpan={2} className="text-right">
											Ubicación en la MZA:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{ubicacion_manzana}
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Superficie:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{superficie_terreno}
										</Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Tipo de Operación:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{tipo_operacion}
										</Table.Cell>
										<Table.Cell colSpan={2} className="text-right">
											No. de Frentes:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{numero_frentes} ({NumerosALetras(numero_frentes)})
										</Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={7}></Table.Cell>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Frente ML:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{longitud_frente}
										</Table.Cell>
										<Table.Cell />
									</Table.Row>

									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={7} className="text-left">
											Ubicación
										</Table.Cell>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Frente Tipo:
										</Table.Cell>
										<Table.Cell colSpan={2} className="text-left">
											{longitud_frente_tipo}
										</Table.Cell>
										<Table.Cell className="text-right">Fondo:</Table.Cell>
										<Table.Cell colSpan={2} className="text-left">
											{longitud_fondo}
										</Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Estado:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{estado}
										</Table.Cell>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Forma:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{forma}
										</Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Municipio:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{municipio}
										</Table.Cell>
										<Table.Cell colSpan={2} className="text-right">
											Topografía:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{topografia}
										</Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Ciudad/Población:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{localidad}
										</Table.Cell>
										<Table.Cell colSpan={2} className="text-right">
											Servicios:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{agua &&
												drenaje &&
												energia_electrica &&
												alumbrado_publico &&
												banqueta &&
												pavimento &&
												telefonia &&
												"Si Tiene Completos"}
											{!agua &&
											!drenaje &&
											!energia_electrica &&
											!alumbrado_publico &&
											!banqueta &&
											pavimento &&
											!telefonia
												? "No Tiene"
												: "Tiene Algunos"}
										</Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Asentamiento:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{tipo_asentamiento} {nombre_asentamiento}
										</Table.Cell>
										<Table.Cell colSpan={2} className="text-right">
											Régimen de Propiedad:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{regimen_propiedad}
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell colSpan={2} className="text-right">
											Nombre de la Vialidad:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											{tipo_vialidad} {nombre_vialidad}
										</Table.Cell>
										<Table.Cell colSpan={7} className="text-right"></Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											No. Exterior:
										</Table.Cell>
										<Table.Cell colSpan={2} className="text-left">
											{numero_exterior}
										</Table.Cell>
										<Table.Cell className="text-right">
											No. Interior:
										</Table.Cell>
										<Table.Cell colSpan={2} className="text-left">
											{numero_interior}
										</Table.Cell>
										<Table.Cell />
										<Table.Cell colSpan={7} className="text-left">
											Valores:
										</Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Edificio Predio Prototipo:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-left">
											#
										</Table.Cell>
										<Table.Cell colSpan={2} className="text-right">
											Precio:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-right">
											{valor_total_mercado}
										</Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-right">
											Coordenadas:
										</Table.Cell>
										<Table.Cell className="text-right"> X</Table.Cell>
										<Table.Cell className="text-left">{x_utm}</Table.Cell>
										<Table.Cell className="text-right">Y</Table.Cell>
										<Table.Cell className="text-left">{y_utm}</Table.Cell>
										<Table.Cell />
										<Table.Cell colSpan={2} className="text-left">
											Precio Unitario:
										</Table.Cell>
										<Table.Cell colSpan={5} className="text-right">
											{(tipo === "RENTA"
												? valor_renta
												: valor_total_mercado) / superficie_terreno}
										</Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell colSpan={7}></Table.Cell>
										<Table.Cell />
										<Table.Cell colSpan={2}>Precio USD:</Table.Cell>
										<Table.Cell />
										<Table.Cell colSpan={4}>Precio Unitario USD:</Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell colSpan={7} className="text-left">
											Observaciones:
										</Table.Cell>
										<Table.Cell />
										<Table.Cell colSpan={2}>
											{precio_dolar ? precio_dolar : "-"}
										</Table.Cell>
										<Table.Cell colSpan={4}>-</Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell
											colSpan={7}
											className="text-justify"
											rowSpan={3}
										>
											{observaciones}
										</Table.Cell>
										<Table.Cell />
										<Table.Cell colSpan={2}>Infraestructura:</Table.Cell>
										<Table.Cell colSpan={5}>
											{agua &&
												drenaje &&
												energia_electrica &&
												alumbrado_publico &&
												banqueta &&
												pavimento &&
												telefonia &&
												"Si Tiene Completos"}
											{!agua &&
											!drenaje &&
											!energia_electrica &&
											!alumbrado_publico &&
											!banqueta &&
											pavimento &&
											!telefonia
												? "No Tiene"
												: "Tiene Algunos"}
										</Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell />
										<Table.Cell
											colSpan={7}
											className="text-justify"
											rowSpan={2}
										></Table.Cell>
										<Table.Cell />
									</Table.Row>
									<Table.Row></Table.Row>
									<Table.Row>
										<Table.Cell colSpan={7}>
											<img
												src={captura_pantalla}
												crossOrigin="use-credentials"
											/>
										</Table.Cell>

										<Table.Cell />
									</Table.Row>
								</Table.Body>
							</Table>
						),
					)}
				</div>
			);
		})}
	</div>
);

const Mercado = ({ data }) => (
	<div className=" my-5">
		{data?.map(({ tipo, records }, index) => (
			<Table striped key={`mercado view ${index}`}>
				<Table.Head>
					<Table.HeadCell
						colSpan={57}
						className={`${
							tipo === "TERRENO"
								? "bg-red-500"
								: tipo === "RENTA"
									? "bg-purple-500"
									: "bg-green-500"
						} text-white`}
					>
						{tipo}
					</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					<Table.Row className="text-white text-center">
						<Table.Cell colSpan={7} className="bg-amber-400">
							Datos de Verificación
						</Table.Cell>
						<Table.Cell colSpan={10} className="bg-fuchsia-400">
							Ubicación
						</Table.Cell>
						<Table.Cell />
						<Table.Cell colSpan={12} className="bg-yellow-200 text-black">
							Características de Terreno
						</Table.Cell>
						<Table.Cell colSpan={10} className="bg-red-400">
							Características de Construcción
						</Table.Cell>
						<Table.Cell colSpan={2} className="bg-teal-400">
							Infraestructura
						</Table.Cell>
						<Table.Cell colSpan={6} className="bg-orange-200 text-black">
							Valores
						</Table.Cell>
						<Table.Cell colSpan={4} className="bg-indigo-400">
							Vigencia
						</Table.Cell>
						<Table.Cell colSpan={2} className="bg-pink-400" rowSpan={2}>
							Elaboró
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Folio</Table.Cell>
						<Table.Cell>Tipo de Inmueble</Table.Cell>
						<Table.Cell>Tipo de Operación</Table.Cell>
						<Table.Cell>Fecha de Captura</Table.Cell>
						<Table.Cell>URL Fuente</Table.Cell>
						<Table.Cell>Informante</Table.Cell>
						<Table.Cell>Teléfono de Informante</Table.Cell>
						<Table.Cell>Coordenada UTM X</Table.Cell>
						<Table.Cell>Coordenada UTM Y</Table.Cell>
						<Table.Cell>Estado</Table.Cell>
						<Table.Cell>Municipio</Table.Cell>
						<Table.Cell>Ciudad o Población</Table.Cell>
						<Table.Cell>Tipo y Nombre de Colonia / Asentamiento</Table.Cell>
						<Table.Cell>Tipo y Nombre de la Calle</Table.Cell>
						<Table.Cell>No. Exterior</Table.Cell>
						<Table.Cell>No. Interior</Table.Cell>
						<Table.Cell>Nombre Edificio / Proto / Predio</Table.Cell>
						<Table.Cell>Régimen de Propiedad</Table.Cell>
						<Table.Cell>Clasificación Periférica</Table.Cell>
						<Table.Cell>Clasificación Económica de la Zona (Campo)</Table.Cell>
						<Table.Cell>Uso de Suelo Carta, Uso Plan</Table.Cell>
						<Table.Cell>Entre Calles</Table.Cell>
						<Table.Cell>Ubicación en la Manzana</Table.Cell>
						<Table.Cell>Número de Frentes</Table.Cell>
						<Table.Cell>Superficie Terreno M2</Table.Cell>
						<Table.Cell>Frente ML</Table.Cell>
						<Table.Cell>Frente Tipo ML</Table.Cell>
						<Table.Cell>Fondo</Table.Cell>
						<Table.Cell>Forma</Table.Cell>
						<Table.Cell>Topografía</Table.Cell>
						<Table.Cell>Superficie Construcción M2</Table.Cell>
						<Table.Cell>Proyecto</Table.Cell>
						<Table.Cell>Edo. Conservación</Table.Cell>
						<Table.Cell>Tipo de Construcción</Table.Cell>
						<Table.Cell>Calidad</Table.Cell>
						<Table.Cell>Edad</Table.Cell>
						<Table.Cell>Niveles</Table.Cell>
						<Table.Cell>Unidades Rentables</Table.Cell>
						<Table.Cell>Descripción de Espacios</Table.Cell>
						<Table.Cell>T / C</Table.Cell>
						<Table.Cell>Servicios</Table.Cell>
						<Table.Cell>Descripción de Servicios</Table.Cell>
						<Table.Cell>Precio</Table.Cell>
						<Table.Cell>Precio Unitario</Table.Cell>
						<Table.Cell>Precio Total USD</Table.Cell>
						<Table.Cell>Precio Unitario USD</Table.Cell>
						<Table.Cell>Precio Total Aplicable en la Homologación MXN</Table.Cell>
						<Table.Cell>Precio Unitario Aplicable en la Homologación MXN</Table.Cell>
						<Table.Cell>Observaciones</Table.Cell>
						<Table.Cell>Hoy</Table.Cell>
						<Table.Cell>Días</Table.Cell>
						<Table.Cell>Caduca en 6 meses Fecha</Table.Cell>
					</Table.Row>
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
								<Table.Cell>{id}</Table.Cell>
								<Table.Cell>{tipo_inmueble}</Table.Cell>
								<Table.Cell>{tipo_operacion}</Table.Cell>
								<Table.Cell>{fecha_captura}</Table.Cell>
								<Table.Cell>{url_fuente}</Table.Cell>
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
								<Table.Cell>{regimen_propiedad}</Table.Cell>
								<Table.Cell>{tipo_zona}</Table.Cell>
								<Table.Cell>{uso_suelo_observado}</Table.Cell>
								<Table.Cell>{uso_suelo_oficial}</Table.Cell>
								<Table.Cell>{entrecalles}</Table.Cell>
								<Table.Cell>{ubicacion_manzana}</Table.Cell>
								<Table.Cell>
									{numero_frentes} ({NumerosALetras(numero_frentes)})
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
									{agua &&
										drenaje &&
										energia_electrica &&
										alumbrado_publico &&
										banqueta &&
										pavimento &&
										telefonia &&
										"Si Tiene Completos"}
									{!agua &&
									!drenaje &&
									!energia_electrica &&
									!alumbrado_publico &&
									!banqueta &&
									pavimento &&
									!telefonia
										? "No Tiene"
										: "Tiene Algunos"}
								</Table.Cell>
								<Table.Cell>{descripcion_espacios}</Table.Cell>
								<Table.Cell>{valor_total_mercado}</Table.Cell>
								<Table.Cell>
									{(tipo === "RENTA" ? valor_renta : valor_total_mercado) /
										superficie_terreno}
								</Table.Cell>
								<Table.Cell>{precio_dolar ? precio_dolar : "-"}</Table.Cell>
								<Table.Cell>
									{precio_dolar ? precio_dolar / superficie_terreno : "-"}
								</Table.Cell>
								<Table.Cell>{observaciones}</Table.Cell>
								<Table.Cell>{moment().format("DD de MM del YYYY")}</Table.Cell>
								<Table.Cell>{moment().diff(moment(fecha_captura))}</Table.Cell>
								<Table.Cell>
									{moment(fecha_captura).add(6, "M").format("DD de MM del YYYY")}
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
