/** @format */

import MetadatosTemplate from "./template";
export default function Metadatos() {
	return (
		<div className="container max-w-3xl  mx-auto p-1 text-justify odd:bg-gray-100">
			<h2 className="text-2xl font-semibold mb-4">
				1 Identificación del conjunto de datos espaciales o producto
			</h2>

			<div className="grid grid-cols-2 gap-4 ">
				<div className="auto-cols-max">
					<div className="font-medium">
						1.1 Título del conjunto de datos espaciales o producto.
					</div>
					<div className="font-medium">1.2 Propósito.</div>
				</div>

				<div className="auto-cols-max">
					<div>Value 1</div>
					<div>Value 2</div>
				</div>
			</div>

			<div>
				<h2>1 Identificación del conjunto de datos espaciales o producto</h2>
				<table className="table table-condensed">
					<tr>
						<th className="pl-3"></th>
						<td>
							<p className="">[% title %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3"></th>
						<td className="">
							<p className="">[% purpose %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3">
							1.3 Descripción del conjunto de datos espaciales o producto.
						</th>
						<td className="">
							<p className="">[% abstract %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3">
							1.4 Idioma del conjunto de datos espaciales o producto.
						</th>
						<td className="">
							<p className="">[% md_dataidentification_language %]</p>
						</td>
					</tr>
					<tr>
						<th colSpan="2" className="pl-3">
							1.5 Categoría del tema del conjunto de datos espaciales o producto.
						</th>
					</tr>
					<tr>
						<th className="pl-9">
							1.5.1 Tema principal del conjunto de datos espaciales o producto.
						</th>
						<td className="">
							<p className="">[% topiccategory %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-9">
							1.5.2 Grupo de datos del conjunto de datos espaciales o producto.
						</th>
						<td className="">
							<p className="">[% groupcategory %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3">1.6 Palabra clave.</th>
						<td className="">
							<p className="">[% keywords %]</p>
						</td>
					</tr>
					<tr>
						<th className="">1.10 Forma de presentación de los datos espaciales.</th>
						<td className="">
							<p className="">[% presentationform %]</p>
						</td>
					</tr>
					<tr>
						<th colSpan="2" className="">
							1.11 Enlace en línea.
						</th>
					</tr>
					<tr>
						<th className="pl-0">1.11.1 URL del recurso.</th>
						<td className="">
							<p className="">[% ci_onlineresource_linkage %]</p>
						</td>
					</tr>

					<tr>
						<th className="">
							<a href="#" className="toggle-tooltip">
								1.12 Frecuencia de mantenimiento y actualización.
								<span className="tooltip">
									Revisar tambien el punto 9.6 de la Norma Tecnica para la
									elaboracion de Metadatos Geograficos.
								</span>
							</a>
						</th>
						<td className="">
							<p className="">[% maintenanceandupdatefrequency %]</p>
						</td>
					</tr>
					<tr>
						<th className="">1.13 Conjunto de caracteres.</th>
						<td className="">
							<p className="">[% md_dataidentification_characterset %]</p>
						</td>
					</tr>
					<tr>
						<th className="">1.15 Uso específico.</th>
						<td className="">
							<p className="">[% specuse %]</p>
						</td>
					</tr>
				</table>
			</div>
			<div>
				<h2>2 Fechas relacionadas con el conjunto de datos espaciales o producto</h2>
				<table className="table table-condensed">
					<tr>
						<th colSpan="2" className="">
							2.1 Fechas y eventos.
						</th>
					</tr>
					<tr>
						<th className="pl-0">
							2.1.1 Fecha de referencia del conjunto de datos espaciales o producto.
						</th>
						<td className="">
							<p className="">[% datestamp %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-0">2.1.2 Tipo de fecha.</th>
						<td className="">
							<p className="">[% datetype %]</p>
						</td>
					</tr>
					<tr>
						<th colSpan="2" className="">
							2.2 Fechas de los insumos tomados para la elaboración del producto o
							conjunto de datos espaciales.
						</th>
					</tr>
					<tr>
						<th className="pl-0">2.2.1 Fecha de creación de los insumos.</th>
						<td className="">
							<p className="">[% date_creation %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-0">2.2.4 Nombre del Insumo.</th>
						<td className="">
							<p className="">[% inpname %]</p>
						</td>
					</tr>
				</table>
			</div>
			<div>
				<h2>3 Unidad del estado responsable del conjunto de datos espaciales o producto</h2>
				<table className="table table-condensed">
					<tr>
						<th className="">
							<a href="#" className="toggle-tooltip">
								3.1 Nombre de la persona de contacto.
								<span className="tooltip">
									Revisar tambien el punto 9.4.1 de la Norma Tecnica para la
									elaboracion de Metadatos Geograficos.
								</span>
							</a>
						</th>
						<td className="">
							<p className="">[% ci_responsibleparty_individualname %]</p>
						</td>
					</tr>
					<tr>
						<th className="">
							<a href="#" className="toggle-tooltip">
								3.2 Nombre de la organización.
								<span className="tooltip">
									Revisar tambien el punto 9.4.2 de la Norma Tecnica para la
									elaboracion de Metadatos Geograficos.
								</span>
							</a>
						</th>
						<td className="">
							<p className="">[% ci_responsibleparty_organisationname %]</p>
						</td>
					</tr>
					<tr>
						<th className="">
							<a href="#" className="toggle-tooltip">
								3.3 Puesto del contacto.
								<span className="tooltip">
									Revisar tambien el punto 9.4.3 de la Norma Tecnica para la
									elaboracion de Metadatos Geograficos.
								</span>
							</a>
						</th>
						<td className="">
							<p className="">[% ci_responsibleparty_positionname %]</p>
						</td>
					</tr>
					<tr>
						<th className="">
							3.12 Enlace en línea (dirección de Internet de referencia).
						</th>
						<td className="">
							<p className="">[% ci_responsibleparty_linkage %]</p>
						</td>
					</tr>
					<tr>
						<th className="">
							<a href="#" className="toggle-tooltip">
								3.13 Rol.
								<span className="tooltip">
									Revisar tambien el punto 9.4.12 de la Norma Tecnica para la
									elaboracion de Metadatos Geograficos.
								</span>
							</a>
						</th>
						<td className="">
							<p className="">[% ci_responsibleparty_role %]</p>
						</td>
					</tr>
				</table>
			</div>
			<div>
				<h2>
					4 Localización geográfica del conjunto de datos espaciales o producto
					(Representación espacial)
				</h2>
				<table className="table table-condensed">
					<tr>
						<th className="" colSpan="2">
							4.1 Localización geográfica del conjunto de datos espaciales o producto
						</th>
						<td></td>
					</tr>
					<tr>
						<th className="pl-0">4.1.1 Coordenada límite al Oeste</th>
						<td className="">
							<p className="">[% westboundlongitude %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-0">4.1.2 Coordenada límite al Este</th>
						<td className="">
							<p className="">[% eastboundlongitude %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-0">4.1.3 Coordenada límite al Sur</th>
						<td className="">
							<p className="">[% southboundlatitude %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-0">4.1.4 Coordenada límite al Norte</th>
						<td className="">
							<p className="">[% northboundlatitude %]</p>
						</td>
					</tr>
					<tr>
						<th className="">4.2 Tipo de representación espacial</th>
						<td className="">
							<p className="">[% spatialrepresentationtype %]</p>
						</td>
					</tr>
				</table>
			</div>
			<div>
				<h2>5 Sistema de Referencia</h2>
				<table className="table table-condensed">
					<tr>
						<th className="" colSpan="2">
							5.1 Sistema de Referencia Horizontal.
						</th>
					</tr>
					<tr>
						<th className="" colSpan="2">
							5.1.1 Coordenadas Geográficas.
						</th>
					</tr>
					<tr>
						<th className="pl-0">5.1.1.1 Resolución de latitud.</th>
						<td className="">
							<p className="">[% latres %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-0">5.1.1.2 Resolución de longitud.</th>
						<td className="">
							<p className="">[% longres %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-0">5.1.1.3 Unidades de coordenadas geográficas.</th>
						<td className="">
							<p className="">[% geogunit %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-0" colSpan="2">
							5.1.2 Coordenadas Planas.
						</th>
					</tr>
					<tr>
						<th className="pl-0" colSpan="2">
							5.1.2.1 Proyección Cartográfica.
						</th>
					</tr>
					<tr>
						<th className="pl-3">5.1.2.1.1.1 Paralelo estándar.</th>
						<td className="">
							<p className="">[% lambertc_stdparll %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3">
							<a href="#" className="toggle-tooltip">
								5.1.2.1.1.2 Longitud del meridiano central.
								<span className="tooltip">
									Revisar tambien los puntos 5.1.2.1.2.2, 5.1.2.1.3.3,
									5.1.2.1.4.2, 5.1.2.2.1.3 de la Norma Tecnica para la elaboracion
									de Metadatos Geograficos.
								</span>
							</a>
						</th>
						<td className="">
							<p className="">[% lambertc_longcm %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3">
							<a href="#" className="toggle-tooltip">
								5.1.2.1.1.3 Latitud del origen de proyección.
								<span className="tooltip">
									Revisar tambien los puntos 5.1.2.1.2.3, 5.1.2.1.4.3, 5.1.2.2.1.4
									de la Norma Tecnica para la elaboracion de Metadatos
									Geograficos.
								</span>
							</a>
						</th>
						<td className="">
							<p className="">[% mercatort_latprjo %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3">
							<a href="#" className="toggle-tooltip">
								5.1.2.1.1.4 Falso este.
								<span className="tooltip">
									Revisar tambien los puntos 5.1.2.1.2.4, 5.1.2.1.3.4,
									5.1.2.1.4.4, 5.1.2.2.1.5 de la Norma Tecnica para la elaboracion
									de Metadatos Geograficos.
								</span>
							</a>
						</th>
						<td className="">
							<p className="">[% mercator_feast %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3">
							<a href="#" className="toggle-tooltip">
								5.1.2.1.1.5 Falso norte.
								<span className="tooltip">
									Revisar tambien los puntos 5.1.2.1.2.5, 5.1.2.1.3.5,
									5.1.2.1.4.5, 5.1.2.2.1.6 de la Norma Tecnica para la elaboracion
									de Metadatos Geograficos.
								</span>
							</a>
						</th>
						<td className="">
							<p className="">[% mercator_fnorth %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3">
							<a href="#" className="toggle-tooltip">
								5.1.2.1.2.1 Factor de escala en el meridiano central.
								<span className="tooltip">
									Revisar tambien los puntos 5.1.2.1.4.1, 5.1.2.2.1.2 de la Norma
									Tecnica para la elaboracion de Metadatos Geograficos.
								</span>
							</a>
						</th>
						<td className="">
							<p className="">[% mercator_sfec %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-0">5.1.2.2 Sistema de Coordenadas de Cuadrícula.</th>
						<td className="">
							<p className=""></p>
						</td>
					</tr>
					<tr>
						<th className="pl-2" colSpan="2">
							5.1.2.2.1 Universal Transversa de Mercator.
						</th>
					</tr>
					<tr>
						<th className="pl-3">5.1.2.2.1.1 Número de zona UTM.</th>
						<td className="">
							<p className="">[% utm_zone %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-0" colSpan="2">
							5.1.2.3 Plana Local.
						</th>
					</tr>
					<tr>
						<th className="pl-2">5.1.2.3.1 Descripción de la Plana Local.</th>
						<td className="">
							<p className="">[% local_desc %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-2">
							5.1.2.3.2 Información de Georreferencia de la Plana Local.
						</th>
						<td className="">
							<p className="">[% local_geo_inf %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-2" colSpan="2">
							5.1.2.3.4 Información de coordenadas planas.
						</th>
					</tr>
					<tr>
						<th className="pl-3">
							<a href="#" className="toggle-tooltip">
								5.1.2.3.4.1 Método codificado de coordenada plana.
								<span className="tooltip">
									Revisar tambien el punto 5.1.2.3.4.2.1 de la Norma Tecnica para
									la elaboracion de Metadatos Geograficos.
								</span>
							</a>
						</th>
						<td className="">
							<p className="">[% coord_repres %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-4">5.1.2.3.4.2.2.1 Resolución de abscisa.</th>
						<td className="">
							<p className="">[% ordres %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-4">5.1.2.3.4.2.2.2 Resolución de ordenada.</th>
						<td className="">
							<p className="">[% absres %]</p>
						</td>
					</tr>

					<tr>
						<th className="pl-2" colSpan="2">
							5.1.2.4.3 Representación de distancia y rumbo.
						</th>
					</tr>
					<tr>
						<th className="pl-3">5.1.2.4.3.1 Resolución de distancia.</th>
						<td className="">
							<p className="">[% distance_res %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3">5.1.2.4.3.2 Resolución de rumbo.</th>
						<td className="">
							<p className="">[% bearing_res %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3">5.1.2.4.3.3 Unidades de rumbo.</th>
						<td className="">
							<p className="">[% bearing_uni %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3">5.1.2.4.3.4 Dirección del rumbo de referencia.</th>
						<td className="">
							<p className="">[% ref_bearing_dir %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3">5.1.2.4.3.5 Meridiano del rumbo de referencia.</th>
						<td className="">
							<p className="">[% ref_bearing_mer %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3">5.1.2.4.4 Unidades de distancia plana.</th>
						<td className="">
							<p className="">[% plandu %]</p>
						</td>
					</tr>
					<tr>
						<th className="" colSpan="2">
							5.1.3 Coordenadas Locales.
						</th>
					</tr>
					<tr>
						<th className="pl-0">5.1.3.1 Descripción Local.</th>
						<td className="">
							<p className="">[% local_desc %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-0">5.1.3.2 Información de Georreferenciación Local.</th>
						<td className="">
							<p className="">[% local_geo_inf %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-0">5.1.4.1 Nombre del datum horizontal.</th>
						<td className="">
							<p className="">[% horizdn %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-0">5.1.4.2 Nombre del elipsoide.</th>
						<td className="">
							<p className="">[% ellips %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-0">5.1.4.3 Semieje mayor.</th>
						<td className="">
							<p className="">[% semiaxis %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-0" colSpan="2">
							5.1.4.4 Factor de denominador de achatamiento.
						</th>
					</tr>

					<tr>
						<th className="" colSpan="2">
							5.2 Sistema de Referencia Vertical.
						</th>
					</tr>
					<tr>
						<th className="pl-2">5.2.1.1 Nombre del datum de altitud.</th>
						<td className="">
							<p className="">[% altenc %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-2">5.2.1.2 Resolución de altitud.</th>
						<td className="">
							<p className="">[% altres %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-2">5.2.1.3 Unidades de distancia de altitud.</th>
						<td className="">
							<p className="">[% altunits %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-2">5.2.1.4 Método codificado de altitud.</th>
						<td className="">
							<p className="">[% altdatum %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-2">5.2.2.1 Nombre del datum de profundidad.</th>
						<td className="">
							<p className="">[% depthdn %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-2">5.2.2.2 Resolución de profundidad.</th>
						<td className="">
							<p className="">[% depthres %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-2">5.2.2.3 Unidades de distancia de profundidad.</th>
						<td className="">
							<p className="">[% depthdu %]</p>
						</td>
					</tr>
				</table>
			</div>
			<div>
				<h2>6 Calidad de la información</h2>
				<table className="table table-condensed">
					<tr>
						<th className="" colSpan="2">
							6.1 Alcance o ámbito
						</th>
						<td></td>
					</tr>
					<tr>
						<th className="pl-0">6.1.1 Nivel.</th>
						<td className="">
							<p className="">[% level %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-2">
							<a href="#" className="toggle-tooltip">
								6.2.1.1 Nombre del subcriterio de calidad evaluado.
								<span className="tooltip">
									Revisar tambien los puntos 6.2.3.1, 6.2.4.1, 6.2.5.1 de la Norma
									Tecnica para la elaboracion de Metadatos Geograficos.
								</span>
							</a>
						</th>
						<td className="">
							<p className="">[% dq_quantitativeresult %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3">
							<a href="#" className="toggle-tooltip">
								6.2.2.1.1 Nombre de la prueba.
								<span className="tooltip">
									Revisar tambien los puntos 6.2.3.1.1, 6.2.4.1.1, 6.2.5.1.1 de la
									Norma Tecnica para la elaboracion de Metadatos Geograficos.
								</span>
							</a>
						</th>
						<td className="">
							<p className="">[% dq_completeness_nameofmeasure %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-3">
							<a href="#" className="toggle-tooltip">
								6.2.2.1.2 Descripción de la prueba.
								<span className="tooltip">
									Revisar tambien los puntos 6.2.3.1.2, 6.2.4.1.2, 6.2.5.1.2 de la
									Norma Tecnica para la elaboracion de Metadatos Geograficos.
								</span>
							</a>
						</th>
						<td className="">
							<p className="">[% dq_completeness_measuredescription %]</p>
						</td>
					</tr>

					<tr>
						<th className="pl-4" colSpan="2">
							<a href="#" className="toggle-tooltip">
								6.2.2.1.3.1 Resultado cuantitativo.
								<span className="tooltip">
									Revisar tambien los puntos 6.2.3.1.3.1, 6.2.4.1.3.1, 6.2.5.1.3.1
									de la Norma Tecnica para la elaboracion de Metadatos
									Geograficos.
								</span>
							</a>
						</th>
					</tr>
					<tr>
						<th className="pl-5">
							<a href="#" className="toggle-tooltip">
								6.2.2.1.3.1.1 Unidad de valor.
								<span className="tooltip">
									Revisar tambien los puntos 6.2.3.1.3.1.1, 6.2.4.1.3.1.1,
									6.2.5.1.3.1.1 de la Norma Tecnica para la elaboracion de
									Metadatos Geograficos.
								</span>
							</a>
						</th>
						<td className="">
							<p className="">[% positionalaccuracy_valueunit %]</p>
						</td>
					</tr>

					<tr>
						<th className="" colSpan="2">
							6.3 Linaje
						</th>
					</tr>
					<tr>
						<th className="pl-0">6.3.1 Enunciado</th>
						<td className="">
							<p className="">[% statement %]</p>
						</td>
					</tr>

					<tr>
						<th className="pl-0">6.3.2 Pasos del proceso</th>
						<td className="">
							<p className="">[% li_processstep %]</p>
						</td>
					</tr>
					<tr>
						<th className="pl-2">
							<a href="#" className="toggle-tooltip">
								6.3.2.1 Descripción.
								<span className="tooltip">
									Revisar tambien el punto 6.3.3.1 de la Norma Tecnica para la
									elaboracion de Metadatos Geograficos.
								</span>
							</a>
						</th>
					</tr>
					<tr>
						<th className="pl-0">6.3.3 Fuente.</th>
						<td className="">
							<p className="">[% li_source %]</p>
						</td>
					</tr>
				</table>
			</div>
			<div>
				<h2>7 Entidades y Atributos</h2>
				<table className="table table-condensed">
					<tr>
						<th className="">7.1 Descripción general de entidades y atributos.</th>
						<td className="">
							<p className="">[% entity_detail %]</p>
						</td>
					</tr>
					<tr>
						<th className="">7.2 Cita del detalle de entidades y atributos.</th>
						<td className="">
							<p className="">[% graphfilename %]</p>
						</td>
					</tr>
				</table>
			</div>
			<div>
				<h2>8 Distribución</h2>
				<table className="table table-condensed">
					<tr>
						<th className="">8.4.1 Nombre del formato.</th>
						<td className="">
							<p className="">[% md_format %]</p>
						</td>
					</tr>
					<tr>
						<th className="">8.4.2 Versión del formato.</th>
						<td className="">
							<p className="">[% edition %]</p>
						</td>
					</tr>
				</table>
			</div>
			<div>
				<h2>9 Información de metadatos</h2>
				<table className="table table-condensed">
					<tr>
						<th className="">9.1 Nombre del estándar de metadatos.</th>
						<td className="">
							<p className="">[% metadatastandardname %]</p>
						</td>
					</tr>
					<tr>
						<th className="">9.3 Idioma de los Metadatos.</th>
						<td className="">
							<p className="">[% metadatastandardversion %]</p>
						</td>
					</tr>

					<tr>
						<th className="">9.5 Fecha de los metadatos.</th>
						<td className="">
							<p className="">[% date %]</p>
						</td>
					</tr>
				</table>
			</div>
		</div>
	);
}
