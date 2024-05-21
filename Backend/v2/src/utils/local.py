"""File to work with locale configuration, as money, date and number formats"""

from locale import format_string
from warnings import filterwarnings

from babel.numbers import format_currency
from dateparser import parse

filterwarnings(
    "ignore",
    message="""
    The localize method is no longer necessary, as this time zone supports the fold attribute
    """,
)
try:
    from backports.zoneinfo import ZoneInfo
except ImportError:
    from zoneinfo import ZoneInfo

tzInfo = ZoneInfo("America/Mexico_City")


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
        return format_string(f"%10.{decimals}f", float(value), grouping=True)
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
    if value == 0:
        return ""
    try:
        return format_currency(
            float(value),
            "MXN",
            locale="es_MX",
            currency_digits=True,
            group_separator=True,
        )
    except Exception as error:
        print(error)
        return "$ {:,.2f}".format(float(value))


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
    if date is None:
        date = "hoy"
    date = parse(str(date))
    if date is None:
        date = parse("hoy")
    return date.replace(tzinfo=tzInfo).strftime("%d de %B del %Y")
