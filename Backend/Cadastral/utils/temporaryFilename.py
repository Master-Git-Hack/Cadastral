from tempfile import NamedTemporaryFile
from typing import Optional

from Cadastral import app
from Cadastral.config import TEMPORARY_PATH


def tmpFilename(
    suffix: Optional[str] = "",
    prefix: Optional[str] = "",
    extension: Optional[str] = "",
    path: Optional[str] = f"{app.root_path}{TEMPORARY_PATH}",
):
    """
    Generate a temporary filename.
    :param suffix: Suffix.
    :param prefix: Prefix.
    :param extension: Extension ['pdf','html',...etc].
    :param path: root path.
    :return: Filename.
    
    example: tmpFilename(suffix="_tmp", extension="pdf")
    return: "example_tmp.pdf"\n
    @deprecated:
    return f"{app.root_path}{TEMPORARY_PATH}/{prefix}_{next(_get_candidate_names())}{suffix}.{extension}"
    """
    with NamedTemporaryFile(suffix=suffix,prefix=prefix,dir=path, delete=True) as temp:
        return f"{temp.name}.{extension}"
    #
