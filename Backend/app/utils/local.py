from locale import setlocale, LC_ALL, currency, format_string
from dateparser import parse
setlocale(LC_ALL, 'es_MX.UTF-8')

def withDecimals(value = 0, decimals=2):
    return format_string(f'%10.{decimals}f', float(value), grouping=True) if value != "" and value != None and value != 0 else ""

def asPercentage(value=0):
    return f'{withDecimals((float(value) * 100), 0)}%'

def asCurrency(value = 0):
    if value != "" and value != None and value != 0:
        value = currency(float(value), grouping=True).replace(' ', ',')
        return f"{value[0]} {value[2:]}"
    else:
        return ""
    

def asCompleteDate(date='hoy'):
    return parse(str(date)).strftime('%d de %B del %Y')