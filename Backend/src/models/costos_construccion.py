"""
Handle everything related to the CostosConstruccion model
Define the CostosConstruccion model.
Define the CostosConstruccion schema.
Define the CostosConstruccion crud.
Export the CostosConstruccion model.
"""
from typing import Optional, Tuple

from fastapi_sqlalchemy import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from sqlalchemy import BigInteger, Boolean, Column, Float, Integer, String, Text

from ..middlewares.database import Base


class _CostosConstruccion(Base):
    """Model for CostosConstruccion.
    Example:
        >>> CostosConstruccion(data:dict)
    Args:
        Base (sqlalchemy.ext.declarative.api.DeclarativeMeta): Base model.
    Base Attributes:
        __tablename__ (str): Name of the table.
        __table_args__ (tuple): Tuple of arguments for the table.
        query (sqlalchemy.orm.query.Query): Query object.
    Attributes:
        id (int): Primary key.

    """

    __tablename__ = "calculo_valor_unitario_construccion"

    id = Column(BigInteger, primary_key=True)
    descripcion = Column(Text)
    costo_directo = Column(Float)
    indirectos = Column(Float)
    valor_neto = Column(Float)
    m2 = Column(Float)
    factor_gto = Column(Boolean, unique=False, default=False, nullable=False)
    valor_resultante = Column(Float)
    total = Column(Float)
    tipo_servicio = Column(String())
    registro = Column(String())
    redondeo = Column(Integer, default=0)
    edicion = Column(Boolean, default=False, nullable=False)

    def __init__(self, **kwargs) -> None:
        """Constructor de la tabla para el calculo del valor unitario de construccion.

        Args:
            data (dict): data array with the values to be added
        Returns:
            None
        """
        self.descripcion = kwargs.get("descripcion")
        self.costo_directo = kwargs.get("costo_directo")
        self.indirectos = kwargs.get("indirectos")
        self.valor_neto = kwargs.get("valor_neto")
        self.m2 = kwargs.get("m2")
        self.factor_gto = kwargs.get("factor_gto")
        self.valor_resultante = kwargs.get("valor_resultante")
        self.total = kwargs.get("total")
        self.tipo_servicio = kwargs.get("tipo_servicio")
        self.registro = kwargs.get("registro")
        self.redondeo = kwargs.get("redondeo")


class _Schema(SQLAlchemyAutoSchema):
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

    class Meta:
        """class to handle the metadata of the schema.
        Attributes:
            model (class): The model to use for the schema.
            load_instance (bool): Whether to load the instance.
            include_relationships (bool): Whether to include the relationships.
            include_fk (bool): Whether to include the foreign keys.
        """

        model = _CostosConstruccion
        include_relationships = True
        load_instance = True
        include_fk = True


class _Read:
    """Class to handle read operations on the account model
    Example:
        >>> Read.all()
        >>> Read.by_id(id)
        >>> Read.by_company_id(company_id)
        >>> Read.by_parent_id(parent_id)
    Attributes:
        all (method): Return all accounts.
        by_id (method): Return an account by id.
        by_company_id (method): Return an account by company id.
        by_parent_id (method): Return an account by parent id.
    """

    @staticmethod
    async def all(
        to_list: Optional[bool] = False, exclude: Optional[list] = None
    ) -> _CostosConstruccion or _Schema or None:
        """
        This method select all records from the database
        Args:
            to_list (bool, optional): If the result should be a list.
            exclude (list, optional): List of columns to exclude.
        Returns:
            response (model|dict|None): list of records
        """
        try:
            response = db.session.query(_CostosConstruccion).all()
            if to_list:
                response = _Schema(many=True).dump(response)
            if exclude is not None:
                response = _Schema(many=True, exclude=exclude).dump(response)
            return response
        except (RuntimeError, TypeError, NameError):
            print(RuntimeError)
            return None

    @staticmethod
    async def by_id(
        _id: int, to_dict: Optional[bool] = False, exclude: Optional[list] = None
    ) -> _CostosConstruccion or _Schema or None:
        """This method select a record from the database by id
        Args:
            _id (int): id to work with in the database
            to_dict (bool, optional): If the result should be a dict.
            exclude (list, optional): List of columns to exclude.
        Returns:
            response (model|dict|None): model instance
        """
        try:
            response = db.session.query(_CostosConstruccion).get(_id)
            if to_dict:
                response = _Schema().dump(response)
            if exclude is not None:
                response = _Schema(exclude=exclude).dump(response)
            return response
        except (RuntimeError, TypeError, NameError):
            print(RuntimeError)
            return None


