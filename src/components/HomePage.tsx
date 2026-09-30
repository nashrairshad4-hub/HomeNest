import React, { useState } from 'react';
import { Property, FilterState } from '../types';
import { PropertyCard } from './PropertyCard';
import { 
  Search, 
  MapPin, 
  Building2, 
  Bed, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Headphones, 
  Scale, 
  ArrowRight,
  Star,
  PlusCircle,
  Clock
} from 'lucide-react';

interface HomePageProps {
  properties: Property[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onSelectProperty: (property: Property) => void;
  onNavigateToProperties: (filters?: Partial<FilterState>) => void;
  onNavigateToSell: () => void;
  onNavigateToContact: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onNavigateToProperties,
  onNavigateToSell,
  onNavigateToContact,
}) => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchBedrooms, setSearchBedrooms] = useState('');
  const [searchMaxPrice, setSearchMaxPrice] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateToProperties({
      location: searchLocation,
      propertyType: searchType,
      bedrooms: searchBedrooms ? parseInt(searchBedrooms) : undefined,
      maxPrice: searchMaxPrice ? parseFloat(searchMaxPrice) : undefined,
    });
  };

  const featuredProperties = properties.filter((p) => p.featured || p.status === 'Available').slice(0, 3);
  const latestProperties = [...properties].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);

  const popularCities = [
    {
      name: 'Faisalabad',
      count: properties.filter((p) => p.location.toLowerCase().includes('faisalabad')).length || 4,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      highlight: 'Canal Road & Prime Sectors',
    },
    {
      name: 'Lahore',
      count: properties.filter((p) => p.location.toLowerCase().includes('lahore')).length || 8,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      highlight: 'DHA Phases & Gulberg Estates',
    },
    {
      name: 'Islamabad',
      count: properties.filter((p) => p.location.toLowerCase().includes('islamabad')).length || 6,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      highlight: 'Margalla Foothills & Sector F-7',
    },
    {
      name: 'Karachi',
      count: properties.filter((p) => p.location.toLowerCase().includes('karachi')).length || 5,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      highlight: 'Clifton & Seafront Residences',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Section matching Professional Polish theme */}
      <section className="relative flex-shrink-0 h-[380px] sm:h-[420px] w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600")`
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-8 text-center max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">
            Find Your Dream Home
          </h1>
          <p className="text-slate-200 text-sm sm:text-base mb-6 max-w-2xl">
            Explore the most exclusive listings in Pakistan's premium neighborhoods with HomeNest.
          </p>

          {/* Search Box */}
          <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-3 border border-white/40">
            <form onSubmit={handleSearchSubmit} className="w-full flex flex-col md:flex-row items-center gap-3">
              
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full px-2">
                {/* Location */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] font-bold uppercase text-slate-500 mb-0.5">Location</label>
                  <select
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 border-none p-0 focus:ring-0 focus:outline-none cursor-pointer"
                  >
                    <option value="">All Cities, PK</option>
                    <option value="Faisalabad">Faisalabad, PK</option>
                    <option value="Lahore">Lahore, PK</option>
                    <option value="Islamabad">Islamabad, PK</option>
                    <option value="Karachi">Karachi, PK</option>
                    <option value="Rawalpindi">Rawalpindi, PK</option>
                  </select>
                </div>

                {/* Property Type */}
                <div className="flex flex-col text-left sm:border-l sm:border-slate-300 sm:pl-3">
                  <label className="text-[10px] font-bold uppercase text-slate-500 mb-0.5">Type</label>
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 border-none p-0 focus:ring-0 focus:outline-none cursor-pointer"
                  >
                    <option value="">All Types</option>
                    <option value="Villa">Modern Villa</option>
                    <option value="House">Family House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="flex flex-col text-left md:border-l md:border-slate-300 md:pl-3">
                  <label className="text-[10px] font-bold uppercase text-slate-500 mb-0.5">Price Range</label>
                  <select
                    value={searchMaxPrice}
                    onChange={(e) => setSearchMaxPrice(e.target.value)}
                    className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 border-none p-0 focus:ring-0 focus:outline-none cursor-pointer"
                  >
                    <option value="">Any Budget</option>
                    <option value="20000000">Up to PKR 2 Crore</option>
                    <option value="35000000">PKR 2Cr - 3.5Cr</option>
                    <option value="50000000">PKR 3.5Cr - 5Cr</option>
                    <option value="100000000">PKR 5Cr - 10Cr+</option>
                  </select>
                </div>

                {/* Bedrooms */}
                <div className="flex flex-col text-left md:border-l md:border-slate-300 md:pl-3">
                  <label className="text-[10px] font-bold uppercase text-slate-500 mb-0.5">Bedrooms</label>
                  <select
                    value={searchBedrooms}
                    onChange={(e) => setSearchBedrooms(e.target.value)}
                    className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 border-none p-0 focus:ring-0 focus:outline-none cursor-pointer"
                  >
                    <option value="">Any Beds</option>
                    <option value="3">3+ Beds</option>
                    <option value="4">4+ Beds</option>
                    <option value="5">5+ Beds</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md shadow-blue-200 shrink-0 text-sm"
              >
                Search
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* 2. Key Numbers & Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 grid grid-cols-2 md:grid-cols-4 p-6 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="pt-2 md:pt-0 space-y-0.5">
            <span className="text-2xl sm:text-3xl font-bold text-blue-600 leading-none">1.2k+</span>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Happy Clients</p>
          </div>
          <div className="pt-2 md:pt-0 space-y-0.5">
            <span className="text-2xl sm:text-3xl font-bold text-blue-600 leading-none">450+</span>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Properties Sold</p>
          </div>
          <div className="pt-2 md:pt-0 space-y-0.5">
            <span className="text-2xl sm:text-3xl font-bold text-blue-600 leading-none">15+</span>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cities Covered</p>
          </div>
          <div className="pt-2 md:pt-0 space-y-0.5">
            <span className="text-2xl sm:text-3xl font-bold text-blue-600 leading-none">99.8%</span>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Client Trust Rating</p>
          </div>
        </div>
      </section>

      {/* 3. Featured Properties Portfolio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Properties</h2>
            <p className="text-slate-500 text-sm">Handpicked premium listings for you</p>
          </div>
          <button
            onClick={() => onNavigateToProperties()}
            className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1"
          >
            <span>View All Properties</span>
            <span>&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              isFavorite={favorites.includes(prop.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectProperty={onSelectProperty}
            />
          ))}
        </div>
      </section>

      {/* 4. Popular Locations Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-blue-900 uppercase tracking-widest">
            Prime Real Estate Hubs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Explore Popular Locations
          </h2>
          <p className="text-slate-500 text-sm">
            Find executive gated communities, commercial connectivity, and high-appreciation sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCities.map((city) => (
            <div
              key={city.name}
              onClick={() => onNavigateToProperties({ location: city.name })}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold text-amber-400 mb-1">{city.highlight}</span>
                <h3 className="font-serif text-2xl font-bold">{city.name}</h3>
                <p className="text-xs text-slate-300 mt-1">{city.count} Properties Available</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 my-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">
              Unrivaled Quality
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Why Choose HomeNest
            </h2>
            <p className="text-slate-400 text-sm">
              We bridge genuine property owners and elite buyers with complete legal assurance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">100% Verified Deeds</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Every listed villa is scrutinized for clear legal titles, approved building plans, and transparent registry.
              </p>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-900 text-white flex items-center justify-center shadow-md">
                <Users className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Direct Seller Contact</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Connect instantly with verified property owners without inflated brokerage fees or hidden intermediaries.
              </p>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-900 text-white flex items-center justify-center shadow-md">
                <Scale className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Accurate Valuations</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Realistic PKR price benchmarks customized for local society standards (DHA, Bahria, Canal Road, F-7).
              </p>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-900 text-white flex items-center justify-center shadow-md">
                <Headphones className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Private Concierge</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Dedicated real estate specialists ready to assist with private chauffeured tours and contract drafting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Latest Additions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-blue-900 uppercase tracking-widest block mb-1">
              Fresh On Market
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Latest Property Listings
            </h2>
          </div>
          <button
            onClick={() => onNavigateToProperties({ sortBy: 'newest' })}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-blue-700 group self-start"
          >
            <span>View New Arrivals</span>
            <Clock className="w-4 h-4 text-blue-800" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              isFavorite={favorites.includes(prop.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectProperty={onSelectProperty}
            />
          ))}
        </div>
      </section>

      {/* 7. Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-blue-900 uppercase tracking-widest">
            Verified Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            What Homeowners Say
          </h2>
          <p className="text-slate-500 text-sm">
            Trusted by corporate executives, overseas investors, and discerning families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex text-amber-500 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-slate-600 text-xs italic leading-relaxed">
              "We listed our 1 Kanal designer villa on Canal Road Faisalabad and received three verified serious cash offers in less than two weeks. HomeNest made selling effortless."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Dr. Maryam"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Dr. Maryam Siddiqui</h4>
                <p className="text-[11px] text-slate-500">Home Seller &bull; Faisalabad</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex text-amber-500 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-slate-600 text-xs italic leading-relaxed">
              "Searching for a modern home in DHA Lahore was seamless with the photo galleries and accurate bedroom specs. The direct WhatsApp inquiry saved us days."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                alt="Hamza"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Hamza Zubair</h4>
                <p className="text-[11px] text-slate-500">Property Buyer &bull; Lahore</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex text-amber-500 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-slate-600 text-xs italic leading-relaxed">
              "As an overseas Pakistani living in Dubai, finding a transparent platform to acquire prime real estate in Islamabad Sector F-7 was critical. Highly recommended."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
                alt="Chaudhry Waqas"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Chaudhry Waqas</h4>
                <p className="text-[11px] text-slate-500">Investor &bull; Islamabad</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Call To Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-xl relative overflow-hidden border border-slate-800">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Sell Your Property?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Publish your listing to thousands of verified buyers and active investors across Pakistan today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={onNavigateToSell}
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                <PlusCircle className="w-4.5 h-4.5" />
                <span>List Property For Sale</span>
              </button>
              <button
                onClick={onNavigateToContact}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
              >
                <span>Talk to an Advisor</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
