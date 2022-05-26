from .. import db


def save_changes(data) -> bool:
    """
    This method saves the changes to the database
    """
    try:
        db.session.add(data)
        db.session.commit()
        return True
    except Exception as e:
        print(e)
        db.session.rollback()
        db.session.flush()
        return False
