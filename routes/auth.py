from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_user, logout_user, login_required, current_user
from models.models import User, Property, Favorite, Inquiry
from models import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))

    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip().lower()
        phone = request.form.get('phone', '').strip()
        password = request.form.get('password', '')
        confirm_password = request.form.get('confirm_password', '')
        role = request.form.get('role', 'user')

        if not name or not email or not password:
            flash('Please fill in all mandatory fields.', 'danger')
            return render_template('register.html')

        if password != confirm_password:
            flash('Passwords do not match.', 'danger')
            return render_template('register.html')

        if len(password) < 6:
            flash('Password must be at least 6 characters.', 'warning')
            return render_template('register.html')

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash('An account with this email already exists. Please log in.', 'warning')
            return redirect(url_for('auth.login'))

        new_user = User(
            name=name,
            email=email,
            phone=phone,
            role=role if role in ['user', 'admin'] else 'user'
        )
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        login_user(new_user)
        flash('Welcome to HomeNest! Your account has been created successfully.', 'success')
        return redirect(url_for('auth.dashboard'))

    return render_template('register.html')


@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('auth.dashboard'))

    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        remember = True if request.form.get('remember') else False

        user = User.query.filter_by(email=email).first()

        if not user or not user.check_password(password):
            flash('Invalid email or password. Please try again.', 'danger')
            return render_template('login.html')

        login_user(user, remember=remember)
        flash(f'Welcome back, {user.name}!', 'success')
        
        next_page = request.args.get('next')
        if next_page:
            return redirect(next_page)
        if user.is_admin():
            return redirect(url_for('admin.dashboard'))
        return redirect(url_for('auth.dashboard'))

    return render_template('login.html')


@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out safely.', 'info')
    return redirect(url_for('main.index'))


@auth_bp.route('/dashboard')
@login_required
def dashboard():
    my_properties = Property.query.filter_by(user_id=current_user.id).order_by(Property.created_at.desc()).all()
    user_favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    favorite_properties = [fav.property for fav in user_favorites if fav.property]
    
    # Inquiries received for current user's properties
    my_property_ids = [p.id for p in my_properties]
    received_inquiries = []
    if my_property_ids:
        received_inquiries = Inquiry.query.filter(Inquiry.property_id.in_(my_property_ids)).order_by(Inquiry.created_at.desc()).all()

    return render_template(
        'dashboard.html',
        my_properties=my_properties,
        favorite_properties=favorite_properties,
        received_inquiries=received_inquiries
    )


@auth_bp.route('/favorites')
@login_required
def favorites():
    user_favorites = Favorite.query.filter_by(user_id=current_user.id).order_by(Favorite.created_at.desc()).all()
    favorite_properties = [fav.property for fav in user_favorites if fav.property]
    return render_template('favorites.html', properties=favorite_properties)
