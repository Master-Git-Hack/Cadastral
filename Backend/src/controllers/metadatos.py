from jinja2 import Template
from pdfkit import from_file
from reportlab.lib.pagesizes import A4, letter
from reportlab.pdfgen import canvas
from sqlalchemy.orm import Session

from .. import config
from ..models.dataset import Dataset
from ..utils.pdf import PDFMaker as PDF
from ..utils.tmp import name_it as tmp_filename


class ReporteMetadatos:
    __Dataset: Dataset = Dataset

    filename: str = tmp_filename(extension="pdf")

    def __init__(self, uid, db: Session):
        self.__meta = self.__Dataset(db)
        if self.__meta.filter(uid=uid) is None:
            raise Exception("No existe el registro actual de los metadatos a consultar")
        self.filename = str(self.__meta.current.title).replace(" ", "_")
        self.path = config.PATHS.tmp

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        ...

    def __render(self):
        template: Template = Template(
            open(
                f"{config.PATHS.templates}/{config.TEMPLATES.METADATA.REPORT}",
                encoding="UTF-8",
            ).read()
        )
        self.path += f"/{self.filename}"
        data = {
            key: value if value is not None else ""
            for key, value in self.__meta.current.__dict__.items()
        }

        with open(f"{self.path}.html", "w", encoding="UTF-8") as file:
            file.write(template.render(**data))

    def create(self):
        self.__render()
        report = PDF(
            templates=[self.path],
            margins={"top": "30", "bottom": "10", "left": "10", "right": "10"},
        )
        report.render()
        return f"{self.filename}.pdf", f"{self.path}.pdf"
