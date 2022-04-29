import Cadastral.apps.reports.views
import Cadastral.apps.homologation.views
import Cadastral.apps.homologation.views.obras_complementarias

from Cadastral import app


@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


# model = api.model('Model', {
#    'name': fields.String,
# })

# @api.route("/")
# class RootPath(Resource):
#    @api.response(201, 'Success',model)
#    @api.response(401, 'Validation Error')
#    @api.doc('test')
#    def get(self):
#        return {"message": "Hello World!"}
