from typing import Dict, List, Optional


class Base:
    __model = None
    __schema = None
    current: Optional[object] = None

    def __init__(self, model, schema) -> None:
        self.__model = model
        self.__schema = schema

    def get(
        self,
        id: int,
        to_dict: bool = False,
        exclude: Optional[List[str]] = None,
        **kwargs,
    ) -> Optional[object]:
        """
        Get a record by id
        Args:
            id (int): The id of the record
        Returns:
            object: The record
        """
        self.current = self.__model.query.get(id)
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
        self.current = self.__model.query.filter_by(**kwargs).first()
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
        self.current = self.__model.query.filter_by(**kwargs).all()
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
        self.current = self.__model.query.all()
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
        self.__model.session.add(record)
        self.__model.session.commit()
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
        record = self.__model.query.get(id)
        for key, value in kwargs.items():
            setattr(record, key, value)
        self.__model.session.commit()
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
        if exclude is not None:
            return self.__schema(exclude=exclude).dump(self.current)
        return self.__schema().dump(self.current)

    def to_list(
        self, data: Optional[object] = None, exclude: Optional[List[str]] = None
    ) -> List:
        if data is not None:
            self.current = data
        if exclude is not None:
            return self.__schema(exclude=exclude, many=True).dump(self.current)
        return self.__schema(many=True).dump(self.current)
