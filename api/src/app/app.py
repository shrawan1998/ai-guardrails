from dotenv import load_dotenv
load_dotenv(override=False)
from flask import Flask, render_template, make_response, jsonify, request
from flask_restful import Resource, reqparse, marshal
from flask_cors import CORS
from controller.chat_controller import endpoints
from controller.admin_controller import adminendpoints
from flask_smorest import Api
import secrets
from oidc import oidc
from globals import *

Globals.prepare_client_secrets()
app = Flask(__name__)

app.config["PROPAGATE_EXCEPTIONS"] = True
app.config["API_TITLE"] = "AI-Guardrails Swagger"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.3"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/api/docs" #url for documentation
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
app.config['API_SPEC_OPTIONS'] = {
        'security':[{"bearerAuth": []}],
        'components':{
            "securitySchemes":
                {
                    "bearerAuth": {
                        "type":"http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT"
                    }
                }
        }
    }

print('client_secret', Globals.oidc_client_id)

api=Api(app)
api.register_blueprint(endpoints, url_prefix="/api/chat")
api.register_blueprint(adminendpoints,name="admin", url_prefix="/api/admin")

CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*",
        "methods":['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        "allow_headers":"*"
    }
},supports_credentials=True, allow_headers='*',expose_headers='*')

app.config.update({
    'SECRET_KEY': secrets.token_hex(16),
    'OIDC_CLIENT_SECRETS': 'client_secrets.json',
    'OIDC_SCOPES': ['openid', 'email', 'profile'], 
    'OIDC_INTROSPECTION_AUTH_METHOD': 'client_secret_post',
    'OIDC_COOKIE_SECURE': False,
    'OIDC_REQUIRE_VERIFIED_EMAIL': False,
    'OIDC_USER_INFO_ENABLED': True,
    'OIDC_RESOURCE_SERVER_ONLY': True,
})

oidc.init_app(app)

def create_app():
    print("starting server")
    app.run(host = '0.0.0.0', debug=True,port=8080,threaded=True)
    return app
create_app()