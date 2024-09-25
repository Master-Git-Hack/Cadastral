from typing import Any, Dict, List, Optional, Union

from pydantic import BaseModel


def response_model(Model: Any):

    class Content(BaseModel):
        data: Optional[Union[Model, List[Model]]]
        message: Optional[str]

    class Response(BaseModel):
        status_code: int
        content: Optional[Content]
        headers: Optional[Dict]
        media_type: str

    return Response
