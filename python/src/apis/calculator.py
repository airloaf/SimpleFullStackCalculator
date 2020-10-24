from flask_restplus import Namespace, Resource, reqparse
from database import History, db

api = Namespace('calculator', description='Computes mathematical expressions')

calc_parser = api.parser()
calc_parser.add_argument('expression', type=str, required=True, help="The mathematical expression to compute")

@api.route('/calc')
@api.expect(calc_parser)
class Calculator(Resource):
    def post(self):
        args = calc_parser.parse_args()
        expression = args['expression']

        # try:
        computation = eval(expression)
        hist = History(expression=expression, result=computation)
        db.session.add(hist)
        db.session.commit()
        print(History.query.all())
        return {
            "result": computation
        }

        # except:
        #     return {
        #         "error" : "Error computing result"
        #     }, 400

