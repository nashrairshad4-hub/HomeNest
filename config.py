import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'homenest-super-secret-key-2026-lux-properties'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or f"sqlite:///{os.path.join(BASE_DIR, 'database.db')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB Max image upload limit
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp', 'avif'}
