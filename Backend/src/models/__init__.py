from typing import Any, Dict, List, Optional, Tuple

from flask_admin.contrib.geoa import ModelView
from marshmallow import ValidationError, post_dump, pre_load

from .. import config, ma
from ..utils.geom_schema import GeometryField

schema = ma.SQLAlchemyAutoSchema


def create_schema(
    model,
    schema_args: Optional[List[Tuple[str, Any]]] = None,
    **meta_kwargs: Optional[Dict[str, Any]],
) -> object:
    class Model(model):
        pass

    class Schema(schema):
        """Class for schema.
        Example:
            >>> Schema().dump(model)->dict
            >>> Schema().load(model)
            >>> Schema(many=True).dump(model)->list
            >>> Schema(many=True).load(model)
        Args:
            SQLAlchemyAutoSchema (class): class for schema.
        Attributes:
            Meta (class): class for schema.
        """

        __geometry_field_name__ = "geom"  # or geom, or shape, or ....
        geom = GeometryField()

        class Meta:
            model = Model
            load_instance = True
            include_relationships = True
            include_fk = True
            excludes = "geom"

        def unwrap_feature(self, data):
            """
            Unwrap an individual feature object
            Pull down all the properties field, and then under the geometry
            field name put in the actual geometry data
            """
            if data["type"] != "Feature":
                raise ValidationError("Expecting a Feature object")
            flat = data["properties"]
            flat[self.__geometry_field_name__] = data["geom"]
            return flat

        @pre_load(pass_many=True)
        def unwrap_envelope(self, data, many):
            if "type" not in data:
                raise ValidationError("GeoJSON type could not be found")
            if many and data["type"] != "FeatureCollection":
                raise ValidationError("Expecting a FeatureCollection object")

            if not many:
                return self.unwrap_feature(data)

            return [self.unwrap_feature(feature) for feature in data["features"]]

        def wrap_feature(self, data):
            """
            Wrap the individual feature as a GeoJSON feature object
            """
            feature = data
            if data.get(self.__geometry_field_name__) is not None:
                feature |= {
                    "geom": data.pop(self.__geometry_field_name__).get(
                        "coordinates", [0, 0]
                    ),
                }

            return feature

        @post_dump(pass_many=True)
        def wrap_with_envelope(self, data, many):
            if not many:
                return self.wrap_feature(data)

            return {
                "type": "FeatureCollection",
                "features": [self.wrap_feature(feature) for feature in data],
            }

    if schema_args is not None:
        for key, value in schema_args:
            setattr(Schema, key, value)

    for key, value in meta_kwargs.items():
        if "model" == key:
            continue
        if "exclude" == key:
            value += ["geom"]

        setattr(Schema.Meta, key, value)

    return Schema


class Template:
    model: object = None
    schema = None
    current: Optional[object] = None
    create_schema = create_schema
    db: object

    def __init__(
        self, model, db, schema_args: Optional[List] = [], **schema_kwargs
    ) -> None:
        self.model = model
        self.schema = create_schema(
            model=self.model, schema_args=schema_args, **schema_kwargs
        )
        self.check_attr()
        self.db = db

    def check_attr(self):
        if self.model is None:
            raise ValueError("Model is not defined")
        if self.schema is None:
            self.schema = create_schema(model=self.model)
        return True

    def __enter__(self):
        if self.check_attr():
            return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.model = None
        self.schema = None
        self.current = None

    def __call__(self) -> Any:
        return self.current

    def get(
        self,
        id: int,
        to_dict: bool = False,
        exclude: Optional[List[str]] = None,
    ) -> Optional[object]:
        """
        Get a record by id
        Args:
            id (int): The id of the record
            to_dict (bool): Whether to return a dictionary or an object
            exclude (list): List of fields to exclude
        Returns:
            object: The record
        """
        self.check_attr()
        with self.db as db:
            session = db.create_session()
            self.current = session.query(self.model).get(id)
            db.close_session(session)
        if to_dict or exclude is not None and len(exclude) > 0:
            return self.to_dict(exclude=exclude)
        return self.current

    def filter(
        self, to_dict: bool = False, exclude: Optional[List[str]] = None, **kwargs
    ) -> Optional[object]:
        """
        Filter records
        Args:
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.check_attr()
        with self.db as db:
            session = db.create_session()
            try:
                self.current = session.query(self.model).filter_by(**kwargs).one()
            except Exception as e:
                print(e)
                self.current = None
            db.close_session(session)
        if to_dict or exclude is not None and len(exclude) > 0:
            return self.to_dict(exclude=exclude)
        return self.current

    def filter_group(
        self, to_list: bool = False, exclude: Optional[List[str]] = None, **kwargs
    ) -> Optional[object]:
        """
        Filter records
        Args:
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.check_attr()
        with self.db as db:
            session = db.create_session()
            self.current = session.query(self.model).filter_by(**kwargs).all()
            db.close_session(session)
        if to_list or exclude is not None and len(exclude) > 0:
            return self.to_list(exclude=exclude)
        return self.current

    def all(
        self,
        to_list: bool = False,
        exclude: Optional[List[str]] = None,
    ) -> Optional[object]:
        """
        Get all records
        Returns:
            object: The record
        """
        self.check_attr()
        with self.db as db:
            session = db.create_session()
            self.current = session.query(self.model).all()
            db.close_session(session)
        if to_list or exclude is not None and len(exclude) > 0:
            return self.to_list(exclude=exclude)
        return self.current

    def create(
        self, to_dict: bool = False, exclude: Optional[List[str]] = None, **kwargs
    ) -> Optional[object]:
        """
        Create a record
        Args:
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.check_attr()
        with self.db as db:
            session = db.create_session()
            self.current = self.model(**kwargs)
            try:
                session.add(self.current)
                session.commit()
                db.close_session(session)
            except Exception as e:
                print(e)
                session.rollback()
                db.close_session(session)
                return None
            else:
                if to_dict or exclude is not None and len(exclude) > 0:
                    return self.to_dict(exclude=exclude)
                return self.current

    def update(
        self,
        id: Optional[int] = None,
        to_dict: bool = False,
        exclude: Optional[List[str]] = None,
        **kwargs,
    ) -> Optional[object]:
        """
        Update a record
        Args:
            id (int): The id of the record
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.check_attr()
        with self.db as db:
            session = db.create_session()
            if id is not None:
                self.current = session.query(self.model).get(id)
            for key, value in kwargs.items():
                setattr(self.current, key, value)
            try:
                session.merge(self.current)
                session.commit()
                session.refresh(self.current)
                db.close_session(session)
            except Exception as e:
                print(e)
                session.rollback()
                db.close_session(session)
                return None
            else:
                if to_dict or exclude is not None and len(exclude) > 0:
                    self.to_dict(exclude=exclude)
                return self.current

    def to_dict(
        self, data: Optional[object] = None, exclude: Optional[List[str]] = None
    ) -> Dict:
        self.check_attr()
        if data is not None:
            self.current = data
        if self.current is None:
            return {}
        if exclude is not None:
            return self.schema(exclude=exclude).dump(self.current)
        return self.schema().dump(self.current)

    def to_list(
        self, data: Optional[object] = None, exclude: Optional[List[str]] = None
    ) -> List:
        self.check_attr()
        if data is not None:
            self.current = data
        if self.current is None:
            return []
        if exclude is not None:
            return self.schema(exclude=exclude, many=True).dump(self.current)
        return self.schema(many=True).dump(self.current)


