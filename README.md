# HomeNest — Premium Real Estate Platform

HomeNest is a complete, modern, professional, and fully responsive real-estate web application built with **Python**, **Flask**, **Jinja2**, **SQLite (SQLAlchemy ORM)**, **Bootstrap 5**, and custom CSS/JavaScript.

---

## Key Features

1. **Property Showcase & Discovery**:
   - Advanced multi-filter search: Location/City (Faisalabad, Lahore, Islamabad, Karachi, Rawalpindi), Property Type (House, Villa, Apartment, Penthouse), Price Range (formatted in PKR Crores/Lakhs), Bedrooms, and keyword search.
   - Interactive sorting (Price low-to-high, high-to-low, newest).

2. **Property Details Page**:
   - Interactive multi-image gallery with thumbnail switcher.
   - Comprehensive architectural specifications: Bedrooms, Bathrooms, Covered Area, Year Built, Property Status.
   - Amenities checklist (Swimming Pool, Solar Inverter, CCTV Security, Lawn, Smart Home, etc.).
   - Google Maps-style location and area overview.
   - Seller & Agent contact card with direct Call, WhatsApp, and inquiry messaging.

3. **User Authentication & Dashboard**:
   - Secure registration, login, remember-me sessions with password hashing (`werkzeug.security`).
   - Dedicated User Dashboard to manage listed houses, track inquiries received from buyers, and review saved wishlist properties.

4. **Sell / List Property Engine**:
   - Comprehensive multi-step listing form with file uploads (stored in `static/uploads/`) or public image URLs.
   - Real-time PKR price formatting helper.

5. **Admin Control Center**:
   - Metric overview: Total Users, Total Properties, Available vs Sold, Buyer Inquiries.
   - Property management: Instant status toggle (Available $\leftrightarrow$ Sold), edit listing, delete listing.
   - User registry with listing counts and role badges.
   - Centralized inquiry lead pipeline.

---

## Project Structure

```
homenest/
├── app.py                     # Main Flask Application entry point
├── config.py                  # App configuration & SQLite database URI
├── requirements.txt           # Python package dependencies
├── database.db                # SQLite database (generated on startup or seed)
├── seed_db.py                 # Initial database seeder script
├── models/
│   ├── __init__.py
│   └── models.py              # User, Property, Favorite, Inquiry models
├── routes/
│   ├── __init__.py
│   ├── main.py                # Home, About, Contact routes
│   ├── auth.py                # Login, Register, Logout, Dashboard
│   ├── properties.py          # Search, Details, Sell, Edit, Inquire, Favorite
│   └── admin.py               # Admin dashboard, User & Property management
├── templates/
│   ├── base.html              # Base layout with navbar & footer
│   ├── index.html             # Homepage with Hero, Search, Stats, Featured
│   ├── properties.html        # Properties listing with sidebar filters
│   ├── property_details.html  # Gallery, Specs, Amenities, Seller info
│   ├── sell.html              # List property form with image upload
│   ├── login.html             # User login
│   ├── register.html          # User registration
│   ├── dashboard.html         # User dashboard (My properties, Favorites, Inquiries)
│   ├── favorites.html         # Wishlist page
│   ├── about.html             # About company page
│   ├── contact.html           # Contact & support page
│   ├── edit_property.html     # Edit property details
│   ├── 404.html               # Not found error
│   ├── 500.html               # Internal error
│   └── admin/
│       ├── dashboard.html     # Admin analytics
│       ├── properties.html    # Manage all properties & mark sold
│       ├── users.html         # Registered users table
│       └── inquiries.html     # Buyer leads
├── static/
│   ├── css/
│   │   └── style.css          # Premium luxury real estate styling
│   ├── js/
│   │   └── script.js          # Interactive galleries, AJAX favorites, alerts
│   └── uploads/               # Uploaded property images
└── README.md
```

---

## Step-by-Step Setup Guide

### 1. Create Virtual Environment & Activate

```bash
# Clone or navigate to the project directory
cd homenest

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 3. Initialize & Seed Database with Demo Properties

Run the database seeder to create the SQLite tables and populate realistic demo properties (Faisalabad, Lahore, Islamabad, Karachi villas):

```bash
python seed_db.py
```

### 4. Run the Flask Server

```bash
python app.py
```

Now open your browser and navigate to:
```
http://127.0.0.1:5000
```

---

## Demo Accounts

You can test all user and admin workflows immediately with these pre-seeded credentials:

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Administrator** | `admin@homenest.com` | `admin123` | Full access to `/admin`, manage all properties, mark sold, view user registry & leads. |
| **Seller / Buyer** | `bilal@homenest.com` | `user123` | List properties, edit own listings, save favorites, receive buyer inquiries. |
| **Seller / Buyer** | `ayesha.khan@gmail.com` | `user123` | Browse homes, send inquiries, favorite properties. |

---

## Database Models

- **User**: `id`, `name`, `email`, `phone`, `password_hash`, `role` (`user` / `admin`), `created_at`
- **Property**: `id`, `title`, `description`, `price`, `location`, `address`, `property_type`, `bedrooms`, `bathrooms`, `area`, `year_built`, `image`, `gallery_images`, `amenities`, `status` (`Available` / `Sold`), `user_id`, `created_at`
- **Favorite**: `id`, `user_id`, `property_id`, `created_at`
- **Inquiry**: `id`, `property_id`, `user_id`, `name`, `email`, `phone`, `message`, `created_at`
