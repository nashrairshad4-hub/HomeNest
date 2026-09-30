import React, { useState } from 'react';
import { User } from '../types';
import { X, ShieldCheck, User as UserIcon, Lock, Mail, Phone, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  onRegister: (newUser: User) => void;
  existingUsers: User[];
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  existingUsers,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      if (!name || !email || !password) {
        setError('Please fill in all required fields.');
        return;
      }
      const existing = existingUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        setError('An account with this email address already exists.');
        return;
      }

      const newUser: User = {
        id: Date.now(),
        name,
        email,
        phone: phone || '+92 300 1234567',
        role: 'user',
        joinedDate: new Date().toISOString().split('T')[0],
      };

      onRegister(newUser);
      onClose();
    } else {
      if (!email || !password) {
        setError('Please enter your email and password.');
        return;
      }

      const found = existingUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        onLogin(found);
        onClose();
      } else {
        // Automatically create session for testing convenience
        const guestUser: User = {
          id: Date.now(),
          name: email.split('@')[0],
          email,
          phone: '+92 300 1234567',
          role: email.includes('admin') ? 'admin' : 'user',
          joinedDate: new Date().toISOString().split('T')[0],
        };
        onLogin(guestUser);
        onClose();
      }
    }
  };

  const selectDemoUser = (user: User) => {
    onLogin(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              {isRegister ? 'Create Your Account' : 'Welcome to HomeNest'}
            </h3>
            <p className="text-xs text-slate-500">
              {isRegister
                ? 'Join thousands of luxury home buyers and verified sellers'
                : 'Sign in to manage your listings and track buyer inquiries'}
            </p>
          </div>

          {/* 1-Click Demo Accounts */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-center">
              Quick Test Demo Accounts
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => selectDemoUser(existingUsers[0])}
                className="p-2 rounded-xl bg-blue-900 text-white text-[11px] font-bold hover:bg-blue-800 flex items-center justify-center gap-1.5 shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </button>
              <button
                type="button"
                onClick={() => selectDemoUser(existingUsers[1])}
                className="p-2 rounded-xl bg-slate-200 text-slate-800 text-[11px] font-bold hover:bg-slate-300 flex items-center justify-center gap-1.5 shadow-xs"
              >
                <UserIcon className="w-3.5 h-3.5 text-blue-900" />
                <span>Seller: Bilal</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isRegister && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bilal Irshad"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            {isRegister && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Phone / WhatsApp</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-900/20 transition-all hover:scale-[1.01]"
            >
              {isRegister ? 'Complete Registration' : 'Sign In to HomeNest'}
            </button>
          </form>

          <div className="text-center pt-1 border-t border-slate-100 text-xs text-slate-500">
            {isRegister ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="font-bold text-blue-900 hover:underline"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className="font-bold text-blue-900 hover:underline"
                >
                  Register Free
                </button>
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
