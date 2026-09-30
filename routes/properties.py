import os
import json
from werkzeug.utils import secure_filename
from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, current_app
from flask_login import login_required, current_user
from models.models import Property, Favorite, Inquiry, User
from models import db

properties_bp = Blueprint('properties', __name__)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

@properties_bp.route('/properties')
def list_properties():
    # Query parameters
    keyword = request.args.get('keyword', '').strip()
    location = request.args.get('location', '').strip()
    property_type = request.args.get('type', '').strip()
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    bedrooms = request.args.get('bedrooms', type=int)
    bathrooms = request.args.get('bathrooms', type=int)
    sort_by = request.args.get('sort', 'newest')

    query = Property.query

    if keyword:
        query = query.filter(
            (Property.title.ilike(f'%{keyword}%')) |
            (Property.description.ilike(f'%{keyword}%')) |
            (Property.address.ilike(f'%{keyword}%'))
        )

    if location and location.lower() != 'all':
        query = query.filter(Property.location.ilike(f'%{location}%'))

    if property_type and property_type.lower() != 'all':
        query = query.filter(Property.property_type.ilike(property_type))

    if min_price:
        query = query.filter(Property.price >= min_price)

    if max_price:
        query = query.filter(Property.price <= max_price)

    if bedrooms and bedrooms > 0:
        query = query.filter(Property.bedrooms >= bedrooms)

    if bathrooms and bathrooms > 0:
        query = query.filter(Property.bathrooms >= bathrooms)

    # Sorting
    if sort_by == 'price_asc':
        query = query.order_by(Property.price.asc())
    elif sort_by == 'price_desc':
        query = query.order_by(Property.price.desc())
    elif sort_by == 'oldest':
        query = query.order_by(Property.created_at.asc())
    else:  # newest default
        query = query.order_by(Property.created_at.desc())

    properties = query.all()

    # User favorite IDs if logged in
    user_fav_ids = set()
    if current_user.is_authenticated:
        favs = Favorite.query.filter_by(user_id=current_user.id).all()
        user_fav_ids = {f.property_id for f in favs}

    # Distinct locations for filter dropdown
    distinct_locations = [r[0] for r in db.session.query(Property.location).distinct().all() if r[0]]

    return render_template(
        'properties.html',
        properties=properties,
        user_fav_ids=user_fav_ids,
        distinct_locations=distinct_locations,
        selected_location=location,
        selected_type=property_type,
        min_price=min_price,
        max_price=max_price,
        bedrooms=bedrooms,
        sort_by=sort_by,
        keyword=keyword
    )


@properties_bp.route('/property/<int:property_id>')
def details(property_id):
    prop = Property.query.get_or_404(property_id)
    
    # Parse amenities and gallery if stored as JSON
    amenities_list = []
    try:
        amenities_list = json.loads(prop.amenities) if prop.amenities else []
    except Exception:
        amenities_list = [a.strip() for a in prop.amenities.split(',')] if prop.amenities else []

    gallery_list = []
    try:
        gallery_list = json.loads(prop.gallery_images) if prop.gallery_images else []
    except Exception:
        gallery_list = [g.strip() for g in prop.gallery_images.split(',')] if prop.gallery_images else []

    if not gallery_list and prop.image:
        gallery_list = [prop.image]

    # Similar properties in the same city or type
    similar_properties = Property.query.filter(
        Property.id != prop.id,
        Property.status == 'Available',
        (Property.location == prop.location) | (Property.property_type == prop.property_type)
    ).limit(3).all()

    is_favorited = False
    if current_user.is_authenticated:
        fav = Favorite.query.filter_by(user_id=current_user.id, property_id=prop.id).first()
        is_favorited = bool(fav)

    return render_template(
        'property_details.html',
        property=prop,
        amenities=amenities_list,
        gallery=gallery_list,
        similar_properties=similar_properties,
        is_favorited=is_favorited
    )


@properties_bp.route('/sell', methods=['GET', 'POST'])
@login_required
def sell():
    if request.method == 'POST':
        title = request.form.get('title', '').strip()
        description = request.form.get('description', '').strip()
        price = request.form.get('price', type=float)
        location = request.form.get('location', '').strip()
        address = request.form.get('address', '').strip()
        property_type = request.form.get('property_type', 'House')
        bedrooms = request.form.get('bedrooms', type=int, default=1)
        bathrooms = request.form.get('bathrooms', type=int, default=1)
        area = request.form.get('area', '').strip()
        year_built = request.form.get('year_built', type=int, default=2024)
        image_url = request.form.get('image_url', '').strip()
        amenities_raw = request.form.getlist('amenities')

        if not title or not description or not price or not location or not area:
            flash('Please complete all required listing details.', 'danger')
            return render_template('sell.html')

        # Handle main image upload or URL fallback
        main_image = image_url or "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
        
        if 'image_file' in request.files:
            file = request.files['image_file']
            if file and file.filename and allowed_file(file.filename):
                filename = secure_filename(f"{current_user.id}_{file.filename}")
                os.makedirs(current_app.config['UPLOAD_FOLDER'], exist_ok=True)
                filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                main_image = f"/static/uploads/{filename}"

        # Build gallery images list
        gallery_urls = [main_image]
        additional_urls = request.form.get('additional_images', '')
        if additional_urls:
            gallery_urls.extend([u.strip() for u in additional_urls.split('\n') if u.strip()])

        new_property = Property(
            title=title,
            description=description,
            price=price,
            location=location,
            address=address,
            property_type=property_type,
            bedrooms=bedrooms,
            bathrooms=bathrooms,
            area=area,
            year_built=year_built,
            image=main_image,
            gallery_images=json.dumps(gallery_urls),
            amenities=json.dumps(amenities_raw),
            status='Available',
            user_id=current_user.id
        )

        db.session.add(new_property)
        db.session.commit()

        flash('Your property has been successfully listed on HomeNest!', 'success')
        return redirect(url_for('properties.details', property_id=new_property.id))

    return render_template('sell.html')


