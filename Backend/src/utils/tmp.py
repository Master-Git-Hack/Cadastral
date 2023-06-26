"""File to work with temporary files"""
from os import listdir, remove
from os.path import isfile, join
from tempfile import NamedTemporaryFile
from typing import Optional

from .. import config


def name_it(
    suffix: Optional[str] = "",
    prefix: Optional[str] = "",
    extension: Optional[str] = "",
    path: Optional[str] = None,
) -> str:
    """
    Generate a temporary filename.
    Args:
        suffix (str, optional): suffix that will be used at the beginning of string. Defaults to "".
        prefix (str, optional): preffix that will be used at the end of the string. Defaults to "".
        extension (str, optional): extension that will have the filename. Defaults to "".
        path (str, optional): Location to handle file. Defaults to Paths.tmp.
    Returns:
        str: a temporary filename at the path selected to work with.
    """
    if path is None:
        path = config.PATHS.tmp
    with NamedTemporaryFile(
        suffix=suffix, prefix=prefix, dir=path, delete=True
    ) as temp:
        return f"{temp.name}.{extension}"
    #


def delete_files(path: Optional[str] = None):
    if path is None or path == "":
        path = config.PATHS.tmp
    for filename in listdir(path):
        file_path = join(path, filename)
        try:
            if isfile(file_path):
                remove(file_path)
        except Exception as e:
            print(e)
