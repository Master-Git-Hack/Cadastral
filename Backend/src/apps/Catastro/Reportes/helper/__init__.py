from os.path import exists

from jinja2 import Template
from reportlab.lib.pagesizes import A4, letter
from reportlab.pdfgen import canvas

from .....config import Paths
from .....utils.pdf import PDF


def create_pdf(data: dict) -> str:
    """
    Recive the data to work with and render it into a pdf template
    Args:
        data (dictg): parameters and the data to fill into report
    return:
        path (str): path of the file created to send it back
    """
    zoom = data["zoom"]
    page_size = data["pageSize"]
    margins = data["margins"]
    dpi = data["dpi"]
    filename = data["filename"]
    watermark = water_mark() if data["watermark"] else None

    data = render_templates(data["data"])

    pdf = PDF(
        zoom=zoom,
        page_size=page_size,
        margins=margins,
        dpi=dpi,
        templates=data,
        watermark=watermark,
    )

    pdf.render()
    if watermark is not None:
        pdf.watermark_it()
    return pdf.merge(output_file=filename)


def merge_pdf(files: list) -> str:
    """In case of previous request you can merge your files requested using its filename

    Args:
        files (list): list of filenames to merge

    Returns:
        path (str): path of the file merged
    """
    pdf = PDF(files=files)
    return pdf.merge()


