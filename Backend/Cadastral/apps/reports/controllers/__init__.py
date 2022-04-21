from regex import P
from Cadastral.apps.reports.models.catastral import (
    Catastral,
    manyCatastralSchema,
    session,
)
from Cadastral.apps.reports.models.dep_solicitante import DepSolicitante
from Cadastral.apps.reports.models.municipios import Municipios
from Cadastral.utils.locale import (
    asCompleteDate,
    asDate,
    asCurrency,
    asPercentage,
    withDecimals,
)


def check(collection, begin, end, year):
    return manyCatastralSchema.dump(
        Catastral.query.filter(Catastral.estatus != 0)
        .filter(
            Catastral.registro.between(
                f"{collection}-{begin}_{year}", f"{collection}-{end}_{year}"
            )
        )
        .order_by(Catastral.registro)
        .all()
    )


def get(data):
    records = check(
        collection=data["collection"],
        begin=data["begin"],
        end=data["end"],
        year=data["year"],
    )
    for record in records:
        query = (
            session.query(Catastral, Municipios.nombre_utf, DepSolicitante.secretaria)
            .join(DepSolicitante, Catastral.solicitante == DepSolicitante.descripcion)
            .join(Municipios, Catastral.municipio == Municipios.nombre)
            .filter(Catastral.estatus != 0)
            .filter(Catastral.id == record["id"])
            .first()
        )
        response = formatResponse(query)
        print(response)

    return get


def concat(itemA, itemB, itemC, itemD):
    text = ""
    list = [
        "A.",
        ", B.",
        ", C.",
        ", D.",
    ]
    if itemA is not None:
        text += f"{list[0]}{itemA}"
        list.pop(0)
    if itemB is not None:
        text += f"{list[0]}{itemB}"
        list.pop(0)
    if itemC is not None:
        text += f"{list[0]}{itemC}"
        list.pop(0)
    if itemD is not None:
        text += f"{list[0]}{itemD}"
        list.pop(0)
    return f"{text}."


def yesNo(item):
    return "Sí" if item else "No"


def verifyText(item):
    return item or ""


def verifyDate(item):
    return item or "hoy"


def verifyNumber(item):
    return item or 0


