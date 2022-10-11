from sqlalchemy import CheckConstraint, Column, DateTime, Text, text

from .... import db, ma


class LoggedActions(db.Model):
    """Class for the logged_actions table"""
    __tablename__ = 'logged_actions'
    __table_args__ = (CheckConstraint("action = ANY (ARRAY['I'::text, 'D'::text, 'U'::text])"))

    schema_name=Column(Text, nullable=False)
    table_name=Column(Text, nullable=False)
    user_name=Column(Text)
    action_tstamp=Column(DateTime(True),\
        nullable=False, index=True, server_default=text("CURRENT_TIMESTAMP")),
    action=Column( Text, nullable=False, index=True)
    original_data=Column(Text)
    new_data=Column(Text)
    query = Column(Text)
    client_addr=Column(Text)
    schema='audit'

class LoggedActionsSchema(ma.Schema):
    class Meta:
        model = LoggedActions

logged_actions_schema = LoggedActionsSchema()
logged_actions_schemas = LoggedActionsSchema(many=True)
