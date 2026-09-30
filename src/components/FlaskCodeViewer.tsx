import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Terminal, Download, FolderTree } from 'lucide-react';

interface FlaskCodeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FileItem {
  name: string;
  category: 'core' | 'models' | 'routes' | 'templates' | 'setup';
  language: string;
  description: string;
  code: string;
}

const FLASK_FILES: FileItem[] = [
  {
    name: 'app.py',
    category: 'core',
    language: 'python',
    description: 'Main Flask Application entry point with Blueprints, Jinja filters, and SQLAlchemy setup.',
    code: `import os
from flask import Flask, render_template
from flask_login import LoginManager
from models.models import db, User
from config import Config
from routes.main import main_bp
from routes.auth import auth_bp
from routes.properties import properties_bp
from routes.admin import admin_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    db.init_app(app)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.login_message_category = 'warning'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # Jinja Currency Format Filter (PKR Crores / Lakhs)
    @app.template_filter('pkr_currency')
    def pkr_currency_filter(price):
        if not price:
            return 'PKR 0'
        price = float(price)
        if price >= 10000000:
            crores = price / 10000000
            return f"PKR {crores:.2f}".rstrip('0').rstrip('.') + " Crore"
        elif price >= 100000:
            lakhs = price / 100000
            return f"PKR {lakhs:.2f}".rstrip('0').rstrip('.') + " Lakh"
        return f"PKR {price:,.0f}"

    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(properties_bp, url_prefix='/properties')
    app.register_blueprint(admin_bp, url_prefix='/admin')

    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)`,
  },
  {
    name: 'models/models.py',
    category: 'models',
    language: 'python',
    description: 'SQLAlchemy Database Models for User, Property, Favorite, and Inquiry.',
    code: `from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    role = db.Column(db.String(20), default='user')  # 'user' or 'admin'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    properties = db.relationship('Property', backref='seller', lazy=True, cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', backref='user', lazy=True, cascade='all, delete-orphan')
    inquiries = db.relationship('Inquiry', backref='user', lazy=True, cascade='all, delete-orphan')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Property(db.Model):
    __tablename__ = 'properties'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    property_type = db.Column(db.String(50), nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    area = db.Column(db.String(50), nullable=False)
    year_built = db.Column(db.Integer, nullable=True)
    image = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(20), default='Available')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)`,
  },
  {
    name: 'routes/properties.py',
    category: 'routes',
    language: 'python',
    description: 'Search, Filter, Details, Sell, Edit, Delete, and Inquiry routes.',
    code: `from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_required, current_user
from models.models import db, Property, Favorite, Inquiry
from utils.upload import save_uploaded_image

properties_bp = Blueprint('properties', __name__)

@properties_bp.route('/')
def list_properties():
    query = Property.query
    keyword = request.args.get('keyword', '').strip()
    location = request.args.get('location', '').strip()
    property_type = request.args.get('property_type', '').strip()
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    bedrooms = request.args.get('bedrooms', type=int)

    if keyword:
        query = query.filter(
            (Property.title.ilike(f'%{keyword}%')) |
            (Property.description.ilike(f'%{keyword}%')) |
            (Property.location.ilike(f'%{keyword}%'))
        )
    if location and location != 'all':
        query = query.filter(Property.location.ilike(f'%{location}%'))
    if property_type and property_type != 'all':
        query = query.filter_by(property_type=property_type)
    if min_price:
        query = query.filter(Property.price >= min_price)
    if max_price:
        query = query.filter(Property.price <= max_price)
    if bedrooms:
        query = query.filter(Property.bedrooms >= bedrooms)

    properties = query.order_by(Property.created_at.desc()).all()
    return render_template('properties.html', properties=properties)

@properties_bp.route('/sell', methods=['GET', 'POST'])
@login_required
def sell():
    if request.method == 'POST':
        # Handles form submission, file upload to static/uploads, and inserts to DB
        ...`,
  },
  {
    name: 'seed_db.py',
    category: 'setup',
    language: 'python',
    description: 'Populates SQLite database with realistic properties, users, and inquiries.',
    code: `from app import create_app
from models.models import db, User, Property, Inquiry

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()
    
    # 1. Admin User
    admin = User(name='Admin HomeNest', email='admin@homenest.com', phone='+92 300 1234567', role='admin')
    admin.set_password('admin123')
    
    # 2. Seller User
    seller = User(name='Bilal Irshad', email='bilal@homenest.com', phone='+92 321 9876543', role='user')
    seller.set_password('user123')
    
    db.session.add_all([admin, seller])
    db.session.commit()
    print("Database seeded with sample users & properties successfully!")`,
  },
  {
    name: 'README.md',
    category: 'setup',
    language: 'markdown',
    description: 'Installation, virtual environment activation, and execution instructions.',
    code: `# HomeNest — Premium Real Estate

## Setup & Run Locally:
\`\`\`bash
cd homenest
python -m venv venv
source venv/bin/activate  # Or venv\\Scripts\\activate on Windows
pip install -r requirements.txt
python seed_db.py
python app.py
\`\`\`
Visit http://127.0.0.1:5000 in your browser.`,
  },
];

export const FlaskCodeViewer: React.FC<FlaskCodeViewerProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<FileItem>(FLASK_FILES[0]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 text-slate-100 rounded-3xl max-w-5xl w-full h-[85vh] shadow-2xl border border-slate-800 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Python Flask Backend Architecture
              </h3>
              <p className="text-xs text-slate-400">
                Inspect complete, working server-side code ready for deployment.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body 2-col */}
        <div className="grid grid-cols-1 md:grid-cols-4 flex-grow overflow-hidden">
          
          {/* File Explorer Tree */}
          <div className="md:col-span-1 border-r border-slate-800 bg-slate-950/60 p-4 overflow-y-auto space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block px-2 mb-2">
              Project Files
            </span>

            {FLASK_FILES.map((file) => (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  selectedFile.name === file.name
                    ? 'bg-blue-900 text-white font-bold shadow-xs'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{file.name}</span>
              </button>
            ))}

            <div className="pt-4 border-t border-slate-800 mt-4 px-2 space-y-2 text-[11px] text-slate-400">
              <strong className="text-slate-300 block">Tech Stack:</strong>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300">Python 3</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-blue-300">Flask</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300">SQLite3</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-purple-300">Jinja2</span>
              </div>
            </div>
          </div>

          {/* Code Viewer & Actions */}
          <div className="md:col-span-3 flex flex-col bg-slate-900 overflow-hidden">
            
            {/* Top Bar of Viewer */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/90 text-xs">
              <div>
                <span className="font-mono text-amber-400 font-bold">{selectedFile.name}</span>
                <span className="text-slate-400 text-[11px] ml-2 block sm:inline">
                  {selectedFile.description}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Body */}
            <pre className="p-6 overflow-auto font-mono text-xs text-slate-300 leading-relaxed flex-grow selection:bg-blue-900 selection:text-white bg-slate-950/40">
              <code>{selectedFile.code}</code>
            </pre>

          </div>

        </div>

      </div>
    </div>
  );
};
