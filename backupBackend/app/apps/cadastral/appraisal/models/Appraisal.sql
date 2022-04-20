SELECT c.*
    CONCAT('A.'||c.techos ,', B.'||c.cnb_techos ,', C.'||c.cnc_techos ,', D.'||c.cnd_techos,'.') techos,
    CONCAT('A.'||c.pisos ,', B.'||c.cnb_pisos ,', C.'||c.cnc_pisos ,', D.'||c.cnd_pisos,'.') pisos,
    CONCAT('A.'||c.puertas ,', B.'||c.cnb_puertas ,', C.'||c.cnc_puertas ,', D.'||c.cnd_puertas,'.') puertas,
    CONCAT('A.'||c.ventanas ,', B.'||c.cnb_ventanas ,', C.'||c.cnc_ventanas ,', D.'||c.cnd_ventanas,'.') ventanas,
    CONCAT('A.'||c.carpinteria ,', B.'||c.cnb_carpinteria ,', C.'||c.cnc_carpinteria ,', D.'||c.cnd_carpinteria,'.') carpinteria,
    CONCAT('A.'||c.inst_electrica ,', B.'||c.cnb_inst_electrica ,', C.'||c.cnc_inst_electrica ,', D.'||c.cnd_inst_electrica,'.') inst_electrica,
    CONCAT('A.'||c.inst_sanitaria ,', B.'||c.cnb_inst_sanitaria ,', C.'||c.cnc_inst_sanitaria ,', D.'||c.cnd_inst_sanitaria,'.') inst_sanitaria,
    CONCAT('A.'||c.inst_especial ,', B.'||c.cnb_inst_especial ,', C.'||c.cnc_inst_especial ,', D.'||c.cnd_inst_especial,'.') inst_especial,
    CONCAT('A.'||c.acabado_exterior ,', B.'||c.cnb_acabado_exterior ,', C.'||c.cnc_acabado_exterior ,', D.'||c.cnd_acabado_exterior,'.') acabado_exterior,
    CONCAT('A.'||c.acabado_interior ,', B.'||c.cnb_acabado_interior ,', C.'||c.cnc_acabado_interior ,', D.'||c.cnd_acabado_interior,'.') acabado_interior,
    CONCAT('A.'||c.muebles_sanitarios ,', B.'||c.cnb_muebles_sanitarios ,', C.'||c.cnc_muebles_sanitarios ,', D.'||c.cnd_muebles_sanitarios,'.') muebles_sanitarios,
    municipios.nombre_utf, 
    ds.secretaria 
FROM catastral c 
INNER JOIN municipios ON c.municipio=municipios.nombre 
INNER JOIN dep_solicitante ds ON c.solicitante = ds.descripcion 
WHERE estatus <> 0 
AND c.id={{ID}}