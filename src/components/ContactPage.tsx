import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Building2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Property Purchase Advisory');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Header */}
      <div className="bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            Private Client Advisory
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight">
            Connect With Our Real Estate Specialists
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Schedule a private property viewing, discuss a listing valuation, or inquire about premium land acquisitions.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Corporate Head Office
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-xs">Faisalabad Office</strong>
                    <span>Executive Boulevard, Canal Road, Faisalabad, Punjab</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-xs">Direct Telephone</strong>
                    <span>+92 (300) 123-4567 / +92 (41) 888-9999</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-xs">Client Services</strong>
                    <span>concierge@homenest.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-xs">Office Hours</strong>
                    <span>Mon – Sat: 9:00 AM – 7:00 PM (PKT)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500">
                <strong className="text-slate-800 block mb-1">Regional Chapters:</strong>
                Lahore (DHA Phase 5) &bull; Islamabad (Sector F-7 Markaz) &bull; Karachi (Clifton Block 4)
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-slate-500">Our concierge team responds within 2 hours.</p>
              </div>

              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-emerald-900">Message Dispatched!</h4>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    Thank you, {name}. A dedicated property advisor has received your request and will contact you via {phone || email}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Tariq Mansoor"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tariq@domain.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Subject / Inquiry Type</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      >
                        <option value="Property Purchase Advisory">Property Purchase Advisory</option>
                        <option value="Listing My Villa for Sale">Listing My Villa for Sale</option>
                        <option value="Legal Deed / Title Verification">Legal Deed / Title Verification</option>
                        <option value="Commercial Land & Investment">Commercial Land & Investment</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-slate-700">Your Message *</label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please specify city preference, budget, or property ID if applicable..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-900/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Concierge</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
