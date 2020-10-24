from flask import Flask
from flask_restplus import Api
from database import db, init_db


# Import our api
from src.apis.calculator import api as calc_api

# Initialize flask and flaskrestplus
api = Api()
app = Flask(__name__)
api.init_app(app)
init_db(app)
    
# add apis
api.add_namespace(calc_api)

if __name__ == '__main__':
    app.run(debug=True)


