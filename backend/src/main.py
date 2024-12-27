from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routes.bitcoin import btc_bp
from routes.users import users_bp
from routes.auth import auth_bp
import os

app = Flask(__name__)
jwt = JWTManager(app)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'my_secret_key_hihi')
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_default_secret_key')
app.config['JWT_TOKEN_LOCATION'] = ['cookies']  
app.config['JWT_ACCESS_COOKIE_NAME'] = 'auth_token'

cors = CORS(app, resources={
    r"/api/*": {
        "origins": os.getenv('CORS_ORIGINS', 'http://localhost:5173').split(','),
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
}, supports_credentials=True)

app.register_blueprint(btc_bp, url_prefix='/api/btc')
app.register_blueprint(users_bp, url_prefix='/api/users')
app.register_blueprint(auth_bp, url_prefix='/api/auth')

if __name__ == '__main__':
    app.run(debug=os.getenv('FLASK_DEBUG', 'true').lower() == 'true')
