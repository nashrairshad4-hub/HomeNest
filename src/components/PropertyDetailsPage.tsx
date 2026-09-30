import React, { useState } from 'react';
import { Property, User, Inquiry } from '../types';
import { formatPKR } from '../data/initialData';
import { PropertyCard } from './PropertyCard';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  MapPin, 
  Heart, 
  Phone, 
  Mail, 
  MessageSquare, 
  Share2, 
  ShieldCheck, 
  Calculator, 
  CheckCircle, 
  ArrowLeft,
  Send,
  Building,
  Sparkles
} from 'lucide-react';

interface PropertyDetailsPageProps {
  property: Property;
  allProperties: Property[];
  favorites: number[];
  currentUser: User | null;
  onToggleFavorite: (id: number) => void;
  onSelectProperty: (property: Property) => void;
  onBack: () => void;
  onSubmitInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => void;
}

export const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({
  property,
  allProperties,
  favorites,
  currentUser,
  onToggleFavorite,
  onSelectProperty,
  onBack,
  onSubmitInquiry,
}) => {
  const [selectedImage, setSelectedImage] = useState(property.image);
  const [inquiryName, setInquiryName] = useState(currentUser?.name || '');
  const [inquiryEmail, setInquiryEmail] = useState(currentUser?.email || '');
  const [inquiryPhone, setInquiryPhone] = useState(currentUser?.phone || '');
  const [inquiryMessage, setInquiryMessage] = useState(
    `Hello, I am interested in viewing this listing: "${property.title}" in ${property.location}. Please contact me.`
  );
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Mortgage Calculator state
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [loanTenureYears, setLoanTenureYears] = useState(15);
  const [interestRate, setInterestRate] = useState(14.5); // Bank rate

  // Calculate monthly mortgage
  const principal = property.price * (1 - downPaymentPercent / 100);
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTenureYears * 12;
  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const isFavorite = favorites.includes(property.id);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryPhone) return;

    onSubmitInquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      userId: currentUser?.id,
      name: inquiryName,
      email: inquiryEmail,
      phone: inquiryPhone,
      message: inquiryMessage,
    });

    setInquirySubmitted(true);
    setTimeout(() => setInquirySubmitted(false), 6000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && (p.location === property.location || p.propertyType === property.propertyType))
    .slice(0, 3);

  const allImages = [property.image, ...(property.galleryImages || [])].filter(
    (img, idx, arr) => arr.indexOf(img) === idx
  );

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Listings</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                isFavorite
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isFavorite ? 'Saved to Wishlist' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Main Header / Title & Price */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow-xs">
                {property.propertyType}
              </span>
              <span
                className={`px-3 py-1 rounded-md text-xs font-bold ${
                  property.status === 'Available'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {property.status === 'Available' ? 'Available for Sale' : 'Sold Out'}
              </span>
              <span className="text-xs text-slate-400 font-medium">Listing #{property.id}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 font-medium">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{property.address}, {property.location}, Pakistan</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 text-right shrink-0 shadow-sm">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
              Asking Price
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
              {formatPKR(property.price)}
            </div>
            <span className="text-[11px] text-slate-400">Includes all fixtures & deed transfer guidance</span>
          </div>
        </div>

        {/* Image Showcase Gallery */}
        <div className="space-y-4">
          <div className="h-[380px] sm:h-[500px] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-xl relative">
            <img
              src={selectedImage}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold">
              HD Photography
            </div>
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-20 w-32 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img
                      ? 'border-blue-900 ring-2 ring-blue-900/30 scale-102'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Key Architectural Specifications Bar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mx-auto mb-2">
              <Bed className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Bedrooms</p>
            <p className="text-lg font-bold text-slate-900">{property.bedrooms} Master Suites</p>
          </div>

          <div className="space-y-1 border-l border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mx-auto mb-2">
              <Bath className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Bathrooms</p>
            <p className="text-lg font-bold text-slate-900">{property.bathrooms} Luxury Baths</p>
          </div>

          <div className="space-y-1 border-l border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mx-auto mb-2">
              <Maximize2 className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Covered Area</p>
            <p className="text-lg font-bold text-slate-900">{property.area}</p>
          </div>

          <div className="space-y-1 border-l border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Year Built</p>
            <p className="text-lg font-bold text-slate-900">{property.yearBuilt || '2024'}</p>
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Details & Amenities */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Property Overview & Architecture
              </h3>
              <div className="prose text-slate-600 text-sm leading-relaxed space-y-3">
                <p>{property.description}</p>
                <p>
                  This property is located in one of the most secure and well-developed neighborhoods of {property.location}. Constructed with top-grade reinforced concrete, premium insulation, solid teak wood fittings, and Spanish porcelain tiling throughout.
                </p>
              </div>
            </div>

            {/* Amenities Checklist */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Features & Premium Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(property.amenities && property.amenities.length > 0
                  ? property.amenities
                  : [
                      'Solar Inverter System',
                      'CCTV 24/7 Security',
                      'Modern Chef Kitchen',
                      'Lawn & Landscaped Garden',
                      'Covered 2+ Car Garage',
                      'Servant Quarter',
                    ]
                ).map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Neighborhood */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Location & Neighborhood
              </h3>
              <p className="text-xs text-slate-500">
                Direct access to major expressways, premier international schools, executive sports clubs, and luxury shopping plazas.
              </p>

              {/* Map Preview Simulation */}
              <div className="h-64 rounded-2xl bg-slate-100 border border-slate-200 relative overflow-hidden flex items-center justify-center p-6 text-center">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 space-y-2 max-w-sm">
                  <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{property.address}</h4>
                  <p className="text-xs text-slate-500">{property.location}, Pakistan</p>
                  <span className="inline-block text-[11px] font-bold text-blue-900 bg-blue-100 px-3 py-1 rounded-full">
                    GPS Coordinates Verified &bull; Exact Society Plot
                  </span>
                </div>
              </div>
            </div>

            {/* Mortgage Calculator */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Calculator className="w-5 h-5 text-blue-900" />
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Estimated Mortgage Calculator
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Down Payment ({downPaymentPercent}%)</label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
                    className="w-full accent-blue-900"
                  />
                  <span className="text-xs font-semibold text-slate-500 block">
                    {formatPKR(property.price * (downPaymentPercent / 100))}
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Loan Tenure ({loanTenureYears} Years)</label>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="5"
                    value={loanTenureYears}
                    onChange={(e) => setLoanTenureYears(parseInt(e.target.value))}
                    className="w-full accent-blue-900"
                  />
                  <span className="text-xs font-semibold text-slate-500 block">
                    {loanTenureYears * 12} Monthly installments
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Interest Rate ({interestRate}%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50/80 rounded-xl border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-blue-950 font-bold uppercase block">Estimated Monthly Payment</span>
                  <span className="text-xs text-slate-500">Based on standard home finance rates</span>
                </div>
                <div className="text-right">
                  <span className="font-serif text-xl font-extrabold text-blue-950">
                    {formatPKR(Math.round(monthlyPayment))} / mo
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Seller Profile & Lead Inquiry Form */}
          <div className="space-y-6">
            
            {/* Seller Contact Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 sticky top-24">
              
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-14 h-14 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xl shadow-md">
                  {property.sellerName?.charAt(0) || 'H'}
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-slate-900">{property.sellerName || 'HomeNest Verified Agent'}</h4>
                  <span className="text-xs text-slate-500 block">Property Owner / Verified Seller</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                    <ShieldCheck className="w-3 h-3" /> Verified Listing
                  </span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${property.sellerPhone || '+923001234567'}`}
                  className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-blue-200"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Seller
                </a>
                <a
                  href={`https://wa.me/${(property.sellerPhone || '923001234567').replace(/[^0-9]/g, '')}?text=Hello,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleInquirySubmit} className="space-y-3 pt-2">
                <div className="text-xs font-bold text-slate-900">Send Direct Message to Seller</div>

                {inquirySubmitted && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Inquiry sent successfully! The seller will contact you shortly.</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Tariq Mansoor"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Email Address</label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="+92 300 0000000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Message / Inquiries</label>
                  <textarea
                    rows={3}
                    required
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-200"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </form>

            </div>

          </div>

        </div>

        {/* Similar Listings Carousel */}
        {similarProperties.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-slate-200">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-blue-900 uppercase tracking-widest block">
                Recommendations
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Similar Properties You May Like
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((simProp) => (
                <PropertyCard
                  key={simProp.id}
                  property={simProp}
                  isFavorite={favorites.includes(simProp.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelectProperty={onSelectProperty}
                />
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
