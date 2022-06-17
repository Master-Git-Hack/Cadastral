from .. import db


def save_changes(data) -> bool:
    """
    This method saves the changes to the database
    """
    session = db.session
    try:
        session.add(data)
        session.commit()
        return True
    except Exception as e:
        print(e)
        session.rollback()
        session.flush()
        return False
