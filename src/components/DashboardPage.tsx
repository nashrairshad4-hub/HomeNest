import React, { useState } from 'react';
import { Property, User, Inquiry } from '../types';
import { PropertyCard } from './PropertyCard';
import { formatPKR } from '../data/initialData';
import { 
  User as UserIcon, 
  Building2, 
  Heart, 
  Mail, 
  PlusCircle, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Phone,
  Eye,
  Edit,
  ShieldCheck
} from 'lucide-react';

interface DashboardPageProps {
  currentUser: User;
  properties: Property[];
  favorites: number[];
  inquiries: Inquiry[];
  onToggleFavorite: (id: number) => void;
  onSelectProperty: (property: Property) => void;
  onDeleteProperty: (id: number) => void;
  onTogglePropertyStatus: (id: number) => void;
  onNavigateToSell: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  currentUser,
  properties,
  favorites,
  inquiries,
  onToggleFavorite,
  onSelectProperty,
  onDeleteProperty,
  onTogglePropertyStatus,
  onNavigateToSell,
}) => {
  const [activeTab, setActiveTab] = useState<'my_listings' | 'favorites' | 'inquiries'>('my_listings');

  const myProperties = properties.filter(
    (p) => p.userId === currentUser.id || currentUser.role === 'admin'
  );
  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));
  const myInquiries = inquiries.filter((inq) => {
    // If user listed the property or is admin
    const prop = properties.find((p) => p.id === inq.propertyId);
    return prop?.userId === currentUser.id || currentUser.role === 'admin';
  });

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Header Banner */}
      <div className="bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-900 text-white flex items-center justify-center font-serif text-2xl font-bold shadow-xl border border-blue-700">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                  {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {currentUser.role === 'admin' ? 'Administrator' : 'Verified Member'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {currentUser.email} &bull; Member since {currentUser.joinedDate}
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToSell}
            className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List New Property</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('my_listings')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'my_listings'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>My Listed Properties ({myProperties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'favorites'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({favoriteProperties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'inquiries'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Buyer Inquiries ({myInquiries.length})</span>
          </button>
        </div>

        {/* Tab 1: My Listed Properties */}
        {activeTab === 'my_listings' && (
          <div className="space-y-4">
            {myProperties.length > 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Property</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {myProperties.map((prop) => (
                        <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={prop.image}
                                alt=""
                                className="w-14 h-11 rounded-lg object-cover"
                              />
                              <div>
                                <span
                                  onClick={() => onSelectProperty(prop)}
                                  className="font-serif font-bold text-slate-900 text-sm hover:text-blue-900 cursor-pointer block max-w-xs truncate"
                                >
                                  {prop.title}
                                </span>
                                <span className="text-slate-400 text-[11px]">
                                  {prop.propertyType} &bull; {prop.area} &bull; {prop.bedrooms} Beds
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 font-bold text-slate-900">
                            {formatPKR(prop.price)}
                          </td>

                          <td className="px-6 py-4 text-slate-600">
                            {prop.location}
                          </td>

                          <td className="px-6 py-4">
                            <button
                              onClick={() => onTogglePropertyStatus(prop.id)}
                              className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-xs transition-all ${
                                prop.status === 'Available'
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                              }`}
                              title="Click to toggle status"
                            >
                              {prop.status === 'Available' ? 'Available' : 'Sold Out'} (Toggle)
                            </button>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onSelectProperty(prop)}
                                className="p-1.5 rounded-lg text-slate-600 hover:text-blue-900 hover:bg-blue-50"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onDeleteProperty(prop.id)}
                                className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50"
                                title="Delete Listing"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
                <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Building2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-800">No Listed Properties Yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You haven't listed any houses or villas for sale yet. Publish your first property to start receiving buyer leads.
                </p>
                <button
                  onClick={onNavigateToSell}
                  className="px-5 py-2.5 rounded-full bg-blue-900 text-white font-bold text-xs"
                >
                  List Property Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Favorites */}
        {activeTab === 'favorites' && (
          <div>
            {favoriteProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    isFavorite={true}
                    onToggleFavorite={onToggleFavorite}
                    onSelectProperty={onSelectProperty}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
                <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-800">Your Wishlist is Empty</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Save your favorite houses and villas by clicking the heart icon on any listing card.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Buyer Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            {myInquiries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myInquiries.map((inq) => (
                  <div key={inq.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">{inq.name}</h4>
                      <span className="text-[11px] text-slate-400">{inq.createdAt}</span>
                    </div>

                    <div className="text-xs text-blue-900 font-semibold bg-blue-50/70 p-2 rounded-lg truncate">
                      Re: {inq.propertyTitle}
                    </div>

                    <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl">
                      "{inq.message}"
                    </p>

                    <div className="flex items-center justify-between pt-2 text-xs text-slate-500 border-t border-slate-100">
                      <a href={`tel:${inq.phone}`} className="flex items-center gap-1 text-slate-700 hover:text-blue-900 font-semibold">
                        <Phone className="w-3.5 h-3.5" /> {inq.phone}
                      </a>
                      <a href={`mailto:${inq.email}`} className="flex items-center gap-1 text-slate-700 hover:text-blue-900 font-semibold">
                        <Mail className="w-3.5 h-3.5" /> {inq.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
                <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Mail className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-800">No Inquiries Received Yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  When potential buyers submit messages for your listings, they will appear here in real-time.
                </p>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
