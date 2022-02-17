def bool2string(bool):
    if bool:
        return 'Sí'
    else:
        return 'No'
def item_validator(item, validator = None):
    if validator is None:
        if item is not None:
            return item
        else:
            return ''
    else:
        if item is not None:
            return item if validator else ''
        else:
            return ''