/** @format */

import { Table } from "flowbite-react";
export const Reports = ({ as_report, ...props }) =>
	as_report ? <Cedula {...props} /> : <Mercado {...props} />;
const Cedula = ({ data }) => (
	<div className="overflow-y-auto m-5">
		{data?.map(({ records }, index: number) => (
			<div key={`mercado view ${index}`} className="my-2">
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
							vtm_usd,
							geom,
							tipo,
							registro,
						},
						idx: number,
					) => (
						<Table key={`${index}-${tipo}-${idx}`}>
							<Table.Head>
								<Table.HeadCell colSpan={17}>Comparables de {tipo}</Table.HeadCell>
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
										{fecha_captura}
									</Table.Cell>
									<Table.Cell />
									<Table.Cell colSpan={2} className="text-right">
										Pariferia:
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
										{zona_economica}
									</Table.Cell>

									<Table.Cell />
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2} className="text-right">
										Informante:
									</Table.Cell>
									<Table.Cell colSpan={5} className="text-left">
										{nombre_anunciante}
									</Table.Cell>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2} className="text-right">
										Uso de Suelo:
									</Table.Cell>
									<Table.Cell colSpan={5} className="text-left">
										{" "}
										{uso_suelo}
									</Table.Cell>
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2} className="text-right">
										Telefono del Informante:
									</Table.Cell>
									<Table.Cell colSpan={5} className="text-left">
										{telefono_anunciante}
									</Table.Cell>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2} className="text-right">
										Entre Calles:
									</Table.Cell>
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
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
										{ubicacion_mza}
									</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2} className="text-right">
										Superficie:
									</Table.Cell>
									<Table.Cell colSpan={5} className="text-left">
										{superficie}
									</Table.Cell>
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
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
										{no_frentes}
									</Table.Cell>
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell />
									<Table.Cell colSpan={7}></Table.Cell>
									<Table.Cell />
									<Table.Cell colSpan={2} className="text-right">
										Frente ML:
									</Table.Cell>
									<Table.Cell colSpan={5} className="text-left">
										{frente_ml}
									</Table.Cell>
									<Table.Cell />
								</Table.Row>

								<Table.Row>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={7} className="text-left">
										Ubicación
									</Table.Cell>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2} className="text-right">
										Frente Tipo:
									</Table.Cell>
									<Table.Cell colSpan={2} className="text-left">
										{frente_tipo}
									</Table.Cell>
									<Table.Cell className="text-right">Fondo:</Table.Cell>
									<Table.Cell colSpan={2} className="text-left">
										{fondo}
									</Table.Cell>
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2} className="text-right">
										Estado:
									</Table.Cell>
									<Table.Cell colSpan={5} className="text-left">
										{estado}
									</Table.Cell>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2} className="text-right">
										Forma:
									</Table.Cell>
									<Table.Cell colSpan={5} className="text-left">
										{forma}
									</Table.Cell>
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
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
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2} className="text-right">
										Ciudad/Población:
									</Table.Cell>
									<Table.Cell colSpan={5} className="text-left">
										{ciudad}
									</Table.Cell>
									<Table.Cell colSpan={2} className="text-right">
										Servicios:
									</Table.Cell>
									<Table.Cell colSpan={5} className="text-left">
										{servicios}
									</Table.Cell>
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2} className="text-right">
										Asentamiento:
									</Table.Cell>
									<Table.Cell colSpan={5} className="text-left">
										{asentamiento}
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
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2} className="text-right">
										No. Exterior:
									</Table.Cell>
									<Table.Cell colSpan={2} className="text-left">
										{no_exterior}
									</Table.Cell>
									<Table.Cell className="text-right">No. Interior:</Table.Cell>
									<Table.Cell colSpan={2} className="text-left">
										{no_interior}
									</Table.Cell>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={7} className="text-left">
										Valores:
									</Table.Cell>
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2} className="text-right">
										Edificio Predio Prototipo:
									</Table.Cell>
									<Table.Cell colSpan={5} className="text-left">
										{edificio_predio_prototipo}
									</Table.Cell>
									<Table.Cell colSpan={2} className="text-right">
										Precio:
									</Table.Cell>
									<Table.Cell colSpan={5} className="text-right">
										{precio}
									</Table.Cell>
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2} className="text-right">
										Coordenadas:
									</Table.Cell>
									<Table.Cell className="text-right"> X</Table.Cell>
									<Table.Cell className="text-left">{x_utm}</Table.Cell>
									<Table.Cell className="text-right">Y</Table.Cell>
									<Table.Cell className="text-left">{y_utm}</Table.Cell>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2} className="text-left">
										Precio Unitario:
									</Table.Cell>
									<Table.Cell colSpan={5} className="text-right">
										{precio_unitario}
									</Table.Cell>
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell colSpan={7}></Table.Cell>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2}>Precio USD:</Table.Cell>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={4}>Precio Unitario USD:</Table.Cell>
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={7} className="text-left">
										Observaciones:
									</Table.Cell>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2}>{precio_usd}</Table.Cell>
									<Table.Cell colSpan={4}>{precio_unitario_usd}</Table.Cell>
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={7} className="text-justify" rowSpan={3}>
										{observaciones}
									</Table.Cell>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={2}>Infraestructura:</Table.Cell>
									<Table.Cell colSpan={5}>{infraestructura}</Table.Cell>
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
									<Table.Cell colSpan={7} className="text-justify" rowSpan={3}>
										{observaciones}
									</Table.Cell>
									<Table.Cell colSpan={2}>Infraestructura</Table.Cell>
									<Table.Cell colSpan={5}>{infraestructura}</Table.Cell>
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell></Table.Cell>
									<Table.Cell></Table.Cell>
									<Table.Cell
										colSpan={7}
										className="text-justify"
										rowSpan={2}
									></Table.Cell>
									<Table.Cell></Table.Cell>
								</Table.Row>
								<Table.Row></Table.Row>
								<Table.Row>
									<Table.Cell colSpan={7}>
										<img src={captura_pantalla} />
									</Table.Cell>

									<Table.Cell></Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
					),
				)}
			</div>
		))}
	</div>
);

