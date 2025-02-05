from .database import Instance, Template
from .response import Responses
from .websocket import ConnectionManager


class Middlewares:
    INSTANCE = Instance
    TEMPLATE = Template
    RESPONSES = Responses

    CONNECTION_MANAGER = ConnectionManager


# Ejemplo de uso
# from mymodule import MyClass
# my_class = MyClass()
# print(my_class.RESPONSE)  # Aquí tendrías acceso a la clase importada de Responses.py
