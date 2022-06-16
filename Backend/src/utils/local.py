"""File to work with locale configuration, as money, date and number formats"""
from locale import LC_ALL, currency, format_string, setlocale
from warnings import filterwarnings

from backports.zoneinfo import ZoneInfo
from dateparser import parse

filterwarnings(
    "ignore",
    message="""
    The localize method is no longer necessary, as this time zone supports the fold attribute
    """,
)

tzInfo = ZoneInfo("America/Mexico_City")
try:
    setlocale(LC_ALL, "es_MX.UTF-8")
except Exception as e:
    print(e)
    setlocale(LC_ALL, "en_US.UTF-8")


def with_decimals(value: float = 0, decimals: int = 2) -> str:
    """Return a string with the value in the format dd.dd
    Args:
        value (float, optional):the value you want to format. Defaults to 0.
        decimals (int, optional): the long of decimals you want to see. Defaults to 2.

    Returns:
        str: string with the value formatted.
    """
    value = value or 0
    if value != 0:
        return format_string(f"%10.{decimals}f", float(value), grouping=True) or ""
    else:
        return ""


def as_percentage(value: float = 0) -> str:
    """generate a percentage string

    Args:
        value (float, optional): the value you want to use. Defaults to 0.

    Returns:
        str: string with the value formatted.
    """
    value = value or 0
    if value != 0:
        return f"{with_decimals((float(value) * 100), 0)}%"
    else:
        return ""


def as_currency(value: float = 0) -> str:
    """
    Return a string with the value in the format $dd.dd
    Args:
        value (float, optional): the value you want to use. Defaults to 0.
    Returns:
        str: string with the value formatted.
    """
    value = value or 0
    if value != 0:
        value = currency(float(value), grouping=True).replace(" ", ",")
        return f"{value[0]} {value[2:]}"
    else:
        return ""


def as_date(date="hoy") -> str:
    """
    Return a string with the date in the format yyyy-mm-dd in spanish.
    Args:
        date (str, optional): the date to be formatted. Defaults to "hoy".
    Returns:
        str: string with the date formatted.
    """
    date = date or "hoy"
    return parse(str(date)).strftime("%Y-%m-%d")


def as_complete_date(date="hoy"):
    """
    Return a string with the date in the format dd de mm del yyyy in spanish.
    Args:
        date (str, optional): the date to be formatted. Defaults to "hoy".
    Returns:
        str: string with the date formatted.
    """
    date = date or "hoy"
    return parse(str(date)).replace(tzinfo=tzInfo).strftime("%d de %B del %Y")