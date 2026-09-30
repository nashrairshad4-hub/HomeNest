import os
from flask import Flask, render_template
from flask_login import LoginManager
from config import Config
from models import db
from models.models import User
from routes.main import main_bp
from routes.auth import auth_bp
from routes.properties import properties_bp
from routes.admin import admin_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.login_message = 'Please log in to access this page.'
    login_manager.login_message_category = 'info'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # Register blueprints
    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(properties_bp)
    app.register_blueprint(admin_bp)

    # Ensure uploads folder exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Custom Jinja filters
    @app.template_filter('format_pkr')
    def format_pkr(value):
        try:
            val = float(value)
            if val >= 10000000:
                crores = val / 10000000
                return f"PKR {crores:.2f}".rstrip('0').rstrip('.') + " Crore"
            elif val >= 100000:
                lakhs = val / 100000
                return f"PKR {lakhs:.2f}".rstrip('0').rstrip('.') + " Lakh"
            return f"PKR {val:,.0f}"
        except (ValueError, TypeError):
            return value

    # Error handlers
    @app.errorhandler(404)
    def not_found_error(error):
        return render_template('404.html'), 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return render_template('500.html'), 500

    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == '__main__':
    # Flask default port is 5000; for production/custom host bind to 0.0.0.0
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