from .catastral import Catastral
from .costos_construccion import CostosConstruccion
from .dataset import Dataset
from .departamento_solicitante import DepartamentosSolicitantes
from .homologacion import Homologacion
from .indicadores_municipales import IndicadoresMunicipales
from .justipreciacion import Justipreciacion
from .logged_actions import LoggedActions
from .municipios import Municipios
from .obras_complementarias import ObrasComplementarias


class Modelos(object):
    Catastral = Catastral
    CostosConstruccion = CostosConstruccion
    Dataset = Dataset
    DepartamentosSolicitantes = DepartamentosSolicitantes
    Homologacion = Homologacion
    IndicadoresMunicipales = IndicadoresMunicipales
    Justipreciacion = Justipreciacion
    LoggedActions = LoggedActions
    Municipios = Municipios
    ObrasComplementarias = ObrasComplementarias


config.admin.add_view(
    ModelView(
        Catastral().model,
        config.db.valuaciones.create_session(),
        name="Catastral",
        endpoint="catastral",
        category="Catastral",
    )
)
config.admin.add_view(
    ModelView(
        CostosConstruccion().model,
        config.db.valuaciones.create_session(),
        name="Costos Construccion",
        endpoint="CostosConstruccion",
        category="Valuaciones",
    )
)
config.admin.add_view(
    ModelView(
        DepartamentosSolicitantes().model,
        config.db.valuaciones.create_session(),
        name="Departamentos Solicitantes",
        endpoint="DepartamentosSolicitantes",
        category="Valuaciones",
    )
)
config.admin.add_view(
    ModelView(
        Homologacion().model,
        config.db.valuaciones.create_session(),
        name="Homologación de Terrenos y Rentas",
        endpoint="Homologacion",
        category="Valuaciones",
    )
)
config.admin.add_view(
    ModelView(
        IndicadoresMunicipales().model,
        config.db.valuaciones.create_session(),
        name="Indicadores Municipales",
        endpoint="IndicadoresMunicipales",
        category="Valuaciones",
    )
)
config.admin.add_view(
    ModelView(
        Justipreciacion().model,
        config.db.valuaciones.create_session(),
        name="Justipreciacion",
        endpoint="justipreciacion",
        category="Valuaciones",
    )
)
config.admin.add_view(
    ModelView(
        LoggedActions().model,
        config.db.valuaciones.create_session(),
        name="Logged Actions",
        endpoint="LoggedActions",
        category="Registro de Operaciones de Base de Datos",
    )
)
config.admin.add_view(
    ModelView(
        Municipios().model,
        config.db.valuaciones.create_session(),
        name="Municipios",
        endpoint="Municipios",
        category="Valuaciones",
    )
)
config.admin.add_view(
    ModelView(
        ObrasComplementarias().model,
        config.db.valuaciones.create_session(),
        name="Obras Complementarias",
        endpoint="ObrasComplementarias",
        category="Valuaciones",
    )
)
config.admin.add_view(
    ModelView(
        Dataset().model,
        config.db.catastro_v2.create_session(),
        name="Metadatos",
        endpoint="Metadatos",
        category="Metadatos",
    )
)
