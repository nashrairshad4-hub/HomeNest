import json
from app import create_app
from models import db
from models.models import User, Property, Favorite, Inquiry

app = create_app()

def seed_database():
    with app.app_context():
        # Drop all & recreate
        db.drop_all()
        db.create_all()

        print("Creating Users...")
        # 1. Admin User
        admin = User(
            name="Admin HomeNest",
            email="admin@homenest.com",
            phone="+92 300 1234567",
            role="admin"
        )
        admin.set_password("admin123")
        db.session.add(admin)

        # 2. Regular Seller/Buyer Users
        seller1 = User(
            name="Bilal Irshad",
            email="bilal@homenest.com",
            phone="+92 321 9876543",
            role="user"
        )
        seller1.set_password("user123")
        db.session.add(seller1)

        seller2 = User(
            name="Ayesha Khan",
            email="ayesha.khan@gmail.com",
            phone="+92 333 5551234",
            role="user"
        )
        seller2.set_password("user123")
        db.session.add(seller2)

        db.session.commit()
        print(f"Users created: {admin.email}, {seller1.email}, {seller2.email}")

        # 3. Sample Properties
        sample_properties = [
            {
                "title": "Luxury Modern Villa in Canal Road",
                "description": "Architect-designed 1 Kanal ultra-luxurious smart villa featuring Italian marble flooring, imported Spanish bathroom fittings, designer false ceilings, heated swimming pool, rooftop BBQ terrace, solar power system, and landscaped lawn. Located in prime residential sector.",
                "price": 45000000.0, # PKR 4.5 Crore
                "location": "Faisalabad",
                "address": "Block B, Canal Road, Faisalabad",
                "property_type": "Villa",
                "bedrooms": 5,
                "bathrooms": 4,
                "area": "1 Kanal",
                "year_built": 2024,
                "image": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                ]),
                "amenities": json.dumps(["Swimming Pool", "Solar Inverter", "CCTV Security", "Lawn & Garden", "Modern Kitchen", "Servant Quarter", "Covered Parking", "Central Heating"]),
                "status": "Available",
                "featured": True,
                "user_id": seller1.id
            },
            {
                "title": "Modern Contemporary Family House in DHA Phase 6",
                "description": "Brand new 10 Marla luxury duplex with high double-height lobby, ash wood doors, Grohe fixtures, solid brass ironmongery, expansive glass facade, open-plan chef kitchen, and private basement cinema lounge.",
                "price": 28000000.0, # PKR 2.8 Crore
                "location": "Lahore",
                "address": "Sector K, DHA Phase 6, Lahore",
                "property_type": "House",
                "bedrooms": 4,
                "bathrooms": 3,
                "area": "10 Marla",
                "year_built": 2023,
                "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80"
                ]),
                "amenities": json.dumps(["Gated Community", "Underground Electricity", "Cinema Room", "Double Glazed Windows", "Granite Countertops", "Backup Generator"]),
                "status": "Available",
                "featured": True,
                "user_id": seller1.id
            },
            {
                "title": "Premium Margalla View Mansion in Sector F-7",
                "description": "Exquisite 1 Kanal designer home offering breathtaking views of the Margalla Hills. Features 5 master suites with walk-in wardrobes, elevator, Finnish dry sauna, landscaped perimeter, and dedicated security outpost.",
                "price": 52000000.0, # PKR 5.2 Crore
                "location": "Islamabad",
                "address": "Street 14, Sector F-7/2, Islamabad",
                "property_type": "Villa",
                "bedrooms": 5,
                "bathrooms": 5,
                "area": "1 Kanal",
                "year_built": 2024,
                "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                ]),
                "amenities": json.dumps(["Mountain View", "Elevator / Lift", "Smart Home Automation", "Sauna", "Security Guard Room", "3 Car Garage"]),
                "status": "Available",
                "featured": True,
                "user_id": seller2.id
            },
            {
                "title": "Seaside Luxury Penthouse in Clifton Block 2",
                "description": "High-floor panoramic penthouse with direct Arabian Sea views. 4500 sq ft of sheer elegance, private wrap-around terrace, bespoke marble kitchen island, concierge service, and 24/7 power backup.",
                "price": 68000000.0, # PKR 6.8 Crore
                "location": "Karachi",
                "address": "Ocean Heights, Clifton Block 2, Karachi",
                "property_type": "Penthouse",
                "bedrooms": 4,
                "bathrooms": 4,
                "area": "4500 Sq Ft",
                "year_built": 2024,
                "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80"
                ]),
                "amenities": json.dumps(["Sea View", "Wrap-around Balcony", "Concierge Desk", "Fitness Center", "High Speed Lifts", "2 Covered Parking"]),
                "status": "Available",
                "featured": False,
                "user_id": seller2.id
            },
            {
                "title": "Elegant 5 Marla Corner House in Bahria Town",
                "description": "Perfect investment and cozy family residence in Bahria Town Phase 8. Compact yet spacious design, stylish wood accents, modern fixtures, terrace garden, and walking distance to commercial avenue and parks.",
                "price": 14500000.0, # PKR 1.45 Crore
                "location": "Rawalpindi",
                "address": "Sector D, Bahria Town Phase 8, Rawalpindi",
                "property_type": "House",
                "bedrooms": 3,
                "bathrooms": 3,
                "area": "5 Marla",
                "year_built": 2023,
                "image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
                ]),
                "amenities": json.dumps(["Corner Plot", "Near Park", "Terrace Garden", "Modern Tile Work", "Water Filtration Unit"]),
                "status": "Available",
                "featured": False,
                "user_id": seller1.id
            },
            {
                "title": "Grand 2 Kanal Colonial Estate in Gulberg III",
                "description": "Magnificent heritage-inspired estate with sprawling front manicured lawns, classical pillars, royal high-ceiling drawing room, servant quarters for 4, and swimming pool with gazebo.",
                "price": 95000000.0, # PKR 9.5 Crore
                "location": "Lahore",
                "address": "Near MM Alam Road, Gulberg III, Lahore",
                "property_type": "Villa",
                "bedrooms": 6,
                "bathrooms": 6,
                "area": "2 Kanal",
                "year_built": 2022,
                "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                "gallery_images": json.dumps([
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                ]),
                "amenities": json.dumps(["Swimming Pool", "Lush Lawn", "Servant Quarters", "Gazebo", "Solar Setup", "Prime Commercial Access"]),
                "status": "Sold",
                "featured": False,
                "user_id": seller2.id
            }
        ]

        for p_data in sample_properties:
            prop = Property(**p_data)
            db.session.add(prop)

        db.session.commit()
        print("Sample properties seeded successfully!")

        # 4. Sample Inquiry & Favorite
        first_prop = Property.query.first()
        if first_prop:
            inquiry = Inquiry(
                property_id=first_prop.id,
                user_id=seller2.id,
                name="Tariq Mansoor",
                email="tariq@investments.pk",
                phone="+92 301 7778899",
                message="Hello, I am interested in scheduling a physical viewing for this villa this upcoming Saturday afternoon. Please let me know available slots."
            )
            db.session.add(inquiry)

            fav = Favorite(user_id=seller1.id, property_id=first_prop.id)
            db.session.add(fav)
            db.session.commit()
            print("Sample inquiries and favorites seeded!")

        print("Database initialization complete! You are ready to launch HomeNest.")

if __name__ == '__main__':
    seed_database()
