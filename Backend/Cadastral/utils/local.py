from locale import LC_ALL, currency, format_string, setlocale
from warnings import filterwarnings

from backports.zoneinfo import ZoneInfo
from dateparser import parse

filterwarnings(
    "ignore",
    message="The localize method is no longer necessary, as this time zone supports the fold attribute",
)

tzInfo = ZoneInfo("America/Mexico_City")
try:
    setlocale(LC_ALL, "es_MX.UTF-8")
except:
    setlocale(LC_ALL, "en_US.UTF-8")


def withDecimals(value=0, decimals=2):
    """
    Return a string with the value with the specified number of decimals.
    :param value: The value to be formatted.
    :param decimals: The number of decimals to be used.
    :return: The formatted value.
    """
    value = value or 0
    if value != 0:
        return format_string(f"%10.{decimals}f", float(value), grouping=True) or ""
    else:
        return ""


def asPercentage(value=0):
    """
    Return a string with the value as a percentage.
    :param value: The value to be formatted.
    :return: The formatted value.
    """
    value = value or 0
    if value != 0:
        return f"{withDecimals((float(value) * 100), 0)}%"
    else:
        return ""


def asCurrency(value=0):
    """
    Return a string with the value as a currency.
    :param value: The value to be formatted.
    :return: The formatted value.
    """
    value = value or 0
    if value != 0:
        value = currency(float(value), grouping=True).replace(" ", ",")
        return f"{value[0]} {value[2:]}"
    else:
        return ""


def asDate(date="hoy"):
    """
    Return a string with the date in the format yyyy-mm-dd.
    :param date: The date to be formatted.
    :return: The formatted date.\n
    Is used with the dateparser library, which is not installed by default.
    It detects the date value and return an date object, so that is the reason that the default value is "hoy".
    """
    date = date or "hoy"
    return parse(str(date)).strftime("%Y-%m-%d")


def asCompleteDate(date="hoy"):
    """
    Return a string with the date in the format dd de mm del yyyy in spanish.
    :param date: The date to be formatted.
    :return: The formatted date.\n
    Is used with the dateparser library, which is not installed by default.
    It detects the date value and return an date object, so that is the reason that the default value is "hoy".
    """
    date = date or "hoy"
    return parse(str(date)).replace(tzinfo=tzInfo).strftime("%d de %B del %Y")
