import React, { useState } from 'react';
import { Property, PropertyType, User } from '../types';
import { formatPKR } from '../data/initialData';
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Image as ImageIcon, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  Plus,
  X,
  Upload
} from 'lucide-react';

interface SellPageProps {
  currentUser: User | null;
  onAddProperty: (newProp: Omit<Property, 'id' | 'createdAt'>) => void;
  onOpenAuth: () => void;
}

const AVAILABLE_AMENITIES = [
  'Swimming Pool',
  'Solar Inverter System',
  'CCTV 24/7 Security',
  'Lawn & Landscaped Garden',
  'Modern Chef Kitchen',
  'Servant Quarter',
  'Covered 2+ Car Garage',
  'Central Heating & AC',
  'Smart Home Automation',
  'Elevator / Lift',
  'Gated Society Access',
  'Basement Home Cinema',
];

export const SellPage: React.FC<SellPageProps> = ({
  currentUser,
  onAddProperty,
  onOpenAuth,
}) => {
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('House');
  const [price, setPrice] = useState<number | ''>('');
  const [location, setLocation] = useState('Faisalabad');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState(4);
  const [bathrooms, setBathrooms] = useState(4);
  const [area, setArea] = useState('1 Kanal');
  const [yearBuilt, setYearBuilt] = useState(2024);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Solar Inverter System',
    'CCTV 24/7 Security',
    'Modern Chef Kitchen',
    'Lawn & Landscaped Garden',
  ]);
  const [sellerName, setSellerName] = useState(currentUser?.name || '');
  const [sellerEmail, setSellerEmail] = useState(currentUser?.email || '');
  const [sellerPhone, setSellerPhone] = useState(currentUser?.phone || '+92 300 1234567');
  const [successNotice, setSuccessNotice] = useState(false);

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleAddGalleryImage = () => {
    if (newGalleryUrl.trim()) {
      setGalleryImages([...galleryImages, newGalleryUrl.trim()]);
      setNewGalleryUrl('');
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !address) return;

    const defaultImg =
      imageUrl ||
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

    onAddProperty({
      title,
      description:
        description ||
        `Newly listed luxury ${propertyType} in ${location}. Features high-end interior finishes, covered parking, and prime neighborhood connectivity.`,
      price: Number(price),
      location,
      address,
      propertyType,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      area,
      yearBuilt: Number(yearBuilt),
      image: defaultImg,
      galleryImages: galleryImages.length > 0 ? galleryImages : [defaultImg],
      amenities: selectedAmenities,
      status: 'Available',
      userId: currentUser?.id || 2,
      sellerName: sellerName || currentUser?.name || 'Property Owner',
      sellerEmail: sellerEmail || currentUser?.email || 'seller@homenest.com',
      sellerPhone: sellerPhone || '+92 300 1234567',
    });

    setSuccessNotice(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Header Banner */}
      <div className="bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Seller Concierge
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight">
            List Your Property for Sale
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Reach serious buyers, overseas investors, and high-net-worth clients across Pakistan with zero listing fees.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {successNotice ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Property Successfully Listed!
            </h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Your property listing is now live in our public real-estate catalog and visible to all verified buyers.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => setSuccessNotice(false)}
                className="px-6 py-2.5 rounded-full bg-blue-900 text-white font-bold text-xs"
              >
                List Another Property
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Basic Details */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  1. Basic Property Information
                </h3>
                <p className="text-xs text-slate-500">Provide the title, location, and asking price.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Property Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Brand New 1 Kanal Modern Spanish Villa on Canal Road"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Property Type *</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  >
                    <option value="House">Family House</option>
                    <option value="Villa">Luxury Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Commercial">Commercial Property</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Asking Price in PKR (Numeric) *</label>
                  <input
                    type="number"
                    required
                    min="100000"
                    step="100000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                    placeholder="e.g. 45000000 for 4.5 Crore"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  />
                  {price ? (
                    <span className="text-xs font-bold text-blue-900 block mt-1">
                      Formatted: {formatPKR(Number(price))}
                    </span>
                  ) : null}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">City / Location *</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  >
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Exact Society Address / Street *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Block B, Canal Road"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Specifications & Area */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  2. Architectural Specifications
                </h3>
                <p className="text-xs text-slate-500">Number of rooms and dimensions.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Bedrooms</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Bathrooms</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Area Size</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. 1 Kanal or 10 Marla"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Year Built</label>
                  <input
                    type="number"
                    value={yearBuilt}
                    onChange={(e) => setYearBuilt(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                  />
                </div>

                <div className="col-span-2 sm:col-span-4 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe special architectural highlights, ceiling height, imported bathroom fixtures, parking capacity, etc."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Amenities Selection */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  3. Select Amenities & Features
                </h3>
                <p className="text-xs text-slate-500">Select all features available in the property.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AVAILABLE_AMENITIES.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{amenity}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Photos & Gallery */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  4. Photography & Images
                </h3>
                <p className="text-xs text-slate-500">Provide high-resolution image URLs for your home showcase.</p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Main Hero Image URL</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... (or leave blank for high-res sample)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Add Gallery Photo URL</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium"
                    />
                    <button
                      type="button"
                      onClick={handleAddGalleryImage}
                      className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {galleryImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {galleryImages.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="absolute top-1 right-1 w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center text-[10px]"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Step 5: Seller Contact Info */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  5. Seller Contact Details
                </h3>
                <p className="text-xs text-slate-500">Interested buyers will reach out to these contact channels.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Seller Name *</label>
                  <input
                    type="text"
                    required
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    placeholder="e.g. Bilal Irshad"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={sellerEmail}
                    onChange={(e) => setSellerEmail(e.target.value)}
                    placeholder="bilal@homenest.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                    placeholder="+92 300 0000000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Upload className="w-5 h-5" />
                <span>Publish Property Listing Now</span>
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
};
