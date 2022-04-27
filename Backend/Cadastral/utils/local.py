from locale import setlocale, LC_ALL, currency, format_string
from backports.zoneinfo import ZoneInfo
from dateparser import parse

tzInfo = ZoneInfo("America/Mexico_City")
try:

    setlocale(LC_ALL, "es_MX.UTF-8")
except:
    setlocale(LC_ALL, "en_US.UTF-8")


def withDecimals(value=0, decimals=2):
    value = value or 0
    if value != 0:
        return format_string(f"%10.{decimals}f", float(value), grouping=True) or ""
    else:
        return ""


def asPercentage(value=0):
    value = value or 0
    if value != 0:
        return f"{withDecimals((float(value) * 100), 0)}%"
    else:
        return ""


def asCurrency(value=0):
    value = value or 0
    if value != 0:
        value = currency(float(value), grouping=True).replace(" ", ",")
        return f"{value[0]} {value[2:]}"
    else:
        return ""


def asDate(date="hoy"):
    date = date or "hoy"
    return parse(str(date)).strftime("%Y-%m-%d")


def asCompleteDate(date="hoy"):
    date = date or "hoy"
    return parse(str(date)).replace(tzinfo=tzInfo).strftime("%d de %B del %Y")
