"""Main file, used to run the application.
Import the app from src/__init__.py and run it with uvicorn.
runing the application with uvicorn main:app --reload for development

"""

from uvicorn import run

from v2 import app, config

if __name__ == "__main__":
    # uvicorn main:app --host 0.0.0.0 --port 5000 --workers 4 --reload
    run("main:app", **config.uvicorn_params)
