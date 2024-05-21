from .database import InstanceDB, Template
from .logs import Logs
from .responses import Responses
from .security import Security


class Middlewares:
    Security = Security
    Responses = Responses
    Logs = Logs

    class Database:
        Instance = InstanceDB
        Template = Template
