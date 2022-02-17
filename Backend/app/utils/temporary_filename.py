from tempfile import _get_candidate_names 
from app.config import TEMPORARY_PATH
def temporary_filename(suffix='', prefix='', extension=''):
    return f'{TEMPORARY_PATH}/{prefix}_{next(_get_candidate_names())}{suffix}.{extension}'