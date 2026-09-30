import React, { useState, useMemo } from 'react';
import { Property, FilterState } from '../types';
import { PropertyCard } from './PropertyCard';
import { 
  SlidersHorizontal, 
  Search, 
  MapPin, 
  Building2, 
  Bed, 
  RotateCcw, 
  Sparkles,
  ArrowUpDown,
  Home
} from 'lucide-react';

interface PropertiesPageProps {
  properties: Property[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onSelectProperty: (property: Property) => void;
  initialFilters?: Partial<FilterState>;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  initialFilters,
}) => {
  const [keyword, setKeyword] = useState(initialFilters?.keyword || '');
  const [location, setLocation] = useState(initialFilters?.location || '');
  const [propertyType, setPropertyType] = useState(initialFilters?.propertyType || '');
  const [bedrooms, setBedrooms] = useState<number | undefined>(initialFilters?.bedrooms);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(initialFilters?.maxPrice);
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // Keyword match (Title, description, address)
        if (keyword.trim()) {
          const term = keyword.toLowerCase();
          const matches =
            p.title.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.address.toLowerCase().includes(term) ||
            p.location.toLowerCase().includes(term);
          if (!matches) return false;
        }

        // Location match
        if (location && location !== 'all') {
          if (!p.location.toLowerCase().includes(location.toLowerCase())) {
            return false;
          }
        }

        // Property Type match
        if (propertyType && propertyType !== 'all') {
          if (p.propertyType.toLowerCase() !== propertyType.toLowerCase()) {
            return false;
          }
        }

        // Bedrooms match
        if (bedrooms && p.bedrooms < bedrooms) {
          return false;
        }

        // Max price match
        if (maxPrice && p.price > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [properties, keyword, location, propertyType, bedrooms, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setKeyword('');
    setLocation('');
    setPropertyType('');
    setBedrooms(undefined);
    setMaxPrice(undefined);
    setSortBy('newest');
  };

  const citiesList = Array.from(new Set(properties.map((p) => p.location)));

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 text-xs font-semibold uppercase tracking-wider border border-blue-500/30">
            <Home className="w-3.5 h-3.5" /> All Listed Real Estate
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Properties for Sale
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Browse our portfolio of authentic luxury villas, family residences, and modern penthouses across Pakistan.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left: Filter Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-24 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                  <span>Search Filters</span>
                </h3>
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Keyword Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Search Keywords</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="e.g. DHA, Canal, Spanish"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* City / Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" /> City / Region
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="">All Cities</option>
                  {citiesList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" /> Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="">All Types</option>
                  <option value="House">House</option>
                  <option value="Villa">Luxury Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              {/* Bedrooms filter */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-blue-600" /> Minimum Bedrooms
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {[undefined, 3, 4, 5].map((bedCount, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setBedrooms(bedCount)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        bedrooms === bedCount
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {bedCount ? `${bedCount}+` : 'Any'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Cap */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Maximum Budget (PKR)</label>
                <select
                  value={maxPrice || ''}
                  onChange={(e) => setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="">Any Budget</option>
                  <option value="15000000">Up to 1.5 Crore</option>
                  <option value="30000000">Up to 3.0 Crore</option>
                  <option value="50000000">Up to 5.0 Crore</option>
                  <option value="100000000">Up to 10.0 Crore</option>
                </select>
              </div>

              <button
                onClick={handleResetFilters}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
              >
                Clear All Filters
              </button>

            </div>
          </div>

          {/* Right: Property Results */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Results Header / Sort Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs sm:text-sm font-semibold text-slate-700">
                Found <span className="text-blue-600 font-extrabold">{filteredProperties.length}</span> luxury properties matching your criteria
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1 text-nowrap">
                  <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    isFavorite={favorites.includes(prop.id)}
                    onToggleFavorite={onToggleFavorite}
                    onSelectProperty={onSelectProperty}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">No Properties Found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  We could not find any properties matching your current filter selections. Try clearing your search parameters or broadening your budget.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2 rounded-full bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-200 hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
