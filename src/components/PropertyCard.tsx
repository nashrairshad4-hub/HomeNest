import React from 'react';
import { Property } from '../types';
import { formatPKR } from '../data/initialData';
import { Bed, Bath, Maximize2, MapPin, Heart, ArrowRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all group flex flex-col h-full">
      {/* Image Box */}
      <div className="h-44 sm:h-48 relative overflow-hidden bg-slate-200">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-xs uppercase tracking-wider ${
              property.status === 'Available'
                ? property.featured
                  ? 'bg-emerald-500'
                  : 'bg-blue-600'
                : 'bg-rose-500'
            }`}
          >
            {property.status === 'Available' ? (property.featured ? 'PREMIUM' : 'FOR SALE') : 'SOLD'}
          </span>
          <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded">
            {property.propertyType}
          </span>
        </div>

        {/* Heart Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? 'bg-white text-red-500 shadow-md scale-105'
              : 'bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-red-500'
          }`}
          title={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Title */}
          <h3
            onClick={() => onSelectProperty(property)}
            className="font-bold text-slate-900 mb-1 text-base group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer"
          >
            {property.title}
          </h3>

          {/* Location */}
          <p className="text-xs text-slate-500 flex items-center gap-1 mb-3 truncate">
            <span>📍</span>
            <span>{property.location}, Pakistan</span>
            <span className="text-slate-400">&bull; {property.address}</span>
          </p>

          {/* Meta Specifications */}
          <div className="flex items-center gap-3.5 text-xs font-medium text-slate-600 mb-4 bg-slate-50 py-2 px-2.5 rounded-xl">
            <span className="flex items-center gap-1">🛏 {property.bedrooms} Beds</span>
            <span className="flex items-center gap-1">🛁 {property.bathrooms} Baths</span>
            <span className="flex items-center gap-1">📐 {property.area}</span>
          </div>
        </div>

        {/* Card Footer: Price & Details Button */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
          <div>
            <span className="text-base sm:text-lg font-bold text-blue-600 block">
              {formatPKR(property.price)}
            </span>
          </div>

          <button
            onClick={() => onSelectProperty(property)}
            className="text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-1"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
