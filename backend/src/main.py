from flask import Flask
from flask_cors import CORS
from routes.api import api_bp 

app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'your_secret_key'

cors = CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["GET", "POST", "PUT", "PATCH", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

app.register_blueprint(api_bp, url_prefix='/api')