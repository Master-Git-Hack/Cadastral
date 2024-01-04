from os import remove, rename
from os.path import exists
from subprocess import PIPE, Popen
from typing import List, Optional

from PyPDF2 import PdfFileMerger, PdfFileReader, PdfFileWriter

from .tmp import name_it as tmp_filename


class PDFMaker:
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        ...

    __margins_default: dict = dict(top=15, bottom=None, left=None, right=None)
    __cmd: List[str] = ["wkhtmltopdf"]
    watermark: bool = False
    filename: str = tmp_filename(extension="pdf")
    files: List = []
    templates: List = []

    def __init__(self, **kwargs) -> None:
        if kwargs.get("templates") and not kwargs.get("files"):
            # margins = kwargs.get("margins", self.__margins_default)
            self.__cmd.append("--dpi")
            self.__cmd.append(kwargs.get("dpi", "300"))
            # for key, value in margins.items():
            #     self.__cmd.append(f"--margin-{key}")
            #     self.__cmd.append(value)
            for key, value in kwargs.items():
                setattr(self, key, value)
                if key == "page_size":
                    self.__cmd.append("--page-size")
                    self.__cmd.append(value)
                elif key == "zoom":
                    self.__cmd.append("--zoom")
                    self.__cmd.append(str(value))
            self.__cmd.append("--enable-javascript")
            self.__cmd.append("--quiet")
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
                self.__cmd.append(input_file)
                self.__cmd.append(f".{file}.pdf")

                process = Popen(
                    " ".join(str(arg) for arg in self.__cmd),
                    stdout=PIPE,
                    stderr=PIPE,
                    universal_newlines=True,
                )
                _, error = process.communicate()
                exit_code = process.wait()
                if exit_code:
                    self.__cmd = self.__cmd[:-2]
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
