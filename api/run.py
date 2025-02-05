"""Main file, used to run the application.
Import the app from src/__init__.py and run it with uvicorn.
runing the application with uvicorn main:app --reload for development

"""

from src import main
from uvicorn import run

API = main.config.API
if __name__ == "__main__":
    # uvicorn main:app --host 0.0.0.0 --port 5000 --workers 4 --reload
    run(
        "src.main:app",
        **{
            key: value
            for key, value in API.items()
            if key not in {"title", "version", "description", "url_prefix", "debug"}
        }
    )
