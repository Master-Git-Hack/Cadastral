from tempfile import _get_candidate_names
from Cadastral.config import TEMPORARY_PATH
from Cadastral import app


def tmpFilename(suffix="", prefix="", extension=""):
    return f"{app.root_path}{TEMPORARY_PATH}/{prefix}_{next(_get_candidate_names())}{suffix}.{extension}"
