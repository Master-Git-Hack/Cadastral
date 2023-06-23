from typing import Any, Dict, List, Optional, Tuple

from .. import config

schema = config.ma.SQLAlchemyAutoSchema


def schema(
    model: object,
    schema_args: Optional[List[Tuple[str, Any]]] = None,
    **meta_kwargs: Optional[Dict[str, Any]],
) -> object:
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

        class Meta:
            """class to handle the metadata of the schema.
            Attributes:
                model (class): The model to use for the schema.
                load_instance (bool): Whether to load the instance.
                include_relationships (bool): Whether to include the relationships.
                include_fk (bool): Whether to include the foreign keys.
            """

            pass  # Dejamos Meta vacía por ahora

    if schema_args is not None:
        for key, value in schema_args:
            setattr(Schema, key, value)
    # [('key', 'value')]
    # Asignamos el modelo al atributo model de la clase Meta
    Schema.Meta.model = model
    Schema.Meta.include_relationships = True
    Schema.Meta.load_instance = True
    Schema.Meta.include_fk = True
    for key, value in meta_kwargs.items():
        setattr(Schema.Meta, key, value)

    return Schema


class Base:
    __model: object = None
    __schema = None
    __session = None
    current: Optional[__model] = None

    def __init__(self, model) -> None:
        self.__model = model
        self.__schema = schema(self.__model)
        self.__session = config.db.session.query(self.__model)

    def __enter__(self):
        if self.__model is None:
            raise ValueError("Model is not defined")
        if self.__schema is None:
            raise ValueError("Schema is not defined")
        if self.__session is None:
            raise ValueError("Session is not defined")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.__model = None
        self.__schema = None
        self.__session = None
        self.current = None

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
        self.current = self.__session.get(id)
        if to_dict:
            if exclude is not None:
                return self.__schema(exclude=exclude).dump(self.current)
            else:
                return self.__schema().dump(self.current)
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
        self.current = self.__session.filter_by(**kwargs).first()
        if to_dict:
            if exclude is not None:
                return self.__schema(exclude=exclude).dump(self.current)
            else:
                return self.__schema().dump(self.current)
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
        self.current = self.__session.filter_by(**kwargs).all()
        if to_list:
            if exclude is not None:
                return self.__schema(exclude=exclude, many=True).dump(self.current)
            else:
                return self.__schema(many=True).dump(self.current)
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
        self.current = self.__session.all()
        if to_list:
            if exclude is not None:
                return self.__schema(exclude=exclude, many=True).dump(self.current)
            else:
                return self.__schema(many=True).dump(self.current)
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
        record = self.__model(**kwargs)
        self.__session = config.db.session
        try:
            self.__session = config.db.session
            self.__session.add(record)
            self.__session.commit()
        except Exception as e:
            print(e)
            self.__session.rollback()
            self.__session.flush()
            return None
        else:
            self.__session = config.db.session.query(self.__model)
            self.current = record
            if to_dict:
                if exclude is not None:
                    return self.__schema(exclude=exclude).dump(self.current)
                else:
                    return self.__schema().dump(self.current)
            return self.current

    def update(
        self,
        id: int,
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
        record = self.__session.query(self.__model).get(id)
        for key, value in kwargs.items():
            setattr(record, key, value)
        self.__session = config.db.session
        try:
            self.__session.merge(record)
            self.__session.commit()
            self.__session.refresh(record)
        except Exception as e:
            print(e)
            self.__session.rollback()
            self.__session.flush()
            return None
        else:
            self.__session = config.db.session.query(self.__model)
            self.current = record
            if to_dict:
                if exclude is not None:
                    return self.__schema(exclude=exclude).dump(self.current)
                else:
                    return self.__schema().dump(self.current)
            return self.current

    def to_dict(
        self, data: Optional[object] = None, exclude: Optional[List[str]] = None
    ) -> Dict:
        if data is not None:
            self.current = data
        if self.current is None:
            return {}
        if exclude is not None:
            return self.__schema(exclude=exclude).dump(self.current)
        return self.__schema().dump(self.current)

    def to_list(
        self, data: Optional[object] = None, exclude: Optional[List[str]] = None
    ) -> List:
        if data is not None:
            self.current = data
        if self.current is None:
            return []
        if exclude is not None:
            return self.__schema(exclude=exclude, many=True).dump(self.current)
        return self.__schema(many=True).dump(self.current)
