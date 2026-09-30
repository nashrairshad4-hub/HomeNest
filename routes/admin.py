from flask import Blueprint, render_template, request, redirect, url_for, flash, abort
from flask_login import login_required, current_user
from models.models import User, Property, Inquiry, Favorite
from models import db

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.before_request
def check_admin():
    if not current_user.is_authenticated or not current_user.is_admin():
        flash('Access restricted to administrators only.', 'danger')
        return redirect(url_for('auth.login'))

@admin_bp.route('/')
@admin_bp.route('/dashboard')
def dashboard():
    total_users = User.query.count()
    total_properties = Property.query.count()
    available_properties = Property.query.filter_by(status='Available').count()
    sold_properties = Property.query.filter_by(status='Sold').count()
    total_inquiries = Inquiry.query.count()

    recent_properties = Property.query.order_by(Property.created_at.desc()).limit(5).all()
    recent_inquiries = Inquiry.query.order_by(Inquiry.created_at.desc()).limit(6).all()
    recent_users = User.query.order_by(User.created_at.desc()).limit(5).all()

    return render_template(
        'admin/dashboard.html',
        total_users=total_users,
        total_properties=total_properties,
        available_properties=available_properties,
        sold_properties=sold_properties,
        total_inquiries=total_inquiries,
        recent_properties=recent_properties,
        recent_inquiries=recent_inquiries,
        recent_users=recent_users
    )

@admin_bp.route('/properties')
def properties():
    status_filter = request.args.get('status')
    query = Property.query
    if status_filter:
        query = query.filter_by(status=status_filter)
    
    all_properties = query.order_by(Property.created_at.desc()).all()
    return render_template('admin/properties.html', properties=all_properties, current_status=status_filter)

@admin_bp.route('/property/toggle-status/<int:property_id>', methods=['POST'])
def toggle_status(property_id):
    prop = Property.query.get_or_404(property_id)
    new_status = request.form.get('status', 'Sold' if prop.status == 'Available' else 'Available')
    prop.status = new_status
    db.session.commit()
    flash(f'Status for "{prop.title}" updated to {new_status}.', 'success')
    return redirect(url_for('admin.properties'))

@admin_bp.route('/users')
def users():
    all_users = User.query.order_by(User.created_at.desc()).all()
    return render_template('admin/users.html', users=all_users)

@admin_bp.route('/inquiries')
def inquiries():
    all_inquiries = Inquiry.query.order_by(Inquiry.created_at.desc()).all()
    return render_template('admin/inquiries.html', inquiries=all_inquiries)
