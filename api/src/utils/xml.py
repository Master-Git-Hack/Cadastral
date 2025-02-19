def xml_to_dict(xml:str) -> dict:
    if len(xml) == 0:
        return xml.text
    
    result = {}
    for child in xml:
        child_result = xml_to_dict(child)
        if child.tag in result:
            if isinstance(result[child.tag], list):
                result[child.tag].append(child_result)
            else:
                result[child.tag] = [result[child.tag], child_result]
        else:
            result[child.tag] = child_result
    return result