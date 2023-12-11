from jinja2 import Template
from reportlab.lib.pagesizes import A4, letter
from reportlab.pdfgen import canvas

from .. import config
from ..models.dataset import Dataset
from ..utils.pdf import PDFMaker as PDF
from ..utils.tmp import name_it as tmp_filename


class ReporteMetadatos:
    __meta = Dataset()
    filename: str = tmp_filename(extension="pdf")

    def __init__(self, uid):
        if self.__meta.filter(uid=uid) is None:
            raise Exception("No existe el registro actual de los metadatos a consultar")
        self.filename = self.__meta.current.title

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        ...

    def __render(self):
        template: Template = Template(
            open(f"{config.PATHS.templates}/main.html", encoding="UTF-8").read()
        )
        self.filename = f"{config.PATHS.tmp}/{self.filename}"
        with open(f"{self.filename}.html", "w", encoding="UTF-8") as file:
            file.write(template.render(**self.__meta.to_dict()))

    def create(self):
        self.__render()
        pdf = PDF(templates=[self.filename])
        pdf.render()
        return f"{self.filename}.pdf"
