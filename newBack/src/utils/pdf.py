from os import remove, rename
from os.path import exists
from subprocess import PIPE, Popen
from typing import Optional

from PyPDF2 import PdfFileMerger, PdfFileReader, PdfFileWriter

from .temporary_transactions import name_it as tmp_filename

# from reportlab.lib.pagesizes import A4, letter


class PDF:
    """
    PDF is a class to generate PDF files from HTML templates,
    using wkhtmltopdf with reportlab and PyPDF2, and optionally
    watermarking them, for complete use of wkhtmltopdf,
    its used with subprocess.
    Attributes:

    """

    _zoom: float = 1
    _page_size: str = "A4"
    _margins: dict = dict(top=15, bottom=None, left=None, right=None)
    _dpi: int = 300
    _templates: str = None
    _watermark: bool = False
    _files: list = None
    _cmd: list = None
    _filename: str = tmp_filename(extension="pdf")
    _files: list = None

    def __init__(
        self,
        zoom: Optional[float] = None,
        page_size: Optional[str] = None,
        margins: Optional[dict] = None,
        dpi: Optional[int] = None,
        templates: str = None,
        watermark: Optional[str] = None,
        files: list = None,
    ) -> None:
        """
        Initialize the PDF class.

        Args:

        """
        if margins is not None:
            self._margins = margins
        if zoom is not None:
            self._zoom = zoom
        if files is not None:
            self._files = files
        if watermark is not None:
            self._watermark = watermark
        if templates is not None:
            self._cmd = [
                "wkhtmltopdf",
                "--dpi",
                str(dpi),
                "--margin-top",
                str(margins["top"]),
            ]
            self._templates = templates
            self._page_size = page_size
            self._dpi = dpi

            if margins["bottom"] is not None:
                self._cmd.append("--margin-bottom")
                self._cmd.append(str(margins["bottom"]))
            if margins["left"] is not None:
                self._cmd.append("--margin-left")
                self._cmd.append(str(margins["left"]))
            if margins["right"] is not None:
                self._cmd.append("--margin-right")
                self._cmd.append(str(margins["right"]))
            self._cmd.append("--page-size")
            self._cmd.append(page_size)
            self._cmd.append("--zoom")
            self._cmd.append(str(zoom))
            self._cmd.append("--enable-javascript")
            # self.cmd.append(" --resolve-relative-links")deprecated
            self._cmd.append("--quiet")

    def create(self):
        pass

    def render(self):
        """
        Read the templates and render them to pdf, using wkhtmltopdf
        """
        files = []

        for file in self._templates:
            input_file = f"{file}.html"
            output_file = f"{file}.pdf"
            if exists(input_file):
                self._cmd.append(input_file)
                self._cmd.append(output_file)
                process = Popen(
                    self._cmd, universal_newlines=True, stdout=PIPE, stderr=PIPE
                )
                _, error = process.communicate()
                exit_code = process.wait()
                if exit_code:
                    self._cmd = self.cmd[:-2]
                    remove(input_file)
                    files.append(file)
                else:
                    print(f"Rendering Method failed: {error}")
        self._files = files

    def watermark_it(self):
        """
        Watermark the PDF.
        verify if the watermark exists.
        and if it does, then watermark the PDF.
        """
        if self._watermark is not None:
            watermark = PdfFileReader(open(self._watermark, "rb"))
            for file in self._files:
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

    def merge(self, output_file: Optional[str] = None) -> str or None:
        """merge files into one pdf file, and return the filename.
        if output_file is not None, then the output file will be saved in the specified location.

        Args:
            output_file (str, optional): Get the filename with the extension to use.
            Defaults to tmp_filename(extension="pdf") get a random name.

        Returns:
            str or None: return the filename to work with.
        """
        if self._filename is None:
            self._filename = tmp_filename(extension="pdf")
        if output_file is None:
            output_file = self._filename
        merger = PdfFileMerger()

        for file in self._files:
            file = file.split(".pdf")[0]
            merger.append(open(f"{file}.pdf", "rb"))

        with open(output_file, "wb") as output_stream:
            merger.write(output_stream)
        if exists(output_file):
            for file in self.files:
                remove(f"{file}.pdf")
            return output_file
        return None

    def remove_old_files(self) -> None:
        """
        Remove the old files.
        """
        # strftime('%Y-%m-%d %H:%M:%S',localtime(getmtime("./start.sh")))
        return None
