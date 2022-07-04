from os import remove, rename
from os.path import exists
from subprocess import PIPE, Popen
from typing import Optional

from PyPDF2 import PdfFileMerger, PdfFileReader, PdfFileWriter

from .tmp import name_it as tmp_filename

# from reportlab.lib.pagesizes import A4, letter


class PDF:
    """
    PDF is a class to generate PDF files from HTML templates,
    using wkhtmltopdf with reportlab and PyPDF2, and optionally
    watermarking them, for complete use of wkhtmltopdf,
    its used with subprocess.
    """

    margins_default = dict(top=15, bottom=None, left=None, right=None)

    def __init__(
        self,
        zoom: Optional[float] = 1,
        page_size: Optional[str] = "A4",
        margins: Optional[dict] = None,
        dpi: Optional[int] = 300,
        templates: str = None,
        watermark: Optional[str] = None,
        files: list = None,
    ) -> None:
        """
                Initialize the PDF class.

                Args:
                    zoom (float, optional): _description_. Defaults to 1.
                    pageSize (str, optional): _description_. Defaults to "A4".
                    margins (_type_, optional): _description_. Defaults to
        {"top": 15, "bottom": None, "left": None, "right": None}.
                    dpi (int, optional): _description_. Defaults to 300.
                    templates (str, optional): _description_. Defaults to None.
                    watermark (str, optional): _description_. Defaults to None.
                    files (list, optional): _description_. Defaults to None.
        """
        margins = margins or self.margins_default
        if templates is not None:
            self.cmd = [
                "wkhtmltopdf",
                "--dpi",
                str(dpi),
                "--margin-top",
                str(margins["top"]),
            ]
            self.watermark = watermark
            self.templates = templates
            self.page_size = page_size
            self.margins = margins
            self.dpi = dpi
            self.zoom = zoom
            self.filename = tmp_filename(extension="pdf")
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
            # self.cmd.append(" --resolve-relative-links")deprecated
            self.cmd.append("--quiet")

        elif files is not None:
            self.files = files

    def render(self):
        """
        Read the templates and render them to pdf, using wkhtmltopdf
        """
        files = []

        for file in self.templates:
            input_file = f"{file}.html"
            output_file = f"{file}.pdf"
            if exists(input_file):
                self.cmd.append(input_file)
                self.cmd.append(output_file)
                process = Popen(
                    self.cmd, universal_newlines=True, stdout=PIPE, stderr=PIPE
                )
                _, error = process.communicate()
                exit_code = process.wait()
                print(exit_code)
                if exit_code:
                    self.cmd = self.cmd[:-2]
                    remove(input_file)
                    files.append(file)
                else:
                    print(f"Rendering Method failed: {error}")
        self.files = files

    def watermark_it(self):
        """
        Watermark the PDF.
        verify if the watermark exists.
        and if it does, then watermark the PDF.
        """
        if self.watermark is not None:
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

    def merge(
        self, output_file: Optional[str] = tmp_filename(extension="pdf")
    ) -> str or None:
        """merge files into one pdf file, and return the filename.
        if output_file is not None, then the output file will be saved in the specified location.

        Args:
            output_file (str, optional): Get the filename with the extension to use.
            Defaults to tmp_filename(extension="pdf") get a random name.

        Returns:
            str or None: return the filename to work with.
        """
        output_file = output_file or tmp_filename(extension="pdf")
        merger = PdfFileMerger()

        for file in self.files:
            file = file.split(".pdf")[0]
            merger.append(open(f"{file}.pdf", "rb"))

        with open(output_file, "wb") as output_stream:
            merger.write(output_stream)
        if exists(output_file):
            for file in self.files:
                remove(f"{file}.pdf")

            return output_file
        else:
            return None

    def remove_old_files(self) -> None:
        """
        Remove the old files.
        """
        # strftime('%Y-%m-%d %H:%M:%S',localtime(getmtime("./start.sh")))
        return None
