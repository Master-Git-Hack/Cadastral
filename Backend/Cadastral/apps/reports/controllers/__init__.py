from regex import P
from Cadastral.apps.reports.models.catastral import (
    Catastral,
    manyCatastralSchema,
    session,
)
from Cadastral.apps.reports.models.dep_solicitante import DepSolicitante
from Cadastral.apps.reports.models.municipios import Municipios


def verify(item):
    return item if item is not None else ""


def yesNo(item):
    return "Sí" if item else "No"


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

    text += "."
    return text


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
        q = (
            session.query(Catastral, Municipios.nombre_utf, DepSolicitante.secretaria)
            .join(DepSolicitante, Catastral.solicitante == DepSolicitante.descripcion)
            .join(Municipios, Catastral.municipio == Municipios.nombre)
            .filter(Catastral.estatus != 0)
            .filter(Catastral.id == record["id"])
            .first()
        )
        response = {
            "id": q.Catastral.id,
            "registro": q.Catastral.registro,
            "solicitante": q.Catastral.solicitante,
            "oficio_solicitud": q.Catastral.oficio_solicitud,
            "fecha_solicitud": q.Catastral.fecha_solicitud,
            "adquiriente": q.Catastral.adquiriente,
            "objetivo_avaluo": q.Catastral.objetivo_avaluo,
            "proposito_avaluo": q.Catastral.proposito_avaluo,
            "inmueble_valua": q.Catastral.inmueble_valua,
            "zona_utm": q.Catastral.zona_utm,
            "calle": q.Catastral.calle,
            "numero": q.Catastral.numero,
            "colonia_poblacion": q.Catastral.colonia_poblacion,
            "municipio": q.Catastral.municipio,
            "x_utm": q.Catastral.x_utm,
            "y_utm": q.Catastral.y_utm,
            "teniente": q.Catastral.teniente,
            "propietario": q.Catastral.propietario,
            "cuenta_predial": q.Catastral.cuenta_predial,
            "cuc": q.Catastral.cuc,
            "clasificacion_zona": q.Catastral.clasificacion_zona,
            "tipo_constr_dominante": q.Catastral.tipo_constr_dominante,
            "agua": q.Catastral.agua,
            "drenaje": q.Catastral.drenaje,
            "energia_electrica": q.Catastral.energia_electrica,
            "telefonia": q.Catastral.telefonia,
            "tipo_pavimento": q.Catastral.tipo_pavimento,
            "alumbrado_publico": q.Catastral.alumbrado_publico,
            "banqueta": q.Catastral.banqueta,
            "cna_edad": q.Catastral.cna_edad,
            "cnb_edad": q.Catastral.cnb_edad,
            "cnc_edad": q.Catastral.cnc_edad,
            "cnd_edad": q.Catastral.cnd_edad,
            "indice_saturacion": q.Catastral.indice_saturacion,
            "topografia": q.Catastral.topografia,
            "myc_segun": q.Catastral.myc_segun,
            "muros": concat(
                q.Catastral.muros,
                q.Catastral.cnb_muros,
                q.Catastral.cnc_muros,
                q.Catastral.cnd_muros,
            ),
            "carpinteria": concat(
                q.Catastral.carpinteria,
                q.Catastral.cnb_carpinteria,
                q.Catastral.cnc_carpinteria,
                q.Catastral.cnd_carpinteria,
            ),
            "estructura": concat(
                q.Catastral.estructura,
                q.Catastral.cnb_estructura,
                q.Catastral.cnc_estructura,
                q.Catastral.cnd_estructura,
            ),
            "inst_electrica": concat(
                q.Catastral.inst_electrica,
                q.Catastral.cnb_inst_electrica,
                q.Catastral.cnc_inst_electrica,
                q.Catastral.cnd_inst_electrica,
            ),
            "col1": q.Catastral.col1,
            "med1": q.Catastral.med1,
            "entrepisos": concat(
                q.Catastral.entrepisos,
                q.Catastral.cnb_entrepisos,
                q.Catastral.cnc_entrepisos,
                q.Catastral.cnd_entrepisos,
            ),
            "inst_sanitaria": concat(
                q.Catastral.inst_sanitaria,
                q.Catastral.cnb_inst_sanitaria,
                q.Catastral.cnc_inst_sanitaria,
                q.Catastral.cnd_inst_sanitaria,
            ),
            "col2": q.Catastral.col2,
            "med2": q.Catastral.med2,
            "techos": concat(
                q.Catastral.techos,
                q.Catastral.cnb_techos,
                q.Catastral.cnc_techos,
                q.Catastral.cnd_techos,
            ),
            "inst_especial": concat(
                q.Catastral.inst_especial,
                q.Catastral.cnb_inst_especial,
                q.Catastral.cnc_inst_especial,
                q.Catastral.cnd_inst_especial,
            ),
            "col3": q.Catastral.col3,
            "med3": q.Catastral.med3,
            "pisos": concat(
                q.Catastral.pisos,
                q.Catastral.cnb_pisos,
                q.Catastral.cnc_pisos,
                q.Catastral.cnd_pisos,
            ),
            "acabado_exterior": concat(
                q.Catastral.acabado_exterior,
                q.Catastral.cnb_acabado_exterior,
                q.Catastral.cnc_acabado_exterior,
                q.Catastral.cnd_acabado_exterior,
            ),
            "col4": q.Catastral.col4,
            "med4": q.Catastral.med4,
            "puertas": concat(
                q.Catastral.puertas,
                q.Catastral.cnb_puertas,
                q.Catastral.cnc_puertas,
                q.Catastral.cnd_puertas,
            ),
            "acabado_interior": concat(
                q.Catastral.acabado_interior,
                q.Catastral.cnb_acabado_interior,
                q.Catastral.cnc_acabado_interior,
                q.Catastral.cnd_acabado_interior,
            ),
            
            "lat": q.Catastral.lat,
            "long": q.Catastral.long,
            "col5": q.Catastral.col5,
            "med5": q.Catastral.med5,
            "col6": q.Catastral.col6,
            "med6": q.Catastral.med6,
            "sp1_superficie": q.Catastral.sp1_superficie,
            "sp1_vu": q.Catastral.sp1_vu,
            "sp1_factor": q.Catastral.sp1_factor,
            "sp1_valor_parcial": q.Catastral.sp1_valor_parcial,
            "sp2_superficie": q.Catastral.sp2_superficie,
            "sp2_vu": q.Catastral.sp2_vu,
            "sp2_factor": q.Catastral.sp2_factor,
            "sp2_valor_parcial": q.Catastral.sp2_valor_parcial,
            "sp3_superficie": q.Catastral.sp3_superficie,
            "sp3_vu": q.Catastral.sp3_vu,
            "sp3_factor": q.Catastral.sp3_factor,
            "sp3_valor_parcial": q.Catastral.sp3_valor_parcial,
            "sp4_superficie": q.Catastral.sp4_superficie,
            "sp4_vu": q.Catastral.sp4_vu,
            "sp4_factor": q.Catastral.sp4_factor,
            "sp4_valor_parcial": q.Catastral.sp4_valor_parcial,
            "incr_esq_superficie": q.Catastral.incr_esq_superficie,
            "incr_esq_vu": q.Catastral.incr_esq_vu,
            "incr_esq_factor": q.Catastral.incr_esq_factor,
            "incr_esq_valor_parcial": q.Catastral.incr_esq_valor_parcial,
            "sup_total_terreno": q.Catastral.sup_total_terreno,
            "valor_total_terreno": q.Catastral.valor_total_terreno,
            "uso_dominante": q.Catastral.uso_dominante,
            "cna_tipo": q.Catastral.cna_tipo,
            "cna_vida_util": q.Catastral.cna_vida_util,
            "cna_estado": q.Catastral.cna_estado,
            "cna_superficie": q.Catastral.cna_superficie,
            "cna_vu": q.Catastral.cna_vu,
            "cna_factor": q.Catastral.cna_factor,
            "cna_valor_parcial": q.Catastral.cna_valor_parcial,
            "cnb_tipo": q.Catastral.cnb_tipo,
            "cnb_vida_util": q.Catastral.cnb_vida_util,
            "cnb_estado": q.Catastral.cnb_estado,
            "cnb_superficie": q.Catastral.cnb_superficie,
            "cnb_vu": q.Catastral.cnb_vu,
            "cnb_factor": q.Catastral.cnb_factor,
            "cnb_valor_parcial": q.Catastral.cnb_valor_parcial,
            "cnc_tipo": q.Catastral.cnc_tipo,
            "cnc_vida_util": q.Catastral.cnc_vida_util,
            "cnc_estado": q.Catastral.cnc_estado,
            "cnc_superficie": q.Catastral.cnc_superficie,
            "cnc_vu": q.Catastral.cnc_vu,
            "cnc_factor": q.Catastral.cnc_factor,
            "cnc_valor_parcial": q.Catastral.cnc_valor_parcial,
            "cnd_tipo": q.Catastral.cnd_tipo,
            "cnd_vida_util": q.Catastral.cnd_vida_util,
            "cnd_estado": q.Catastral.cnd_estado,
            "cnd_superficie": q.Catastral.cnd_superficie,
            "cnd_vu": q.Catastral.cnd_vu,
            "cnd_factor": q.Catastral.cnd_factor,
            "cnd_valor_parcial": q.Catastral.cnd_valor_parcial,
            "sup_total_construccion": q.Catastral.sup_total_construccion,
            "valor_total_construccion": q.Catastral.valor_total_construccion,
            "vt_catastral": q.Catastral.vt_catastral,
            "croquis_reverso": q.Catastral.croquis_reverso,
            "myc_segunb": q.Catastral.myc_segunb,
            "colb1": q.Catastral.colb1,
            "medb1": q.Catastral.medb1,
            "colb2": q.Catastral.colb2,
            "medb2": q.Catastral.medb2,
            "colb3": q.Catastral.colb3,
            "medb3": q.Catastral.medb3,
            "colb4": q.Catastral.colb4,
            "domicilio_geografico": q.Catastral.domicilio_geografico,
            "observaciones": q.Catastral.observaciones,
            "fecha_emision": q.Catastral.fecha_emision,
            "croquis": q.Catastral.croquis,
            "foto": q.Catastral.foto,
            "geom": q.Catastral.geom,
            "google": q.Catastral.google,
            "firmante": q.Catastral.firmante,
            "puesto": q.Catastral.puesto,
            "estatus": q.Catastral.estatus,
            "url_docs_entrada": q.Catastral.url_docs_entrada,
            "id_entrada": q.Catastral.id_entrada,
            "expediente": q.Catastral.expediente,
            "zona_catastral": q.Catastral.zona_catastral,
            "med_col": q.Catastral.med_col,
            "clave_avaluo": q.Catastral.clave_avaluo,
            "asignado_por": q.Catastral.asignado_por,
            "sector": q.Catastral.sector,
            "subsector": q.Catastral.subsector,
            "tipo_construccion": q.Catastral.tipo_construccion,
            "medb4": q.Catastral.medb4,
            "colb5": q.Catastral.colb5,
            "medb5": q.Catastral.medb5,
            "oficio_respuesta": q.Catastral.oficio_respuesta,
            "secretaria_solicitante": q.Catastral.secretaria_solicitante,
            "medidas_reverso": q.Catastral.medidas_reverso,
            "sup_totalb": q.Catastral.sup_totalb,
            "inst_esp_sup": q.Catastral.inst_esp_sup,
            "inst_esp_vu": q.Catastral.inst_esp_vu,
            "inst_esp_valor_parcial": q.Catastral.inst_esp_valor_parcial,
            "colb6": q.Catastral.colb6,
            "medb6": q.Catastral.medb6,
            "avaluo": q.Catastral.avaluo,
            "cne_tipo": q.Catastral.cne_tipo,
            "cne_vida_util": q.Catastral.cne_vida_util,
            "cne_estado": q.Catastral.cne_estado,
            "cne_edad": q.Catastral.cne_edad,
            "cne_superficie": q.Catastral.cne_superficie,
            "cne_vu": q.Catastral.cne_vu,
            "cne_factor": q.Catastral.cne_factor,
            "cne_valor_parcial": q.Catastral.cne_valor_parcial,
            "gid_domicilio": q.Catastral.gid_domicilio,
            "num_r3": q.Catastral.num_r3,
            "sub_num_r3": q.Catastral.sub_num_r3,
            "folio_real": q.Catastral.folio_real,
            "ventanas": concat(
                q.Catastral.ventanas,
                q.Catastral.cnb_ventanas,
                q.Catastral.cnc_ventanas,
                q.Catastral.cnd_ventanas,
            ),
            "muebles_sanitarios": concat(
                q.Catastral.muebles_sanitarios,
                q.Catastral.cnb_muebles_sanitarios,
                q.Catastral.cnc_muebles_sanitarios,
                q.Catastral.cnd_muebles_sanitarios,
            ),
            "nombre_utf": q.nombre_utf,
            "secretaria": q.secretaria,
        }

        print(response)

    return get
