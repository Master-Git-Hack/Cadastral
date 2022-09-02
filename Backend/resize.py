"""script to resize images with python 3.6"""
from csv import writer
from os import mkdir, scandir, walk
from os.path import abspath, dirname, isdir, join
from time import time
from typing import List, Tuple

import pandas as pd
from PIL import Image
from PIL.Image import Resampling
from sqlalchemy import create_engine

engine = create_engine(
    "postgresql://info-cat3:#jhgfye%rwA@172.31.113.151:5432/valuaciones"
)

root_path = abspath(dirname(__file__))

image_type = (".jpg", ".png", ".JPG", ".PNG", ".JPEG", ".tif", ".tiff", ".TIFF")
# lista de los municipios de guanajuato
municipios = [
    "abasolo",
    "acambaro",
    "allende",
    "apaseo_el_alto",
    "atarjea",
    "celaya",
    "celaya2",
    "comonfort",
    "coroneo",
    "cortazar",
    "cueramaro",
    "doctor_mora",
    "dolores_hidalgo",
    "guanajuato",
    "huanimaro",
    "irapuato",
    "jaral",
    "jerequaro",
    "leon",
    "manuel_doblado",
    "moroleon",
    "ocampo",
    "penjamo",
    "purisima_del_rincon",
    "romita",
    "salamanca",
    "salvatierra",
    "san_diego",
    "san_felipe",
    "san_francisco",
    "san_jose_iturbide",
    "san_luis",
    "san_miguel_de_allende",
    "santa_catarina",
    "santa_cruz_jr",
    "santiago_maravatio",
    "sialo",
    "tarandacuao",
    "tarimoro",
    "tierra_blanca",
    "uriangato",
    "victoria",
    "xichu",
    "yuriria",
]


def read_directory() -> Tuple[str, str] or None:
    """Read the directory to get the source and output paths
    Returns:
        tuple or None: The source and output paths if they are valid, otherwise None
        return input_path, output_path
    """
    dirs: List[str] = [
        dirs.path.split("./")[-1]
        for dirs in scandir(".")
        if dirs.is_dir() and not "_low" in dirs.name
    ]
    for index, directory in enumerate(dirs):
        print(f"{index} .- {directory}")

    input_path: int = int(
        input("Seleccione el numero de la carpeta con la que desea trabajar:\n")
    )
    selected_dir: str = join(root_path, dirs[input_path])
    if not isdir(selected_dir):
        print("No existe la carpeta, verifique su entrada")
        return None

    acciones = ["imagenes", "croquis"]
    accion = int(input("Tipo de accion:\n 0 - imagenes\n 1 - croquis\n"))
    return f"{selected_dir}", f"{selected_dir}_low/", acciones[accion]


def get_files(src_path: str) -> List[str]:
    """Get all the files in the source path

    Arguments:
        src_path {str} -- The path to get the files from

    Returns:
        list {str} The list of files in the source path with the image type given
    """
    images: List[str] = []
    # it could be destructure as dirpath, dirnames, filenames
    # dirnames not used changed for _ character
    for (dirpath, _, filenames) in walk(src_path):
        for filename in filenames:
            if filename.endswith(image_type):
                images.append(join(dirpath, filename))
    return images


class Images:
    """Class for resizing images"""

    base_width: int = 450
    images: List[str] = []

    def __init__(
        self, src_path: str, out_path: str, images: List[str], accion: str
    ) -> None:
        """Constructor for Images class
        Args:
            src_path (str): Its the path to the source images
            out_path (str): optional path to the output
            images it will be created if not exists
            accion (str): imagenes o croquis para la exportacion de csv
        """
        self.src_path = src_path
        if not isdir(out_path):
            mkdir(out_path)
        self.out_path = out_path
        self.images = images
        self.accion = accion

    def resize(self) -> None:
        """Resize all the images in the source path to the output path"""
        if not self.images:
            print("No se encontraron imagenes en el directorio")
            return None
        for image in self.images:
            current = Image.open(image)
            width, height = current.size
            if width > self.base_width:
                width_percent: float = self.base_width / float(width)
                new_height: int = int(float(height) * float(width_percent))
                new_width: int = self.base_width
                new_size: Tuple(int, int) = (new_width, new_height)
                # Image.thumbnail resizes to the largest size that
                # (a) preserves the aspect ratio,
                # (b) does not exceed the original image,
                # and (c) does not exceed the size specified in the arguments of thumbnail.
                current.thumbnail(new_size, Resampling.LANCZOS)
                # Image.resize resizes to the dimensions you specify:
                # current.resize(new_size, Resampling.LANCZOS)
                # Furthermore, calling thumbnail resizes it in place,
                # whereas resize returns the resized image a little bit heavier than a thumbnail.
                filename: str = f"{self.out_path}{image.split('/')[-1]}"
                current.save(filename, optimize=True)
                print(filename.split(root_path)[-1])

    def export_as_csv(self):
        """Export the images name to a csv file to use in a db relationship"""
        if not self.images:
            print("No se encontraron imagenes en el directorio")
            return None
        output_file: str = f"{join(root_path,self.src_path.split('/')[-1])}.csv"
        with open(output_file, "w", encoding="UTF8") as file:
            _writer = writer(file)
            _writer.writerow([self.accion, "cuenta_predial"])
            for image in self.images:
                filename = image.split(f"{join(root_path,self.src_path)}/")[-1]
                cuenta_predial = filename.split(".")[0]

                if cuenta_predial.startswith("I"):
                    cuenta_predial = cuenta_predial[1:]
                if not cuenta_predial.endswith("U"):
                    cuenta_predial = f"{cuenta_predial}U"

                _writer.writerow([filename, cuenta_predial])
        if self.accion == "croquis":
            upload = input("Desea subir los cambios? (y/N)\n")
            if upload.upper() == "Y":
                for index, municipio in enumerate(municipios):
                    print(f"{index}.- {municipio}")
                municipio = int(
                    input("Seleccione el municipio que desea actualizar:\n")
                )
                print("Tabla Actualizada")
                data_df = pd.read_csv(output_file, sep=",", header=0)
                data_df.to_sql(
                    self.accion,
                    engine,
                    schema=municipios[municipio],
                    if_exists="replace",
                    index=True,
                    index_label="id",
                )


def main(tiempo_inicial: float) -> None:
    """Main function"""

    input_path, output_path, action = read_directory()
    files = get_files(input_path)

    images = Images(input_path, output_path, files, action)
    # images.resize()
    images.export_as_csv()
    tiempo_resultante: float = (time() - tiempo_inicial) / 60
    print(
        f"Se realizaron {len(files)} imagenes en:\
{tiempo_resultante} minutos,{len(files)/tiempo_resultante} imagenes por minuto"
    )


main(time())
