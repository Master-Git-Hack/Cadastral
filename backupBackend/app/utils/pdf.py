from distutils import extension
from PyPDF2 import PdfFileWriter, PdfFileReader, PdfFileMerger
from app.config import TEMPORARY_PATH, TEMPLATE_PATH, IMAGES_PATH
from reportlab.lib.pagesizes import letter, A4
from os import remove, rename

from subprocess import PIPE, Popen
from jinja2 import Template
from os.path import exists
from app.utils.bool_operation import bool2string, item_validator
from app.utils.temporary_filename import temporary_filename
from app.utils.local import asCompleteDate, asCurrency, asPercentage, withDecimals


class PDF:
    def __init__(
        self,
        zoom=1,
        page_size="A4",
        margins={"top": 15, "bottom": None, "left": None, "right": None},
        dpi=300,
        template=f"{TEMPLATE_PATH}/avaluo_catastral_template.html",
    ):
        self.zoom = zoom
        self.page_size = page_size
        self.dpi = dpi
        self.margins = margins
        self.files = []
        self.cmd = [
            "wkhtmltopdf",
            "--dpi",
            str(dpi),
            "--margin-top",
            str(margins["top"]),
        ]
        self.template = template
        self.filename = temporary_filename(extension="pdf")
        if margins["bottom"] is not None:
            self.cmd.append("--margin-bottom")
            self.cmd.append(str(margins["bottom"]))
        if margins["left"] is not None:
            self.cmd.append("--margin-left")
            self.cmd.append(str(margins["left"]))
        if margins["right"] is not None:
            self.cmd.append("--margin-right")
            self.cmd.append(str(margins["right"]))
        self.cmd.append("--page-size")
        self.cmd.append(page_size)
        self.cmd.append("--zoom")
        self.cmd.append(str(zoom))
        self.cmd.append("--enable-javascript")
        self.cmd.append("--quiet")

    def render_template(self):
        for document in self.collection:
            _template = Template(open(f"{self.template}").read())
            file = f'{TEMPORARY_PATH}/{document[0]["id"]}.html'
            with open(file, "w") as file:
                file.write(
                    _template.render(
ID=document[0]["id"],
SOLICITANTE=item_validator(document[0]["solicitante"].upper()),
SECRETARIA=item_validator(document[0]["secretaria"].upper()),
OFICIO_DE_SOLICITUD=item_validator(document[0]["oficio_solicitud"]),
FECHA_DE_SOLICITUD=item_validator(asCompleteDate(document[0]["fecha_solicitud"])),
ADQUIRIENTE=item_validator(document[0]["adquiriente"]),
OBJETIVO_DEL_AVALUO=item_validator(document[0]["objetivo_avaluo"]),
PROPOSITO_DEL_AVALUO=item_validator(document[0]["proposito_avaluo"]),
INMUEBLE_QUE_SE_AVALUA=item_validator(document[0]["inmueble_valua"]),
ZONA_UTM=item_validator(document[0]["zona_utm"]),
CALLE=item_validator(document[0]["calle"]),
NUMERO=item_validator(document[0]["numero"]),
COLONIA_O_POBLACION=item_validator(document[0]["colonia_poblacion"]),
MUNICIPIO=item_validator(document[0]["nombre_utf"].upper()),
COORDENADAS_EN_X=withDecimals(item_validator(document[0]["x_utm"]), 0),
COORDENADAS_EN_Y=withDecimals(item_validator(document[0]["y_utm"]), 0),
TENIENTE=item_validator(document[0]["teniente"].upper()),
PROPIETARIO=item_validator(document[0]["propietario"]),
CUENTA_PREDIAL=item_validator(document[0]["cuenta_predial"]),
CUC=item_validator(document[0]["cuc"]),
CLASIFICACION_DE_ZONA=item_validator(document[0]["clasificacion_zona"]),
USO_DOMINANTE=item_validator(document[0]["uso_dominante"]),
TIPO_DE_CONSTRUCCION_DOMINANTE=item_validator(document[0]["tipo_constr_dominante"]),
AGUA=bool2string(document[0]["agua"]),
DRENAJE=bool2string(document[0]["drenaje"]),
ENERGIA_ELECTRICA=bool2string(document[0]["energia_electrica"]),
TELEFONIA=bool2string(document[0]["telefonia"]),
PAVIMENTO=document[0]["tipo_pavimento"],
ALUMBRADO_PUBLICO=bool2string(document[0]["alumbrado_publico"]),
BANQUETA=bool2string(document[0]["banqueta"]),
CNA_EDAD=item_validator(document[0]["cna_edad"]),
CNB_EDAD=item_validator(document[0]["cnb_edad"]),
CNC_EDAD=item_validator(document[0]["cnc_edad"]),
CND_EDAD=item_validator(document[0]["cnd_edad"]),
CNE_EDAD=item_validator(document[0]["cne_edad"]),
INDICE_DE_SATURACION=asPercentage(document[0]["indice_saturacion"]),
TOPOGRAFIA=item_validator(document[0]["topografia"]),
MEDIDAS_Y_COLINDANCIAS=item_validator(document[0]["myc_segun"]),
MUROS=item_validator(document[0]["muros"]),
CARPINTERIA=item_validator(document[0]["carpinteria"]),
ESTRUCTURA=item_validator(document[0]["estructura"]),
INSTALACION_ELECTRICA=item_validator(document[0]["inst_electrica"]),
ORIENTACION1=item_validator(document[0]["col1"]),
MEDIDAS_ORIENTACION1=item_validator(document[0]["med1"]),
ENTREPISOS=item_validator(document[0]["entrepisos"]),
INSTALACION_SANITARIA=item_validator(document[0]["inst_sanitaria"]),
ORIENTACION2=item_validator(document[0]["col2"]),
MEDIDAS_ORIENTACION2=item_validator(document[0]["med2"]),
TECHOS=item_validator(document[0]["techos"]),
ACCESORIOS=item_validator(document[0]["inst_especial"]),
ORIENTACION3=item_validator(document[0]["col3"]),
MEDIDAS_ORIENTACION3=item_validator(document[0]["med3"]),
PISOS=item_validator(document[0]["pisos"]),
ACABADO_EXTERIOR=item_validator(document[0]["acabado_exterior"]),
ORIENTACION4=item_validator(document[0]["col4"]),
MEDIDAS_ORIENTACION4=item_validator(document[0]["med4"]),
PUERTAS=item_validator(document[0]["puertas"]),
ACABADO_INTERIOR=document[0]["acabado_interior"],
ORIENTACION5=item_validator(document[0]["col5"]),
MEDIDAS_ORIENTACION5=item_validator(document[0]["med5"]),
VENTANAS=item_validator(document[0]["ventanas"]),
MUEBLES_SANITARIOS=item_validator(document[0]["muebles_sanitarios"]),
ORIENTACION6=item_validator(document[0]["col6"]),
MEDIDAS_ORIENTACION6=item_validator(document[0]["med6"]),
SUPERFICIE_TERRENO1=withDecimals(item_validator(document[0]["sp1_superficie"]), 3),
VALOR_UNITARIO_TERRENO1=asCurrency(document[0]["sp1_vu"]),
FACTOR_TERRENO1=item_validator(document[0]["sp1_factor"]),
VALOR_PARCIAL_TERRENO1=asCurrency(item_validator(document[0]["sp1_valor_parcial"])),
CNA_TIPO=item_validator(document[0]["cna_tipo"]).split("|")[0]
if item_validator(document[0]["cna_tipo"]).find("|") != -1
else item_validator(document[0]["cna_tipo"]),
CNA_SUPERFICIE=withDecimals(item_validator(document[0]["cna_superficie"]), 2),
CNA_VALOR_UNITARIO=asCurrency(item_validator(document[0]["cna_vu"])),
CNA_VALOR_PARCIAL=asCurrency(item_validator(document[0]["cna_valor_parcial"])),
SUPERFICIE_TERRENO2=withDecimals(item_validator(document[0]["sp2_superficie"]), 2),
VALOR_UNITARIO_TERRENO2=asCurrency(item_validator(document[0]["sp2_vu"])),
FACTOR_TERRENO2=item_validator(document[0]["sp2_factor"]),
VALOR_PARCIAL_TERRENO2=asCurrency(document[0]["sp2_valor_parcial"]),
CNB_TIPO=item_validator(document[0]["cnb_tipo"]).split("|")[0]
if item_validator(document[0]["cnb_tipo"]).find("|") != -1
else item_validator(document[0]["cnb_tipo"]),
CNB_SUPERFICIE=withDecimals(item_validator(document[0]["cnb_superficie"]), 2),
CNB_VALOR_UNITARIO=asCurrency(item_validator(document[0]["cnb_vu"])),
CNB_VALOR_PARCIAL=asCurrency(item_validator(document[0]["cnb_valor_parcial"])),
SUPERFICIE_TERRENO3=withDecimals(item_validator(document[0]["sp3_superficie"]), 2),
VALOR_UNITARIO_TERRENO3=asCurrency(item_validator(document[0]["sp3_vu"])),
FACTOR_TERRENO3=item_validator(document[0]["sp3_factor"]),
VALOR_PARCIAL_TERRENO3=asCurrency(item_validator(document[0]["sp3_valor_parcial"])),
CNC_TIPO=item_validator(document[0]["cnc_tipo"]).split("|")[0]
if item_validator(document[0]["cnc_tipo"]).find("|") != -1
else item_validator(document[0]["cnc_tipo"]),
CNC_SUPERFICIE=withDecimals(item_validator(document[0]["cnc_superficie"]), 2),
CNC_VALOR_UNITARIO=asCurrency(item_validator(document[0]["cnc_vu"])),
CNC_VALOR_PARCIAL=asCurrency(item_validator(document[0]["cnc_valor_parcial"])),
SUPERFICIE_TERRENO4=withDecimals(item_validator(document[0]["sp4_superficie"]), 2),
VALOR_UNITARIO_TERRENO4=asCurrency(item_validator(document[0]["sp4_vu"])),
FACTOR_TERRENO4=item_validator(document[0]["sp4_factor"]),
VALOR_PARCIAL_TERRENO4=asCurrency(item_validator(document[0]["sp4_valor_parcial"])),
CND_TIPO=item_validator(document[0]["cnd_tipo"]).split("|")[0]
if item_validator(document[0]["cnd_tipo"]).find("|") != -1
else item_validator(document[0]["cnd_tipo"]),
CND_SUPERFICIE=withDecimals(item_validator(document[0]["cnd_superficie"]), 2),
CND_VALOR_UNITARIO=asCurrency(item_validator(document[0]["cnd_vu"])),
CND_VALOR_PARCIAL=asCurrency(item_validator(document[0]["cnd_valor_parcial"])),
INCREMENTO_ESQUINA_SUPERFICIE=withDecimals(
    item_validator(document[0]["incr_esq_superficie"]), 2
),
INCREMENTO_ESQUINA_VALOR_UNITARIO=asCurrency(item_validator(document[0]["incr_esq_vu"])),
INCREMENTO_ESQUINA_FACTOR=item_validator(document[0]["incr_esq_factor"]),
INCREMENTO_ESQUINA_VALOR_PARCIAL=asCurrency(
    item_validator(document[0]["incr_esq_valor_parcial"])
),
SUPERFICIE_TOTAL_TERRENO=withDecimals(item_validator(document[0]["sup_total_terreno"]), 3),
VALOR_TOTAL_TERRENO=asCurrency(item_validator(document[0]["valor_total_terreno"])),
SUPERFICIE_TOTAL_CONSTRUCCION=withDecimals(
    item_validator(document[0]["sup_total_construccion"]), 2
),
VALOR_TOTAL_CONSTRUCCION=asCurrency(item_validator(document[0]["valor_total_construccion"])),
REGISTRO=item_validator(document[0]["registro"]),
VALOR_TOTAL_CATASTRAL=asCurrency(item_validator(document[0]["vt_catastral"])),
CROQUIS=f'http://172.31.113.151/reportes_avaluos/imagenes/{item_validator(document[0]["croquis"])}',
IMAGEN_SATELITAL=f'http://172.31.113.151/reportes_avaluos/imagenes/{item_validator(document[0]["foto"])}',
DOMICILIO_GEOGRAFICO=item_validator(document[0]["domicilio_geografico"]),
OBSERVACIONES=item_validator(document[0]["observaciones"]),
FECHA_EMISION=asCompleteDate(item_validator(document[0]["fecha_emision"])),
USUARIO=item_validator(document[0]["usuario"]),
                    )
                )
                self.files.append(file.name)

    def convert_templates_to_pdf(self):
        files = []
        for file in self.files:
            output_file = f'{file.split(".html")[0]}.pdf'
            self.cmd.append(file)
            self.cmd.append(output_file)
            response, error = Popen(self.cmd, universal_newlines=True, stdout=PIPE, stderr=PIPE).communicate()
            files.append(output_file)
            self.cmd = self.cmd[:-2]
            remove(file)
        self.files = files

    def watermark(self):
        watermark = f"{TEMPLATE_PATH}/watermark.pdf"
        if not exists(watermark):
            # import images
            gto_logo = f"{IMAGES_PATH}/logo.png"
            gl_logo = f"{IMAGES_PATH}/gl.png"
            secretary_information = f"{IMAGES_PATH}/Sec.png"
            # create board to work with a canvas
            board = canvas.Canvas(filename="watermark.pdf", pagesize=A4)
            # draw images into the board
            board.drawImage(gto_logo, 0, 779, width=150, height=60, mask="auto")
            board.drawImage(gl_logo, 532, 779, width=60, height=60, mask="auto")
            board.drawImage(secretary_information, 0.5, 0.5, width=200, height=30, mask="auto")
            # save the board as watermark to work with in the future an reduce the time of the process
            board.save()
        watermark = PdfFileReader(open(watermark, "rb"))
        for file in self.files:
            temporary_file = f'{file.split("pdf")[0]}_waterunmarked.pdf'
            rename(file, temporary_file)
            output_file = PdfFileWriter()
            input_file = PdfFileReader(open(temporary_file, "rb"))
            page_count = input_file.getNumPages()
            for page_number in range(page_count):
                input_page = input_file.getPage(page_number)
                input_page.mergePage(watermark.getPage(0))
                output_file.addPage(input_page)
                with open(file, "wb") as outputStream:
                    output_file.write(outputStream)
            remove(temporary_file)

    def merge(self, files=[], output_file=temporary_filename(extension="pdf")):
        merger = PdfFileMerger()
        if len(files) == 0:
            files = self.files
        for file in files:
            merger.append(PdfFileReader(open(file, "rb")))
        merger.write(output_file)

    def create(self, collection, filename=temporary_filename(extension="pdf"), watermark=False):
        self.collection = collection
        self.render_template()
        self.convert_templates_to_pdf()
        if watermark:
            self.watermark()
        self.merge(output_file=filename)
        self.cleanup()

    def cleanup(self):
        for file in self.files:
            remove(file)