@properties_bp.route('/property/edit/<int:property_id>', methods=['GET', 'POST'])
@login_required
def edit_property(property_id):
    prop = Property.query.get_or_404(property_id)

    # Allow seller or admin
    if prop.user_id != current_user.id and not current_user.is_admin():
        flash('You do not have permission to edit this listing.', 'danger')
        return redirect(url_for('main.index'))

    if request.method == 'POST':
        prop.title = request.form.get('title', prop.title).strip()
        prop.description = request.form.get('description', prop.description).strip()
        prop.price = request.form.get('price', type=float, default=prop.price)
        prop.location = request.form.get('location', prop.location).strip()
        prop.address = request.form.get('address', prop.address).strip()
        prop.property_type = request.form.get('property_type', prop.property_type)
        prop.bedrooms = request.form.get('bedrooms', type=int, default=prop.bedrooms)
        prop.bathrooms = request.form.get('bathrooms', type=int, default=prop.bathrooms)
        prop.area = request.form.get('area', prop.area).strip()
        prop.year_built = request.form.get('year_built', type=int, default=prop.year_built)
        prop.status = request.form.get('status', prop.status)

        image_url = request.form.get('image_url', '').strip()
        if image_url:
            prop.image = image_url

        if 'image_file' in request.files:
            file = request.files['image_file']
            if file and file.filename and allowed_file(file.filename):
                filename = secure_filename(f"{current_user.id}_{file.filename}")
                filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                prop.image = f"/static/uploads/{filename}"

        amenities_raw = request.form.getlist('amenities')
        if amenities_raw:
            prop.amenities = json.dumps(amenities_raw)

        db.session.commit()
        flash('Listing details updated successfully!', 'success')
        return redirect(url_for('properties.details', property_id=prop.id))

    current_amenities = []
    try:
        current_amenities = json.loads(prop.amenities) if prop.amenities else []
    except Exception:
        current_amenities = []

    return render_template('edit_property.html', property=prop, current_amenities=current_amenities)


@properties_bp.route('/property/delete/<int:property_id>', methods=['POST'])
@login_required
def delete_property(property_id):
    prop = Property.query.get_or_404(property_id)

    if prop.user_id != current_user.id and not current_user.is_admin():
        flash('Unauthorized action.', 'danger')
        return redirect(url_for('main.index'))

    db.session.delete(prop)
    db.session.commit()
    flash('Property listing removed successfully.', 'info')
    
    if current_user.is_admin() and request.referrer and 'admin' in request.referrer:
        return redirect(url_for('admin.properties'))
    return redirect(url_for('auth.dashboard'))


@properties_bp.route('/property/favorite/<int:property_id>', methods=['POST'])
@login_required
def toggle_favorite(property_id):
    prop = Property.query.get_or_404(property_id)
    fav = Favorite.query.filter_by(user_id=current_user.id, property_id=prop.id).first()

    if fav:
        db.session.delete(fav)
        db.session.commit()
        favorited = False
        message = 'Removed from your favorites.'
    else:
        new_fav = Favorite(user_id=current_user.id, property_id=prop.id)
        db.session.add(new_fav)
        db.session.commit()
        favorited = True
        message = 'Added to your favorites!'

    if request.is_json or request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify({'success': True, 'favorited': favorited, 'message': message})

    flash(message, 'success' if favorited else 'info')
    return redirect(request.referrer or url_for('properties.details', property_id=property_id))


@properties_bp.route('/property/inquire/<int:property_id>', methods=['POST'])
def submit_inquiry(property_id):
    prop = Property.query.get_or_404(property_id)
    name = request.form.get('name', '').strip()
    email = request.form.get('email', '').strip()
    phone = request.form.get('phone', '').strip()
    message = request.form.get('message', '').strip()

    if not name or not email or not phone or not message:
        flash('Please fill in all inquiry fields.', 'danger')
        return redirect(url_for('properties.details', property_id=property_id))

    new_inquiry = Inquiry(
        property_id=prop.id,
        user_id=current_user.id if current_user.is_authenticated else None,
        name=name,
        email=email,
        phone=phone,
        message=message
    )
    db.session.add(new_inquiry)
    db.session.commit()

    flash(f'Your inquiry has been sent to the seller of "{prop.title}". They will get back to you promptly!', 'success')
    return redirect(url_for('properties.details', property_id=property_id))
