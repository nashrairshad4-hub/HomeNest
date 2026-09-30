import React from 'react';
import { Building2, Award, ShieldCheck, Users, Target, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onNavigateToProperties: () => void;
  onNavigateToContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateToProperties,
  onNavigateToContact,
}) => {
  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Header Banner */}
      <div className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-900/60 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Our Story & Heritage
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight">
            Redefining Luxury Living Across Pakistan
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            HomeNest was founded with a singular mission: to make luxury real estate transactions transparent, direct, and legally protected.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">Our Vision</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              A Bespoke Real Estate Marketplace for Discerning Families
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We recognized the friction buyers and sellers experience in conventional property markets: unverified listings, phantom prices, and opaque commission fees.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              HomeNest connects verified homeowners directly with qualified buyers, pairing high-definition photography with thorough architectural specifications and legal authenticity.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
              alt="Architecture"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent flex items-end p-6">
              <span className="text-white font-serif font-bold text-lg">Architectural Masterpieces Only</span>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">Principles</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              The HomeNest Standard
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900">100% Deed Verification</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Every listed property undergoes title registry checks and society transfer verification.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900">Fair Market Valuations</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Accurate price assessments grounded in real transactional data from DHA, Bahria, and prime sectors.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900">Direct Communication</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Connect directly with sellers without middlemen, hidden markups, or unnecessary hassle.
              </p>
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="bg-blue-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold">Looking to buy or sell a luxury home?</h3>
            <p className="text-blue-100 text-xs sm:text-sm">Speak with our private concierge team or explore live listings.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onNavigateToProperties}
              className="px-5 py-2.5 rounded-full bg-white text-blue-900 font-bold text-xs shadow-md"
            >
              Browse Properties
            </button>
            <button
              onClick={onNavigateToContact}
              className="px-5 py-2.5 rounded-full bg-blue-800 text-white font-bold text-xs border border-blue-700 hover:bg-blue-700"
            >
              Contact Advisory
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
