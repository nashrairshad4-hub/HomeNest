import React from 'react';
import { Building2, Phone, Mail, MapPin, ShieldCheck, Award, Heart, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, filter?: any) => void;
  onOpenFlaskCode: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenFlaskCode }) => {
  return (
    <footer className="bg-white border-t border-slate-200">
      
      {/* Top Footer Bar with Live Platform Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-8 flex-wrap justify-center">
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-xl sm:text-2xl font-bold text-blue-600 leading-none">1.2k+</span>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Happy Clients</span>
          </div>
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-xl sm:text-2xl font-bold text-blue-600 leading-none">450+</span>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Properties Sold</span>
          </div>
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-xl sm:text-2xl font-bold text-blue-600 leading-none">15+</span>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cities Covered</span>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <p className="text-xs text-slate-500 font-medium">Ready to list your own property?</p>
          <button
            onClick={() => onNavigate('sell')}
            className="px-5 py-2 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
          >
            List Property Now
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-blue-200">
                H
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Home<span className="text-blue-600">Nest</span>
              </span>
            </div>

            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-sm">
              Pakistan's premier destination for luxury residential houses, designer villas, and high-yield real estate investments. Built on authenticity, verified listings, and direct communication.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> 100% Verified Deeds
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                <Award className="w-3.5 h-3.5 text-emerald-600" /> Direct Seller Contact
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Navigation</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('properties')} className="hover:text-blue-600 transition-colors">
                  Properties
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sell')} className="hover:text-blue-600 transition-colors">
                  Sell Property
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-600 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-600 transition-colors">
                  Contact Advisory
                </button>
              </li>
            </ul>
          </div>

          {/* Top Locations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Top Cities</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <button onClick={() => onNavigate('properties', { location: 'Faisalabad' })} className="hover:text-blue-600 transition-colors">
                  Faisalabad Properties
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('properties', { location: 'Lahore' })} className="hover:text-blue-600 transition-colors">
                  Lahore (DHA / Gulberg)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('properties', { location: 'Islamabad' })} className="hover:text-blue-600 transition-colors">
                  Islamabad (F-7 / E-11)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('properties', { location: 'Karachi' })} className="hover:text-blue-600 transition-colors">
                  Karachi (Clifton / DHA)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('properties', { location: 'Rawalpindi' })} className="hover:text-blue-600 transition-colors">
                  Rawalpindi (Bahria Town)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Flask Code */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Head Office</h4>
            <div className="text-xs text-slate-600 space-y-2 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Executive Boulevard, Canal Road, Faisalabad</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>+92 (300) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>concierge@homenest.com</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenFlaskCode}
                className="w-full py-2 px-3 text-xs font-semibold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Inspect Python Flask Source</span>
              </button>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} HomeNest — Premium Real Estate. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-700 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-700 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-700 cursor-pointer">Buyer Protection</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
