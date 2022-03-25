from app import app
from app.config import HOST, PORT

if HOST is not None and PORT is not None:
    if __name__ == "__main__":
        app.run(
            host=HOST,
            port=PORT,
        )
