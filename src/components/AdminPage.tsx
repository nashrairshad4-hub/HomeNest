import React, { useState } from 'react';
import { Property, User, Inquiry } from '../types';
import { formatPKR } from '../data/initialData';
import { 
  ShieldCheck, 
  Building2, 
  Users, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Eye, 
  Search,
  ArrowUpDown,
  Plus
} from 'lucide-react';

interface AdminPageProps {
  properties: Property[];
  users: User[];
  inquiries: Inquiry[];
  onTogglePropertyStatus: (id: number) => void;
  onDeleteProperty: (id: number) => void;
  onSelectProperty: (property: Property) => void;
  onNavigateToSell: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  properties,
  users,
  inquiries,
  onTogglePropertyStatus,
  onDeleteProperty,
  onSelectProperty,
  onNavigateToSell,
}) => {
  const [adminTab, setAdminTab] = useState<'properties' | 'users' | 'inquiries'>('properties');
  const [searchQuery, setSearchQuery] = useState('');

  const totalProperties = properties.length;
  const availableCount = properties.filter((p) => p.status === 'Available').length;
  const soldCount = properties.filter((p) => p.status === 'Sold').length;

  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Admin Header */}
      <div className="bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Super Admin Portal
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold">
              System Control Center
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Manage database records, toggle property status, inspect inquiries and user registry.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onNavigateToSell}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Listing
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Metric KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Users</span>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">{users.length}</p>
            <span className="text-[11px] font-semibold text-blue-800">Accounts</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Properties</span>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-blue-900">{totalProperties}</p>
            <span className="text-[11px] font-semibold text-slate-500">Listed Portfolio</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Available</span>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-600">{availableCount}</p>
            <span className="text-[11px] font-semibold text-emerald-700">Active Market</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sold</span>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-rose-600">{soldCount}</p>
            <span className="text-[11px] font-semibold text-rose-700">Completed Deals</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1 col-span-2 lg:col-span-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Inquiries</span>
            <p className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-600">{inquiries.length}</p>
            <span className="text-[11px] font-semibold text-amber-700">Lead Pipeline</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setAdminTab('properties')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
              adminTab === 'properties'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Manage Properties ({properties.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('users')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
              adminTab === 'users'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Registered Users ({users.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('inquiries')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
              adminTab === 'inquiries'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>All Inquiries ({inquiries.length})</span>
          </button>
        </div>

        {/* Tab 1: Properties Table */}
        {adminTab === 'properties' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="relative w-full max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter listings..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>

              <div className="text-xs text-slate-500">
                Showing {filteredProperties.length} listings
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Property</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Toggle Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 text-slate-400 font-mono">#{prop.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={prop.image} alt="" className="w-12 h-9 rounded-lg object-cover" />
                          <div>
                            <span
                              onClick={() => onSelectProperty(prop)}
                              className="font-serif font-bold text-slate-900 hover:text-blue-900 cursor-pointer block max-w-xs truncate"
                            >
                              {prop.title}
                            </span>
                            <span className="text-slate-400 text-[11px]">
                              {prop.location} &bull; {prop.propertyType}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900">{formatPKR(prop.price)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            prop.status === 'Available'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {prop.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => onTogglePropertyStatus(prop.id)}
                          className="text-[11px] font-bold text-blue-900 hover:underline"
                        >
                          Mark as {prop.status === 'Available' ? 'Sold' : 'Available'}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onSelectProperty(prop)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-900 hover:bg-blue-50"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteProperty(prop.id)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50"
                            title="Delete"
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
        )}

        {/* Tab 2: Users Registry */}
        {adminTab === 'users' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Properties Listed</th>
                    <th className="px-6 py-4">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {users.map((u) => {
                    const userPropsCount = properties.filter((p) => p.userId === u.id).length;
                    return (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold">
                              {u.name.charAt(0)}
                            </div>
                            <span>{u.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{u.email}</td>
                        <td className="px-6 py-4 text-slate-600">{u.phone || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              u.role === 'admin'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">{userPropsCount} Listings</td>
                        <td className="px-6 py-4 text-slate-400">{u.joinedDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Inquiries Pipeline */}
        {adminTab === 'inquiries' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Buyer Lead</th>
                    <th className="px-6 py-4">Target Property</th>
                    <th className="px-6 py-4">Contact Info</th>
                    <th className="px-6 py-4">Message</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{inq.name}</td>
                      <td className="px-6 py-4 text-blue-900 font-semibold max-w-xs truncate">
                        {inq.propertyTitle}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <div>{inq.phone}</div>
                        <div className="text-slate-400 text-[11px]">{inq.email}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 max-w-xs truncate italic">
                        "{inq.message}"
                      </td>
                      <td className="px-6 py-4 text-slate-400">{inq.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
