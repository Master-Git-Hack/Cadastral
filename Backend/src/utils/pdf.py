from os import remove, rename
from os.path import exists
from subprocess import PIPE, Popen
from typing import List, Optional

from PyPDF2 import PdfFileMerger, PdfFileReader, PdfFileWriter
from wkhtmltopdf import WKHtmlToPdf

from .. import logger
from .tmp import name_it as tmp_filename


class PDFMaker:
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        ...

    __margins_default: dict = dict(top="15", bottom="0", left="0", right="0")
    __dpi_default: str = "3000"
    watermark: bool = False
    filename: str = tmp_filename(extension="pdf")
    files: List = []
    templates: List = []

    def __init__(self, **kwargs) -> None:
        if kwargs.get("templates") and not kwargs.get("files"):
            self.margins = kwargs.get("margins", self.__margins_default)
            self.dpi = str(kwargs.get("dpi", self.__dpi_default))
            self.margins = {key: str(value) for key, value in self.margins.items()}
            if "margins" in kwargs:
                del kwargs["margins"]
            if "dpi" in kwargs:
                del kwargs["dpi"]
            for key, value in kwargs.items():
                setattr(self, key, value)

        elif kwargs.get("files") and not kwargs.get("templates"):
            self.files = kwargs.get("files", [])
        else:
            raise ValueError("You must provide either templates or files")

    def render(self) -> Optional[List[str]]:
        """
        Read the templates and render them to pdf, using wkhtmltopdf
        """
        if len(self.templates) == 0:
            raise ValueError("You must provide templates")
        files: List = []

        for file in self.templates:
            if exists(input_file := f"{file}.html"):
                file = f"{file}.pdf"
                # cmd = " ".join(str(arg) for arg in self.__cmd)
                # try:
                #     cmd = [
                #         "wkhtmltopdf",
                #         "--dpi",
                #         self.dpi,
                #         f"--margin-top {self.margins['top']}",
                #         f"--margin-bottom {self.margins['bottom']}",
                #         f"--margin-left {self.margins['left']}",
                #         f"--margin-right {self.margins['right']}",
                #         "--enable-javascript",
                #         "--quiet",
                #         input_file,
                #         file,
                #     ]

                #     process = Popen(
                #         cmd,
                #         stdout=PIPE,
                #         stderr=PIPE,
                #         universal_newlines=True,
                #     )
                #     _, error = process.communicate()
                #     exit_code = process.wait()
                # except Exception as e:
                #     logger.bind(payload=str(e)).debug(
                #         f"----------> Unexpected error:\n {str(e)}"
                #     )
                output = WKHtmlToPdf(
                    url=input_file,
                    output_file=file,
                    dpi=self.dpi,
                    margin_bottom=self.margins["bottom"],
                    margin_left=self.margins["left"],
                    margin_right=self.margins["right"],
                    margin_top=self.margins["top"],
                    enable_javascript=True,
                    quiet=True,
                )
                output.render()

                if exists(file):
                    remove(input_file)
                    files.append(file)
                else:
                    raise ValueError(f"Rendering Method failed: {error}")
        if len(files) > 0:
            self.files = files
        else:
            raise ValueError("No files were rendered")

    def water_mark_it(self) -> None:
        """
        Watermark the PDF.
        verify if the watermark exists.
        and if it does, then watermark the PDF.
        """
        if len(self.files) == 0:
            raise ValueError("You must provide files to work with")
        if self.watermark:
            watermark = PdfFileReader(open(self.watermark, "rb"))
            for file in self.files:
                filename = f"{file}_waterUnmarked.pdf"
                rename(f"{file}.pdf", filename)
                output_file = PdfFileWriter()
                input_file = PdfFileReader(open(filename, "rb"))
                page_count = input_file.getNumPages()
                for page in range(page_count):
                    input_page = input_file.getPage(page)
                    input_page.mergePage(watermark.getPage(0))
                    output_file.addPage(input_page)
                    with open(f"{file}.pdf", "wb") as output_stream:
                        output_file.write(output_stream)
                remove(filename)

    def merge(self, output_filename: Optional[str] = None) -> Optional[str]:
        """merge files into one pdf file, and return the filename.
        if output_file is not None, then the output file will be saved in the specified location.

        Args:
            output_file (str, optional): Get the filename with the extension to use.
            Defaults to tmp_filename(extension="pdf") get a random name.

        Returns:
            str or None: return the filename to work with.
        """
        if output_filename is not None:
            self.filename = output_filename
        if len(self.files) == 0:
            raise ValueError("You must provide files to work with")
        merger = PdfFileMerger()
        for file in self.files:
            filename = file
            if filename.endswith(".pdf"):
                filename = file.split(".pdf")[0]
            merger.append(open(f"{filename}.pdf", "rb"))
        with open(self.filename, "wb") as output_stream:
            merger.write(output_stream)
        if exists(self.filename):
            for file in self.files:
                remove(f"{file}.pdf")
            return self.filename