def formatResponse(data):
    return {
        "id": verifyText(data.Catastral.id),
        "registro": verifyText(data.Catastral.registro),
        "solicitante": verifyText(data.Catastral.solicitante),
        "oficio_solicitud": verifyText(data.Catastral.oficio_solicitud),
        "fecha_solicitud": asDate(verifyDate(data.Catastral.fecha_solicitud)),
        "adquiriente": verifyText(data.Catastral.adquiriente),
        "objetivo_avaluo": verifyText(data.Catastral.objetivo_avaluo),
        "proposito_avaluo": verifyText(data.Catastral.proposito_avaluo),
        "inmueble_valua": verifyText(data.Catastral.inmueble_valua),
        "zona_utm": verifyText(data.Catastral.zona_utm),
        "calle": verifyText(data.Catastral.calle),
        "numero": verifyText(data.Catastral.numero),
        "colonia_poblacion": verifyText(data.Catastral.colonia_poblacion),
        "municipio": verifyText(data.nombre_utf).upper(),
        "x_utm": withDecimals(verifyNumber(data.Catastral.x_utm), 0),
        "y_utm": withDecimals(verifyNumber(data.Catastral.y_utm), 0),
        "teniente": verifyText(data.Catastral.teniente),
        "propietario": data.Catastral.propietario,
        "cuenta_predial": data.Catastral.cuenta_predial,
        "cuc": data.Catastral.cuc,
        "clasificacion_zona": data.Catastral.clasificacion_zona,
        "uso_dominante": data.Catastral.uso_dominante,
        "tipo_constr_dominante": data.Catastral.tipo_constr_dominante,
        "agua": yesNo(data.Catastral.agua),
        "drenaje": yesNo(data.Catastral.drenaje),
        "energia_electrica": yesNo(data.Catastral.energia_electrica),
        "telefonia": yesNo(data.Catastral.telefonia),
        "tipo_pavimento": data.Catastral.tipo_pavimento,
        "alumbrado_publico": yesNo(data.Catastral.alumbrado_publico),
        "banqueta": yesNo(data.Catastral.banqueta),
        "cna_edad": data.Catastral.cna_edad,
        "cnb_edad": data.Catastral.cnb_edad,
        "cnc_edad": data.Catastral.cnc_edad,
        "cnd_edad": data.Catastral.cnd_edad,
        "indice_saturacion": data.Catastral.indice_saturacion,
        "topografia": data.Catastral.topografia,
        "myc_segun": data.Catastral.myc_segun,
        "muros": concat(
            data.Catastral.muros,
            data.Catastral.cnb_muros,
            data.Catastral.cnc_muros,
            data.Catastral.cnd_muros,
        ),
        "carpinteria": concat(
            data.Catastral.carpinteria,
            data.Catastral.cnb_carpinteria,
            data.Catastral.cnc_carpinteria,
            data.Catastral.cnd_carpinteria,
        ),
        "estructura": concat(
            data.Catastral.estructura,
            data.Catastral.cnb_estructura,
            data.Catastral.cnc_estructura,
            data.Catastral.cnd_estructura,
        ),
        "inst_electrica": concat(
            data.Catastral.inst_electrica,
            data.Catastral.cnb_inst_electrica,
            data.Catastral.cnc_inst_electrica,
            data.Catastral.cnd_inst_electrica,
        ),
        "col1": data.Catastral.col1,
        "med1": data.Catastral.med1,
        "entrepisos": concat(
            data.Catastral.entrepisos,
            data.Catastral.cnb_entrepisos,
            data.Catastral.cnc_entrepisos,
            data.Catastral.cnd_entrepisos,
        ),
        "inst_sanitaria": concat(
            data.Catastral.inst_sanitaria,
            data.Catastral.cnb_inst_sanitaria,
            data.Catastral.cnc_inst_sanitaria,
            data.Catastral.cnd_inst_sanitaria,
        ),
        "col2": data.Catastral.col2,
        "med2": data.Catastral.med2,
        "techos": concat(
            data.Catastral.techos,
            data.Catastral.cnb_techos,
            data.Catastral.cnc_techos,
            data.Catastral.cnd_techos,
        ),
        "inst_especial": concat(
            data.Catastral.inst_especial,
            data.Catastral.cnb_inst_especial,
            data.Catastral.cnc_inst_especial,
            data.Catastral.cnd_inst_especial,
        ),
        "col3": data.Catastral.col3,
        "med3": data.Catastral.med3,
        "pisos": concat(
            data.Catastral.pisos,
            data.Catastral.cnb_pisos,
            data.Catastral.cnc_pisos,
            data.Catastral.cnd_pisos,
        ),
        "acabado_exterior": concat(
            data.Catastral.acabado_exterior,
            data.Catastral.cnb_acabado_exterior,
            data.Catastral.cnc_acabado_exterior,
            data.Catastral.cnd_acabado_exterior,
        ),
        "col4": data.Catastral.col4,
        "med4": data.Catastral.med4,
        "puertas": concat(
            data.Catastral.puertas,
            data.Catastral.cnb_puertas,
            data.Catastral.cnc_puertas,
            data.Catastral.cnd_puertas,
        ),
        "acabado_interior": concat(
            data.Catastral.acabado_interior,
            data.Catastral.cnb_acabado_interior,
            data.Catastral.cnc_acabado_interior,
            data.Catastral.cnd_acabado_interior,
        ),
        "col5": data.Catastral.col5,
        "med5": data.Catastral.med5,
        "ventanas": concat(
            data.Catastral.ventanas,
            data.Catastral.cnb_ventanas,
            data.Catastral.cnc_ventanas,
            data.Catastral.cnd_ventanas,
        ),
        "muebles_sanitarios": concat(
            data.Catastral.muebles_sanitarios,
            data.Catastral.cnb_muebles_sanitarios,
            data.Catastral.cnc_muebles_sanitarios,
            data.Catastral.cnd_muebles_sanitarios,
        ),
        "sp1_superficie": data.Catastral.sp1_superficie,
        "sp1_vu": data.Catastral.sp1_vu,
        "sp1_factor": data.Catastral.sp1_factor,
        "sp1_valor_parcial": data.Catastral.sp1_valor_parcial,
        "cna_tipo": data.Catastral.cna_tipo,
        "cna_vida_util": data.Catastral.cna_vida_util,
        "cna_estado": data.Catastral.cna_estado,
        "cna_superficie": data.Catastral.cna_superficie,
        "cna_vu": data.Catastral.cna_vu,
        "cna_factor": data.Catastral.cna_factor,
        "cna_valor_parcial": data.Catastral.cna_valor_parcial,
        "sp2_superficie": data.Catastral.sp2_superficie,
        "sp2_vu": data.Catastral.sp2_vu,
        "sp2_factor": data.Catastral.sp2_factor,
        "sp2_valor_parcial": data.Catastral.sp2_valor_parcial,
        "cnb_tipo": data.Catastral.cnb_tipo,
        "cnb_vida_util": data.Catastral.cnb_vida_util,
        "cnb_estado": data.Catastral.cnb_estado,
        "cnb_superficie": data.Catastral.cnb_superficie,
        "cnb_vu": data.Catastral.cnb_vu,
        "cnb_factor": data.Catastral.cnb_factor,
        "cnb_valor_parcial": data.Catastral.cnb_valor_parcial,
        "sp3_superficie": data.Catastral.sp3_superficie,
        "sp3_vu": data.Catastral.sp3_vu,
        "sp3_factor": data.Catastral.sp3_factor,
        "sp3_valor_parcial": data.Catastral.sp3_valor_parcial,
        "cnc_tipo": data.Catastral.cnc_tipo,
        "cnc_vida_util": data.Catastral.cnc_vida_util,
        "cnc_estado": data.Catastral.cnc_estado,
        "cnc_superficie": data.Catastral.cnc_superficie,
        "cnc_vu": data.Catastral.cnc_vu,
        "cnc_factor": data.Catastral.cnc_factor,
        "cnc_valor_parcial": data.Catastral.cnc_valor_parcial,
        "sp4_superficie": data.Catastral.sp4_superficie,
        "sp4_vu": data.Catastral.sp4_vu,
        "sp4_factor": data.Catastral.sp4_factor,
        "sp4_valor_parcial": data.Catastral.sp4_valor_parcial,
        "cnd_tipo": data.Catastral.cnd_tipo,
        "cnd_vida_util": data.Catastral.cnd_vida_util,
        "cnd_estado": data.Catastral.cnd_estado,
        "cnd_superficie": data.Catastral.cnd_superficie,
        "cnd_vu": data.Catastral.cnd_vu,
        "cnd_factor": data.Catastral.cnd_factor,
        "cnd_valor_parcial": data.Catastral.cnd_valor_parcial,
        "incr_esq_superficie": data.Catastral.incr_esq_superficie,
        "incr_esq_vu": data.Catastral.incr_esq_vu,
        "incr_esq_factor": data.Catastral.incr_esq_factor,
        "incr_esq_valor_parcial": data.Catastral.incr_esq_valor_parcial,
        "sup_total_terreno": data.Catastral.sup_total_terreno,
        "valor_total_terreno": data.Catastral.valor_total_terreno,
        "sup_total_construccion": data.Catastral.sup_total_construccion,
        "valor_total_construccion": data.Catastral.valor_total_construccion,
        "vt_catastral": data.Catastral.vt_catastral,
        "croquis": f"http://172.31.113.151/reportes_avaluos/imagenes/{data.Catastral.croquis}",
        "imagen_satelital": f"http://172.31.113.151/reportes_avaluos/imagenes/{data.Catastral.foto}",
        "domicilio_geografico": data.Catastral.domicilio_geografico,
        "observaciones": data.Catastral.observaciones,
        "fecha_emision": asCompleteDate(verifyDate(data.Catastral.fecha_emision)),
        "usuario": verifyText(data.Catastral.usuario),
        "secretaria": data.secretaria,
    }
