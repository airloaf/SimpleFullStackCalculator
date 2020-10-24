from flask_restx import Namespace, Resource, reqparse, cors
from database import History, db

api = Namespace('calculator', description='Computes mathematical expressions', decorators=[cors.crossdomain(origin="*")])

calc_parser = api.parser()
calc_parser.add_argument('expression', type=str, required=True, help="The mathematical expression to compute")

@api.route('/calc')
@api.expect(calc_parser)
class Calculator(Resource):
    def post(self):
        args = calc_parser.parse_args()
        expression = args['expression']

        try:
            computation = eval(expression)

            hist = History(expression=expression, result=computation)
            db.session.add(hist)
            db.session.commit()

            return {
                "result": computation
            }

        except:
            return {
                "error" : "Error computing result"
            }, 400

@api.route('/history/<int:numItems>', defaults={'offset': 0})
@api.route('/history/<int:numItems>/<int:offset>')
class CalcHistory(Resource):
    def get(self, numItems, offset):
        result = (History.query.order_by(History.id.desc()).limit(numItems).offset(offset).all())
        results = []
        for res in range(len(result)):
            results.append(result[res].toObject())
        return {
            "history": results
        }
