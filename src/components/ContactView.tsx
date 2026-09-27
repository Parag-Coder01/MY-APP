import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PhoneCall, Mail, Globe, MessageSquare, Send, CheckCircle2, MapPin, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'School Lab (ATL) Setup',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'School Lab (ATL) Setup',
        message: '',
      });
    }, 4000);
  };

  const faqs = [
    {
      q: 'How can our school partner with KITE Robotics for an Atal Tinkering Lab (ATL)?',
      a: 'We provide end-to-end support for Atal Tinkering Lab setup, including lab interior design, procurement of NITI Aayog compliant equipment, hands-on STEM curriculum books, and certified teacher training workshops.',
    },
    {
      q: 'Do you offer customized robotics kits for college competitions or robo-wars?',
      a: 'Yes! We engineer custom aluminum and carbon-fiber chassis, high-torque planetary gear motors, high-discharge LiPo battery modules, and heavy-duty motor drivers tested for national-level combat and line-follower challenges.',
    },
    {
      q: 'What turn-around time can we expect for custom educational ERP & LMS portals?',
      a: 'Depending on feature scope, our enterprise engineering team delivers a production-ready, cloud-hosted School ERP or Learning Management System within 3 to 6 weeks, complete with automated student report cards and fee management.',
    },
    {
      q: 'Can students verify their internship and workshop certificates online?',
      a: 'Absolutely. Every certificate issued by KITE Robotics comes with a tamper-proof cryptographic QR code and unique Serial ID that can be verified 24/7 on our Certificates Portal.',
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono-code">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Direct Headquarters Hotline & Technical Hub
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
            Connect with KITE Robotics
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Whether you want to install an AI & Robotics Lab at your institution, order bulk STEM DIY hardware kits, or build a bespoke enterprise software portal, our technical team is ready to assist you.
          </p>
        </div>
      </div>

      {/* Main Grid: Contact Channels & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Communication Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="font-display font-bold text-lg text-white">
            Direct Official Channels
          </div>

          {/* Hotline Card */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 space-y-3 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono-code text-cyan-400 font-semibold uppercase tracking-wider">
                  Technical Hotline & Admissions
                </div>
                <div className="font-mono-code font-bold text-base text-white">
                  {COMPANY_INFO.phone}
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Direct line to our senior lab engineers and admissions coordinators. Available 9:30 AM to 6:30 PM IST.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                className="flex-1 py-2 rounded-xl bg-cyan-500 text-slate-950 font-mono-code text-xs font-bold text-center hover:bg-cyan-400 transition-colors shadow-sm"
              >
                Call Now
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Hello KITE Robotics, I would like to inquire about robotics courses and lab setup.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-xl bg-emerald-600 text-white font-mono-code text-xs font-bold text-center hover:bg-emerald-500 transition-colors"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 space-y-3 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono-code text-blue-400 font-semibold uppercase tracking-wider">
                  Official Email Inbox
                </div>
                <div className="font-mono-code font-bold text-sm text-white">
                  {COMPANY_INFO.email}
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              For official institutional proposals, tenders, invoices, and curriculum partnerships.
            </p>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="inline-block w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-mono-code text-xs font-bold text-center transition-colors"
            >
              Compose Email
            </a>
          </div>

          {/* Campus Location Card */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono-code text-amber-400 font-semibold uppercase tracking-wider">
                  Corporate HQ & Robotics R&D Lab
                </div>
                <div className="font-display font-bold text-sm text-white">
                  KITE Robotics Center
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {COMPANY_INFO.address}, Salt Lake Sector V, Electronics Complex,<br />
              Kolkata, West Bengal – 700091, India
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs font-mono-code text-slate-400 space-y-1">
              <div>Website: <a href="https://www.kiterobotics.in" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">www.kiterobotics.in</a></div>
              <div>Hours: Mon - Sat: 9:30 AM - 6:30 PM IST</div>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Submission Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="space-y-2 mb-6">
              <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span>Send Us an Inquiry / Partnership Request</span>
              </h2>
              <p className="text-xs text-slate-400">
                Fill out the form below and an engineering coordinator will respond within 4 business hours.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-display font-bold text-lg text-white">
                  Inquiry Received Successfully!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out to KITE Robotics. Our operations lead has been notified and will contact you via WhatsApp and phone shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-slate-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Rajesh Sharma"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-slate-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rajesh@institution.edu"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-slate-300">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-slate-300">
                      Area of Interest
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                    >
                      <option>School Lab (ATL) Setup</option>
                      <option>Robotics Hardware Kits Bulk Order</option>
                      <option>Student Course Enrollment</option>
                      <option>Enterprise IT & ERP Services</option>
                      <option>Workshop / Faculty Training</option>
                      <option>General Support & Inquiries</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono-code text-slate-300">
                    Your Requirements & Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your institution, estimated number of students, or software requirements..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono-code font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Official Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <h2 className="font-display font-bold text-lg text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-slate-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4 cursor-pointer"
              >
                <span className="font-display font-semibold text-sm text-slate-200 hover:text-cyan-400 transition-colors">
                  {faq.q}
                </span>
                {faqOpen === idx ? (
                  <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </button>
              {faqOpen === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 text-xs text-slate-400 leading-relaxed pr-6"
                >
                  {faq.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
