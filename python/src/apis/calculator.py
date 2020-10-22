from flask_restplus import Namespace, Resource, reqparse

api = Namespace('calculator', description='Computes mathematical expressions')

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
            return {
                "result": computation
            }
        except:
            return {
                "error" : "Error computing result"
            }, 400
