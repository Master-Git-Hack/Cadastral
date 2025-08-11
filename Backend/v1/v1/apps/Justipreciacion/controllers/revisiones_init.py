@revision_ns.route("/init")
class RevisionInit(Resource):
    @revision_ns.doc("init_revision_module")
    @revision_ns.param("key", "Clave de acceso", type="str", required=True)
    @revision_ns.param("tipo", "Tipo (terreno/renta)", type="str", required=True)
    @revision_ns.param("id", "ID de homologación", type="int", required=True)
    @revision_ns.param("sp1_superficie", "Superficie", type="float")
    @revision_ns.param("sp1_factor", "Factor", type="float")
    @revision_ns.param("tipo_servicio", "Tipo de servicio", type="str")
    @revision_ns.param("username", "Usuario", type="str", required=True)
    def get(self):
        """Inicializar módulo de revisiones con parámetros URL"""
        try:
            # Obtener parámetros
            key = request.args.get("key")
            tipo = request.args.get("tipo")
            homologacion_id = request.args.get("id", type=int)
            sp1_superficie = request.args.get("sp1_superficie", type=float)
            sp1_factor = request.args.get("sp1_factor", type=float)
            tipo_servicio = request.args.get("tipo_servicio")
            username = request.args.get("username")

            if not all([key, tipo, homologacion_id, username]):
                return {"error": "Parámetros requeridos: key, tipo, id, username"}, 400

            # Verificar si existe una revisión para esta homologación
            existing_revisions = RevisionService.get_revisions_by_homologacion(
                homologacion_id, tipo.upper()
            )

            # Si no existe, crear una nueva
            if not existing_revisions:
                revision_data = {
                    "homologacion_id": homologacion_id,
                    "type": tipo.upper(),
                    "appraisal_purpose": f"Revisión {tipo_servicio or 'justipreciacion'}",
                    "assigned_reviewer": username,
                }

                revision = RevisionService.create_revision(revision_data)

                # Crear permisos básicos para el usuario
                permission_data = {
                    "user_id": username,
                    "revision_data_id": revision.id,
                    "can_read": True,
                    "can_write": True,
                    "can_approve": True,
                    "granted_by": username,
                }
                RevisionService.create_permission(permission_data)

                schema = RevisionDataSchema()
                return {
                    "message": "Módulo inicializado con nueva revisión",
                    "revision": schema.dump(revision),
                    "parameters": {
                        "tipo": tipo,
                        "homologacion_id": homologacion_id,
                        "superficie": sp1_superficie,
                        "factor": sp1_factor,
                        "tipo_servicio": tipo_servicio,
                        "username": username,
                    },
                }, 201
            else:
                # Usar la revisión existente
                schema = RevisionDataSchema(many=True)
                return {
                    "message": "Módulo inicializado con revisión existente",
                    "revisions": schema.dump(existing_revisions),
                    "parameters": {
                        "tipo": tipo,
                        "homologacion_id": homologacion_id,
                        "superficie": sp1_superficie,
                        "factor": sp1_factor,
                        "tipo_servicio": tipo_servicio,
                        "username": username,
                    },
                }

        except Exception as e:
            return {"error": str(e)}, 500
