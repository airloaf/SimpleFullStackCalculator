from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    db.init_app(app)

class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    expression = db.Column(db.String(120), unique=False, nullable=False)
    result = db.Column(db.String(120), unique=False, nullable=False)

    def toObject(self):
        return {
            "id": self.id,
            "expression": self.expression,
            "result": self.result
        }

    def __repr__(self):
        return '<History id=%r, eval=%r, res=%r >' % (self.id, self.expression, self.result)

