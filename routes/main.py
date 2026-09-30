from flask import Blueprint, render_template, request, flash, redirect, url_for
from models.models import Property, User, Inquiry
from models import db

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    featured_properties = Property.query.filter_by(status='Available').order_by(Property.featured.desc(), Property.created_at.desc()).limit(6).all()
    latest_properties = Property.query.filter_by(status='Available').order_by(Property.created_at.desc()).limit(6).all()
    
    # Platform statistics
    total_properties = Property.query.count()
    sold_properties = Property.query.filter_by(status='Sold').count()
    total_users = User.query.count()
    cities_count = db.session.query(Property.location).distinct().count() or 6

    # Popular locations
    popular_cities = [
        {"name": "Faisalabad", "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", "count": Property.query.filter_by(location='Faisalabad').count()},
        {"name": "Lahore", "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", "count": Property.query.filter_by(location='Lahore').count()},
        {"name": "Islamabad", "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", "count": Property.query.filter_by(location='Islamabad').count()},
        {"name": "Karachi", "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", "count": Property.query.filter_by(location='Karachi').count()}
    ]

    return render_template(
        'index.html',
        featured_properties=featured_properties,
        latest_properties=latest_properties,
        total_properties=total_properties,
        sold_properties=sold_properties,
        total_users=total_users,
        cities_count=cities_count,
        popular_cities=popular_cities
    )

@main_bp.route('/about')
def about():
    return render_template('about.html')

@main_bp.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        message = request.form.get('message')

        if not name or not email or not message:
            flash('Please fill in all required fields.', 'danger')
            return redirect(url_for('main.contact'))

        # Create general inquiry or feedback
        flash('Thank you for contacting HomeNest! Our representative will reach out shortly.', 'success')
        return redirect(url_for('main.contact'))

    return render_template('contact.html')
