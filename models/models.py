from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from . import db

class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    phone = db.Column(db.String(20), nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='user', nullable=False)  # 'user' or 'admin'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    properties = db.relationship('Property', backref='seller', lazy=True, cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', backref='user', lazy=True, cascade='all, delete-orphan')
    inquiries = db.relationship('Inquiry', backref='inquirer', lazy=True, cascade='all, delete-orphan')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def is_admin(self):
        return self.role == 'admin'

    def __repr__(self):
        return f'<User {self.email}>'


class Property(db.Model):
    __tablename__ = 'properties'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)  # Stored in numeric format, e.g. 45000000 for 4.5 Crore
    location = db.Column(db.String(100), nullable=False)  # City / Area (e.g., 'Faisalabad', 'Lahore')
    address = db.Column(db.String(255), nullable=False)
    property_type = db.Column(db.String(50), nullable=False)  # 'House', 'Villa', 'Apartment', 'Penthouse', 'Commercial'
    bedrooms = db.Column(db.Integer, default=1, nullable=False)
    bathrooms = db.Column(db.Integer, default=1, nullable=False)
    area = db.Column(db.String(50), nullable=False)  # e.g., '1 Kanal', '10 Marla', '3500 Sq Ft'
    year_built = db.Column(db.Integer, default=datetime.utcnow().year)
    image = db.Column(db.String(500), nullable=False)  # Main featured image (URL or local path)
    gallery_images = db.Column(db.Text, default='[]')  # JSON serialized list of image URLs/paths
    amenities = db.Column(db.Text, default='[]')  # JSON serialized list of amenities
    status = db.Column(db.String(20), default='Available', nullable=False)  # 'Available', 'Sold', 'Pending'
    featured = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    inquiries = db.relationship('Inquiry', backref='property', lazy=True, cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', backref='property', lazy=True, cascade='all, delete-orphan')

    @property
    def formatted_price(self):
        # Format PKR cleanly (Crore / Lakh)
        if self.price >= 10000000:
            crores = self.price / 10000000
            return f"PKR {crores:.2f}".rstrip('0').rstrip('.') + " Crore"
        elif self.price >= 100000:
            lakhs = self.price / 100000
            return f"PKR {lakhs:.2f}".rstrip('0').rstrip('.') + " Lakh"
        else:
            return f"PKR {self.price:,.0f}"

    def __repr__(self):
        return f'<Property {self.title} - {self.location}>'


class Favorite(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (db.UniqueConstraint('user_id', 'property_id', name='_user_property_favorite_uc'),)

    def __repr__(self):
        return f'<Favorite user:{self.user_id} prop:{self.property_id}>'


class Inquiry(db.Model):
    __tablename__ = 'inquiries'

    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)  # Can be guest or logged-in
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Inquiry from {self.name} for Property {self.property_id}>'
