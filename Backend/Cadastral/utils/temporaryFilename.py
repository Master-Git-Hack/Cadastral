from tempfile import _get_candidate_names
from typing import Optional

from Cadastral import app
from Cadastral.config import TEMPORARY_PATH


def tmpFilename(
    suffix: Optional[str] = "",
    prefix: Optional[str] = "",
    extension: Optional[str] = "",
):
    return f"{app.root_path}{TEMPORARY_PATH}/{prefix}_{next(_get_candidate_names())}{suffix}.{extension}"
