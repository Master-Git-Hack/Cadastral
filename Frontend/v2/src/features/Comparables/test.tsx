/** @format */
import "./styles.css";
import { NumerosALetras } from "numero-a-letras";
import { Table } from "flowbite-react";
import moment from "moment";
export const Component = ({ data }) => (
	<div id="capture" className="w-full h-full">
		{data?.map(({ records }, index: number) => (
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
						<Table striped className="h-full w-full overflow-hidden">
							<Table.Head>
								<Table.HeadCell
									colSpan={17}
									className="text-center text-xl subpixel-antialiased"
								>
									Comparables de {tipo}
								</Table.HeadCell>
							</Table.Head>
						</Table>
					),
				)}
			</div>
		))}
	</div>
);
export default Component;
