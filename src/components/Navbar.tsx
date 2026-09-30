import React, { useState } from 'react';
import { User } from '../types';
import { 
  Building2, 
  Heart, 
  User as UserIcon, 
  PlusCircle, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  Code2, 
  LayoutDashboard,
  Home,
  Compass
} from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  activePage: string;
  setActivePage: (page: string) => void;
  favoritesCount: number;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenFlaskCode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activePage,
  setActivePage,
  favoritesCount,
  onOpenAuth,
  onLogout,
  onOpenFlaskCode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navigateTo = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo matching Professional Polish design */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-blue-200 group-hover:scale-105 transition-transform">
              H
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Home<span className="text-blue-600">Nest</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links with Professional Polish active state */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => navigateTo('home')}
              className={`transition-colors py-1 ${
                activePage === 'home'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('properties')}
              className={`transition-colors py-1 ${
                activePage === 'properties'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'hover:text-blue-600'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => navigateTo('sell')}
              className={`transition-colors py-1 ${
                activePage === 'sell'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'hover:text-blue-600'
              }`}
            >
              Sell Property
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`transition-colors py-1 ${
                activePage === 'about'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'hover:text-blue-600'
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`transition-colors py-1 ${
                activePage === 'contact'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'hover:text-blue-600'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Python / Flask Source Code Viewer Modal Trigger */}
            <button
              onClick={onOpenFlaskCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 transition-all"
              title="Inspect Python Flask backend code & setup guide"
            >
              <Code2 className="w-4 h-4 text-blue-600" />
              <span>Flask Files</span>
            </button>

            {/* Saved Wishlist */}
            <button
              onClick={() => navigateTo('favorites')}
              className={`relative p-2 rounded-lg border transition-all ${
                activePage === 'favorites'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600'
              }`}
              title="Saved Favorites"
            >
              <Heart className={`w-4.5 h-4.5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* User Profile / Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-all shadow-xs"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left leading-tight">
                    <span className="text-xs font-bold text-slate-900 block max-w-[100px] truncate">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 block">
                      {currentUser.role === 'admin' ? 'Administrator' : 'Member'}
                    </span>
                  </div>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Signed in as</p>
                      <p className="text-xs font-bold text-slate-800 truncate">{currentUser.email}</p>
                    </div>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => navigateTo('admin')}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        Admin Control Panel
                      </button>
                    )}

                    <button
                      onClick={() => navigateTo('dashboard')}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-500" />
                      User Dashboard
                    </button>

                    <button
                      onClick={() => navigateTo('sell')}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4 text-emerald-600" />
                      List New Property
                    </button>

                    <button
                      onClick={() => navigateTo('favorites')}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      Saved Wishlist ({favoritesCount})
                    </button>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onOpenAuth();
                  }}
                  className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-md shadow-blue-200 transition-all hover:scale-105"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => navigateTo('favorites')}
              className="p-2 text-slate-700 hover:text-rose-600 relative"
            >
              <Heart className={`w-6 h-6 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <button
            onClick={() => navigateTo('home')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-3 ${
              activePage === 'home' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700'
            }`}
          >
            <Home className="w-4 h-4" /> Home
          </button>
          <button
            onClick={() => navigateTo('properties')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-3 ${
              activePage === 'properties' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700'
            }`}
          >
            <Compass className="w-4 h-4" /> All Properties
          </button>
          <button
            onClick={() => navigateTo('sell')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-3 ${
              activePage === 'sell' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" /> Sell Property
          </button>
          <button
            onClick={() => navigateTo('about')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700"
          >
            About HomeNest
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700"
          >
            Contact & Advisory
          </button>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenFlaskCode();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 rounded-lg text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 flex items-center justify-center gap-2"
            >
              <Code2 className="w-4 h-4 text-amber-700" />
              View Python Flask Source Files
            </button>

            {currentUser ? (
              <div className="space-y-2 pt-2">
                <div className="px-3 py-2 bg-slate-50 rounded-lg">
                  <span className="text-xs text-slate-500 block">Logged in as</span>
                  <span className="text-sm font-bold text-slate-800">{currentUser.name}</span>
                </div>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => navigateTo('admin')}
                    className="w-full py-2 px-3 rounded-lg text-xs font-bold text-blue-900 bg-blue-50"
                  >
                    Admin Control Panel
                  </button>
                )}
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="w-full py-2 px-3 rounded-lg text-xs font-bold text-slate-700 bg-slate-100"
                >
                  Dashboard
                </button>
                <button
                  onClick={onLogout}
                  className="w-full py-2 px-3 rounded-lg text-xs font-bold text-rose-600 bg-rose-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg text-sm font-bold text-white bg-blue-900 text-center"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
