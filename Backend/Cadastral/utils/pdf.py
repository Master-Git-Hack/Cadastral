from os import remove, rename
from os.path import exists
from subprocess import PIPE, Popen

from Cadastral.utils.temporaryFilename import tmpFilename
from PyPDF2 import PdfFileMerger, PdfFileReader, PdfFileWriter
from reportlab.lib.pagesizes import A4, letter


class PDF:
    def __init__(
        self,
        zoom: float = 1,
        pageSize: str = "A4",
        margins: dict = {"top": 15, "bottom": None, "left": None, "right": None},
        dpi: int = 300,
        templates: str = None,
        watermark: str = None,
        files: list = None,
    ):
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
            self.pageSize = pageSize
            self.margins = margins
            self.dpi = dpi
            self.zoom = zoom
            self.filename = tmpFilename(extension="pdf")
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
            self.cmd.append(pageSize)
            self.cmd.append("--zoom")
            self.cmd.append(str(zoom))
            self.cmd.append("--enable-javascript")
            self.cmd.append("--quiet")

        elif files is not None:
            self.files = files

    def render(self):
        files = []
        for file in self.templates:
            inputFile = f"{file}.html"
            outputFile = f"{file}.pdf"
            if exists(inputFile):
                self.cmd.append(inputFile)
                self.cmd.append(outputFile)
                response, error = Popen(
                    self.cmd, universal_newlines=True, stdout=PIPE, stderr=PIPE
                ).communicate()
                self.cmd = self.cmd[:-2]
                remove(inputFile)
                files.append(file)
        self.files = files

    def watermarkIt(self):
        if self.watermark is not None:
            watermark = PdfFileReader(open(self.watermark, "rb"))
            for file in self.files:
                filename = f"{file}_waterUnmarked.pdf"
                rename(f"{file}.pdf", filename)
                outputFile = PdfFileWriter()
                inputFile = PdfFileReader(open(filename, "rb"))
                pageCount = inputFile.getNumPages()
                for page in range(pageCount):
                    inputPage = inputFile.getPage(page)
                    inputPage.mergePage(watermark.getPage(0))
                    outputFile.addPage(inputPage)
                    with open(f"{file}.pdf", "wb") as outputStream:
                        outputFile.write(outputStream)
                remove(filename)

    def merge(self, outputFile: str = tmpFilename(extension="pdf")):
        merger = PdfFileMerger()

        for file in self.files:
            file = file.split(".pdf")[0]
            merger.append(open(f"{file}.pdf", "rb"))

        with open(outputFile, "wb") as outputStream:
            merger.write(outputStream)
        if exists(outputFile):

            for file in self.files:
                remove(f"{file}.pdf")

            return outputFile
        else:
            return None
