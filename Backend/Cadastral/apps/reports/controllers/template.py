from reportlab.lib.pagesizes import letter, A4
from reportlab.pdfgen import canvas
from jinja2 import Template
from os.path import exists

from Cadastral.config import TEMPORARY_PATH, TEMPLATE_PATH, IMAGES_PATH
from Cadastral.utils.pdf import PDF
from Cadastral import app


def createPDF(data):
    zoom = data["zoom"]
    pageSize = data["pageSize"]
    margins = data["margins"]
    dpi = data["dpi"]
    filename = data["filename"]
    if data["watermark"]:
        watermark = waterMark()
    else:
        watermark = None

    data = renderTemplates(data["data"])

    pdf = PDF(
        zoom=zoom,
        pageSize=pageSize,
        margins=margins,
        dpi=dpi,
        templates=data,
        watermark=watermark,
    )

    pdf.render()
    if watermark is not None:
        pdf.watermarkIt()
    return pdf.merge(outputFile=filename)
    

def mergePDF(files):

    pdf = PDF(files=files)

    return pdf.merge()


def renderTemplates(data):
    template = Template(
        open(f"{app.root_path}{TEMPLATE_PATH}/avaluo_catastral_template.html").read()
    )

    payload = []
    for item in data:
        filename = f"{app.root_path}{TEMPORARY_PATH}/{item['registro']}"

        with open(f"{filename}.html", "w") as file:
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


def waterMark():
    watermark = f"{app.root_path}{TEMPLATE_PATH}/watermark.pdf"
    if exists(watermark):
        return watermark
    else:
        gtoLogo = f"{app.root_path}{IMAGES_PATH}/logo.png"
        glLogo = f"{app.root_path}{IMAGES_PATH}/gl.png"
        secretaryInformation = f"{app.root_path}{IMAGES_PATH}/Sec.png"
        board = canvas.Canvas(filename=watermark, pagesize=A4)
        # draw images into the board
        board.drawImage(gtoLogo, 0, 779, width=150, height=60, mask="auto")
        board.drawImage(glLogo, 532, 779, width=60, height=60, mask="auto")
        board.drawImage(
            secretaryInformation, 0.5, 0.5, width=200, height=30, mask="auto"
        )
        # save the board as watermark to work with in the future an reduce the time of the process
        board.save()
        return watermark