def render_templates(data: dict) -> list:
    """Receive the data to fill the template, to return the complete filename created

    Args:
        data (dict): data needed for the template.

    Returns:
        list of filenames (list[str]): a list of filenames just created with the data send it.
    """
    template = Template(
        open(
            f"{Paths.templates}/avaluo_catastral_template.html", encoding="UTF-8"
        ).read()
    )

    payload = []
    for item in data:
        filename = f"{Paths.tmp}/{item['registro']}"
        print(filename)
        with open(f"{filename}.html", "w", encoding="UTF-8") as file:
            file.write(
                template.render(
                    ID=item["id"],
                    SOLICITANTE=item["solicitante"].upper(),
                    SECRETARIA=item["secretaria"].upper(),
                    OFICIO_DE_SOLICITUD=item["oficio_solicitud"],
                    FECHA_DE_SOLICITUD=item["fecha_solicitud"],
                    ADQUIRIENTE=item["adquiriente"],
                    OBJETIVO_DEL_AVALUO=item["objetivo_avaluo"],
                    PROPOSITO_DEL_AVALUO=item["proposito_avaluo"],
                    INMUEBLE_QUE_SE_AVALUA=item["inmueble_valua"],
                    ZONA_UTM=item["zona_utm"],
                    CALLE=item["calle"],
                    NUMERO=item["numero"],
                    COLONIA_O_POBLACION=item["colonia_poblacion"],
                    MUNICIPIO=item["nombre_utf"].upper(),
                    COORDENADAS_EN_X=item["x_utm"],
                    COORDENADAS_EN_Y=item["y_utm"],
                    TENIENTE=item["teniente"].upper(),
                    PROPIETARIO=item["propietario"],
                    CUENTA_PREDIAL=item["cuenta_predial"],
                    CUC=item["cuc"],
                    CLASIFICACION_DE_ZONA=item["clasificacion_zona"],
                    USO_DOMINANTE=item["uso_dominante"],
                    TIPO_DE_CONSTRUCCION_DOMINANTE=item["tipo_constr_dominante"],
                    AGUA=item["agua"],
                    DRENAJE=item["drenaje"],
                    ENERGIA_ELECTRICA=item["energia_electrica"],
                    TELEFONIA=item["telefonia"],
                    PAVIMENTO=item["tipo_pavimento"],
                    ALUMBRADO_PUBLICO=item["alumbrado_publico"],
                    BANQUETA=item["banqueta"],
                    CNA_EDAD=item["cna_edad"],
                    CNB_EDAD=item["cnb_edad"],
                    CNC_EDAD=item["cnc_edad"],
                    CND_EDAD=item["cnd_edad"],
                    CNE_EDAD=item["cne_edad"],
                    INDICE_DE_SATURACION=item["indice_saturacion"],
                    TOPOGRAFIA=item["topografia"],
                    MEDIDAS_Y_COLINDANCIAS=item["myc_segun"],
                    MUROS=item["muros"],
                    CARPINTERIA=item["carpinteria"],
                    ESTRUCTURA=item["estructura"],
                    INSTALACION_ELECTRICA=item["inst_electrica"],
                    ORIENTACION1=item["col1"],
                    MEDIDAS_ORIENTACION1=item["med1"],
                    ENTREPISOS=item["entrepisos"],
                    INSTALACION_SANITARIA=item["inst_sanitaria"],
                    ORIENTACION2=item["col2"],
                    MEDIDAS_ORIENTACION2=item["med2"],
                    TECHOS=item["techos"],
                    ACCESORIOS=item["inst_especial"],
                    ORIENTACION3=item["col3"],
                    MEDIDAS_ORIENTACION3=item["med3"],
                    PISOS=item["pisos"],
                    ACABADO_EXTERIOR=item["acabado_exterior"],
                    ORIENTACION4=item["col4"],
                    MEDIDAS_ORIENTACION4=item["med4"],
                    PUERTAS=item["puertas"],
                    ACABADO_INTERIOR=item["acabado_interior"],
                    ORIENTACION5=item["col5"],
                    MEDIDAS_ORIENTACION5=item["med5"],
                    VENTANAS=item["ventanas"],
                    MUEBLES_SANITARIOS=item["muebles_sanitarios"],
                    ORIENTACION6=item["col6"],
                    MEDIDAS_ORIENTACION6=item["med6"],
                    SUPERFICIE_TERRENO1=item["sp1_superficie"],
                    VALOR_UNITARIO_TERRENO1=item["sp1_vu"],
                    FACTOR_TERRENO1=item["sp1_factor"],
                    VALOR_PARCIAL_TERRENO1=item["sp1_valor_parcial"],
                    CNA_TIPO=item["cna_tipo"],
                    CNA_SUPERFICIE=item["cna_superficie"],
                    CNA_VALOR_UNITARIO=item["cna_vu"],
                    CNA_VALOR_PARCIAL=item["cna_valor_parcial"],
                    SUPERFICIE_TERRENO2=item["sp2_superficie"],
                    VALOR_UNITARIO_TERRENO2=item["sp2_vu"],
                    FACTOR_TERRENO2=item["sp2_factor"],
                    VALOR_PARCIAL_TERRENO2=item["sp2_valor_parcial"],
                    CNB_TIPO=item["cnb_tipo"],
                    CNB_SUPERFICIE=item["cnb_superficie"],
                    CNB_VALOR_UNITARIO=item["cnb_vu"],
                    CNB_VALOR_PARCIAL=item["cnb_valor_parcial"],
                    SUPERFICIE_TERRENO3=item["sp3_superficie"],
                    VALOR_UNITARIO_TERRENO3=item["sp3_vu"],
                    FACTOR_TERRENO3=item["sp3_factor"],
                    VALOR_PARCIAL_TERRENO3=item["sp3_valor_parcial"],
                    CNC_TIPO=item["cnc_tipo"],
                    CNC_SUPERFICIE=item["cnc_superficie"],
                    CNC_VALOR_UNITARIO=item["cnc_vu"],
                    CNC_VALOR_PARCIAL=item["cnc_valor_parcial"],
                    SUPERFICIE_TERRENO4=item["sp4_superficie"],
                    VALOR_UNITARIO_TERRENO4=item["sp4_vu"],
                    FACTOR_TERRENO4=item["sp4_factor"],
                    VALOR_PARCIAL_TERRENO4=item["sp4_valor_parcial"],
                    CND_TIPO=item["cnd_tipo"],
                    CND_SUPERFICIE=item["cnd_superficie"],
                    CND_VALOR_UNITARIO=item["cnd_vu"],
                    CND_VALOR_PARCIAL=item["cnd_valor_parcial"],
                    INCREMENTO_ESQUINA_SUPERFICIE=item["incr_esq_superficie"],
                    INCREMENTO_ESQUINA_VALOR_UNITARIO=item["incr_esq_vu"],
                    INCREMENTO_ESQUINA_FACTOR=item["incr_esq_factor"],
                    INCREMENTO_ESQUINA_VALOR_PARCIAL=item["incr_esq_valor_parcial"],
                    SUPERFICIE_TOTAL_TERRENO=item["sup_total_terreno"],
                    VALOR_TOTAL_TERRENO=item["valor_total_terreno"],
                    SUPERFICIE_TOTAL_CONSTRUCCION=item["sup_total_construccion"],
                    VALOR_TOTAL_CONSTRUCCION=item["valor_total_construccion"],
                    REGISTRO=item["registro"],
                    VALOR_TOTAL_CATASTRAL=item["vt_catastral"],
                    CROQUIS=item["croquis"],
                    IMAGEN_SATELITAL=item["foto"],
                    DOMICILIO_GEOGRAFICO=item["domicilio_geografico"],
                    OBSERVACIONES=item["observaciones"],
                    FECHA_EMISION=item["fecha_emision"],
                    USUARIO=item["usuario"],
                )
            )
        payload.append(filename)
    return payload


def water_mark() -> str:
    """Checks if exists a watermark template in case it be needed,
    if exists returns its path, otherwise creates a newone and return it.

    Returns:
        path (str): return the path of the watermark to use.
    """
    watermark = f"{Paths.templates}/watermark.pdf"
    if exists(watermark):
        return watermark
    else:
        gto_logo = f"{Paths.images}/logo.png"
        gl_logo = f"{Paths.images}/gl.png"
        secretary_information = f"{Paths.images}/Sec.png"
        board = canvas.Canvas(filename=watermark, pagesize=A4)
        # draw images into the board
        board.drawImage(gto_logo, 0, 779, width=150, height=60, mask="auto")
        board.drawImage(gl_logo, 532, 779, width=60, height=60, mask="auto")
        board.drawImage(
            secretary_information, 0.5, 0.5, width=200, height=30, mask="auto"
        )
        # save the board as watermark to work with in the future an reduce the time of the process
        board.save()
        return watermark
