from app import app
from app.config import HOST, DEBUG, PORT

if HOST != None and DEBUG != None and PORT != None:
    if __name__ == "__main__":
        app.run(
            host=HOST,
            debug=DEBUG,
            port=PORT,
        )