class CostosConstruccion:
    """class to handle model operations.
    Example:
        >>> Model.create(data)->model
        >>> Model.create(data, to_dict=True)->dict
        >>> Model.update(id, data)->Tuple[bool, model]
        >>> Model.update(id, data, to_dict=True)->Tuple[bool,dict]
        >>> Model.delete(id)->Tuple[bool, model]
        >>> Model.delete(id, to_dict=True)->Tuple[bool, dict]
        >>> Model.to_dict(model)->dict
        >>> Model.to_list(model)->list

    Attributes:
        Table (class): The model class.
        Schema (class): The schema class.
        Read (class): The read class.
        create (method): The create method.
        update (method): The update method.
        delete (method): The delete method.
        to_dict (method): The to_dict method.
        to_list (method): The to_list method.
    """

    Table = _CostosConstruccion
    Schema = _Schema
    read = _Read()

    @staticmethod
    async def create(
        data: dict, to_dict: Optional[bool] = False, exclude: Optional[list] = None
    ) -> Tuple[bool, _CostosConstruccion or _Schema or None]:
        """
        This method creates a new record in the database with the current model.
        Receive a dict with the data to create the record and return a tuple
        Args:
            data (dict): data to work with
            to_dict (bool,optional): if True, return a dict, else return a model instance
            exclude (list, optional): List of columns to exclude.
        Returns:
            response (bool): True if success, False if not
            reponse_data (model): data to return
        """
        try:
            new = _CostosConstruccion(data)
            db.session.add(new)
            db.session.commit()
            db.session.refresh(new)
            response = new
            if to_dict:
                response = _Schema().dump(new)
            if exclude is not None:
                response = _Schema(exclude=exclude).dump(response)
            return True, response
        except (RuntimeError, TypeError, NameError):
            print(RuntimeError)
            db.session.rollback()
            db.session.flush()
            return False, None

    @staticmethod
    async def update(
        _id: int,
        data: dict,
        to_dict: Optional[bool] = False,
        exclude: Optional[list] = None,
    ) -> Tuple[bool, _CostosConstruccion or _Schema or None]:
        """This method updates the current model in the database
        Receive a id and a dict with the data to update\
in a loop check the items in the dict and update the record\
and return a tuple with the results
        Args:
            _id (int): id to work with in the database
            data (dict): data to work with
            to_dict (bool, optional): if True, return a dict, else return a model instance
            exclude (list, optional): List of columns to exclude.
        Returns:
            response (bool): True if success, False if not
            response_data (model): data to return
        """
        current_entity = db.session.query(_CostosConstruccion).get(_id)
        if current_entity is None:
            return False, None
        try:
            for key, item in data.items():
                setattr(current_entity, key, item)
            db.session.merge(current_entity)
            db.session.commit()
            response = current_entity
            if to_dict:
                response = _Schema().dump(current_entity)
            if exclude is not None:
                response = _Schema(exclude=exclude).dump(response)
            return True, response
        except (RuntimeError, TypeError, NameError):
            print(RuntimeError)
            db.session.rollback()
            db.session.flush()
            return False, None

    @staticmethod
    async def delete(
        _id: int, to_dict: Optional[bool] = False, exclude: Optional[list] = None
    ) -> Tuple[bool, _CostosConstruccion or _Schema or None]:
        """
        This method deletes a record from the database.
        Receive a id and return a tuple with the results.
        Args:
            _id (int): id to work with in the database
            to_dict (bool,optional): if True, return a dict, else return a model instance
            exclude (list, optional): List of columns to exclude.
        Returns:
            response (bool): True if success, False if not
            response_data (model): data to return
        """
        current_entity = db.session.query(_CostosConstruccion).get(_id)
        if current_entity is None:
            return False, None
        try:
            db.session.delete(current_entity)
            db.session.commit()
            response = current_entity
            if to_dict:
                response = _Schema().dump(current_entity)
            if exclude is not None:
                response = _Schema(exclude=exclude).dump(response)
            return True, response
        except (RuntimeError, TypeError, NameError):
            print(RuntimeError)
            db.session.rollback()
            db.session.flush()
            return False, None

    @staticmethod
    def to_dict(entity: _CostosConstruccion, exclude: Optional[list] = None) -> _Schema:
        """Pass a model instance to a dict
        Args:
            entity (model instance): data to work with
            exclude (list): list of fields to exclude
        Returns:
            response (dict): dict with data
        """
        if exclude is not None:
            _Schema(exclude=exclude).dump(entity)
        return _Schema().dump(entity)

    @staticmethod
    def to_list(entities: _CostosConstruccion, exclude: Optional[list] = None) -> list:
        """Pass a model instance to a dict
        Args:
            entities (model): data to work with

        Returns:
            response (list): list with data
        """
        if exclude is not None:
            return _Schema(many=True, exclude=exclude).dump(entities)
        return _Schema(many=True).dump(entities)