const Mercado = ({ data }) => (
	<div className="overflow-x-auto my-5">
		{data?.map(({ tipo, records }, index) => (
			<div key={`mercado view ${index}`} className="my-2">
				<Table striped>
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
							<Table.Cell>
								Precio Unitario Aplicable en la Homologación MXN
							</Table.Cell>
							<Table.Cell>Observaciones</Table.Cell>
							<Table.Cell>Hoy</Table.Cell>
							<Table.Cell>Días</Table.Cell>
							<Table.Cell>Caduca en 6 meses Fecha</Table.Cell>
						</Table.Row>
						{records?.map(
							(
								{
									folio,
									tipo_inmueble,
									tipo_operacion,
									fecha_captura,
									url_fuente,
									informante,
									telefono_informante,
									coordenadas_utm_x,
									coordenadas_utm_y,
									estado,
									municipio,
									ciudad,
									colonia,
									calle,
									no_exterior,
									no_interior,
									nombre_edificio,
									regimen_propiedad,
									clasificacion_periferica,
									clasificacion_economica,
									uso_suelo,
									entre_calles,
									ubicacion_manzana,
									numero_frentes,
									superficie_terreno,
									frente,
									frente_tipo,
									fondo,
									forma,
									topografia,
									superficie_construccion,
									proyecto,
									edo_conservacion,
									tipo_construccion,
									calidad,
									edad,
									niveles,
									unidades_rentables,
									descripcion_espacios,
									t_c,
									servicios,
									descripcion_servicios,
									precio,
									precio_unitario,
									precio_total_usd,
									precio_unitario_usd,
									precio_total_aplicable,
									precio_unitario_aplicable,
									observaciones,
									hoy,
									dias,
									caduca_meses,
									elaboro,
								},
								recordIndex,
							) => (
								<Table.Row key={`Record ${tipo} ${index} ${recordIndex}`}>
									<Table.Cell>{folio}</Table.Cell>
									<Table.Cell>{tipo_inmueble}</Table.Cell>
									<Table.Cell>{tipo_operacion}</Table.Cell>
									<Table.Cell>{fecha_captura}</Table.Cell>
									<Table.Cell>{url_fuente}</Table.Cell>
									<Table.Cell>{informante}</Table.Cell>
									<Table.Cell>{telefono_informante}</Table.Cell>
									<Table.Cell>{coordenadas_utm_x}</Table.Cell>
									<Table.Cell>{coordenadas_utm_y}</Table.Cell>
									<Table.Cell>{estado}</Table.Cell>
									<Table.Cell>{municipio}</Table.Cell>
									<Table.Cell>{ciudad}</Table.Cell>
									<Table.Cell>{colonia}</Table.Cell>
									<Table.Cell>{calle}</Table.Cell>
									<Table.Cell>{no_exterior}</Table.Cell>
									<Table.Cell>{no_interior}</Table.Cell>
									<Table.Cell>{nombre_edificio}</Table.Cell>
									<Table.Cell>{regimen_propiedad}</Table.Cell>
									<Table.Cell>{clasificacion_periferica}</Table.Cell>
									<Table.Cell>{clasificacion_economica}</Table.Cell>
									<Table.Cell>{uso_suelo}</Table.Cell>
									<Table.Cell>{entre_calles}</Table.Cell>
									<Table.Cell>{ubicacion_manzana}</Table.Cell>
									<Table.Cell>{numero_frentes}</Table.Cell>
									<Table.Cell>{superficie_terreno}</Table.Cell>
									<Table.Cell>{frente}</Table.Cell>
									<Table.Cell>{frente_tipo}</Table.Cell>
									<Table.Cell>{fondo}</Table.Cell>
									<Table.Cell>{forma}</Table.Cell>
									<Table.Cell>{topografia}</Table.Cell>
									<Table.Cell>{superficie_construccion}</Table.Cell>
									<Table.Cell>{proyecto}</Table.Cell>
									<Table.Cell>{edo_conservacion}</Table.Cell>
									<Table.Cell>{tipo_construccion}</Table.Cell>
									<Table.Cell>{calidad}</Table.Cell>
									<Table.Cell>{edad}</Table.Cell>
									<Table.Cell>{niveles}</Table.Cell>
									<Table.Cell>{unidades_rentables}</Table.Cell>
									<Table.Cell>{descripcion_espacios}</Table.Cell>
									<Table.Cell>{t_c}</Table.Cell>
									<Table.Cell>{servicios}</Table.Cell>
									<Table.Cell>{descripcion_servicios}</Table.Cell>
									<Table.Cell>{precio}</Table.Cell>
									<Table.Cell>{precio_unitario}</Table.Cell>
									<Table.Cell>{precio_total_usd}</Table.Cell>
									<Table.Cell>{precio_unitario_usd}</Table.Cell>
									<Table.Cell>{precio_total_aplicable}</Table.Cell>
									<Table.Cell>{precio_unitario_aplicable}</Table.Cell>
									<Table.Cell>{observaciones}</Table.Cell>
									<Table.Cell>{hoy}</Table.Cell>
									<Table.Cell>{dias}</Table.Cell>
									<Table.Cell>{caduca_meses}</Table.Cell>
									<Table.Cell>{elaboro}</Table.Cell>
								</Table.Row>
							),
						)}
					</Table.Body>
				</Table>
			</div>
		))}
	</div>
);
