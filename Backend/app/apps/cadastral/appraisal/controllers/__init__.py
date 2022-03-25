from app.apps.cadastral.appraisal.models import Cadastral
from tempfile import _get_candidate_names as tempName
from app.utils import PDF, temporary_filename


class Controller:
    def __init__(
        self,
        collection=None,
        year=None,
        start=None,
        end=None,
        zoom=1,
        page_size="A4",
        margins={
            "top": 10,
            "bottom": None,
            "left": None,
            "right": None,
        },
        dpi=300,
    ):

        self.collection = collection
        self.year = year
        self.start = start
        self.end = end
        self.zoom = zoom
        self.page_size = page_size
        self.margins = margins
        self.dpi = dpi

    def create_report(self, filename, withWatermark=False):
        collection = self.collection
        cadastral = Cadastral(
            collection=collection, year=self.year, start=self.start, end=self.end
        )
        cadastral.define_collection()
        collection = cadastral.consolidate_collection()
        reports = PDF(
            zoom=self.zoom, page_size=self.page_size, margins=self.margins, dpi=self.dpi
        )
        reports.create(
            collection=collection, filename=filename, watermark=withWatermark
        )

    def merge_reports(
        self, collection=[], filename=temporary_filename(extension="pdf")
    ):
        reports = PDF()
        reports.merge(collection, filename)
        return filename
