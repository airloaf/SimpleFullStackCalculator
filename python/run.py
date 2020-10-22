from flask import Flask
from flask_restplus import Api

# Import our api
from src.apis.calculator import api as calc_api

# Initialize flask and flaskrestplus
api = Api()
app = Flask(__name__)
api.init_app(app)
    
# add apis
api.add_namespace(calc_api)

@app.route('/')
def hello():
    return "<h1>Hello World</h1>";

if __name__ == '__main__':
    app.run(debug=True)
