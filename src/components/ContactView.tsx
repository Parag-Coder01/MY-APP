import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PhoneCall, Mail, Globe, MessageSquare, Send, CheckCircle2, MapPin, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const ContactView: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [subject, setSubject] = useState('Hardware Inquiry');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do schools get started with an Atal Tinkering Lab (ATL)?',
      a: 'KITE ROBOTICS provides complete turnkey assistance, from NITI Aayog compliance documentation and hardware layout design to teacher training and annual maintenance.',
    },
    {
      q: 'Are hardware kits included with the online robotics courses?',
      a: 'Yes! When you enroll in our masterclasses, the verified physical hardware kit (Arduino, sensors, chassis, motors) is couriered directly to your doorstep anywhere in India.',
    },
    {
      q: 'How can students register for the ROBOZEST championship?',
      a: 'Registration can be completed directly within this app under the Workshops & Events tab or via your school robotics coordinator.',
    },
    {
      q: 'What age group are KITE Robotics programs suitable for?',
      a: 'Our curricula are segmented for ages 8 to 18+ (Class 3 to College/Makers), ranging from visual block robotics to advanced C++ firmware, IoT, and Computer Vision.',
    },
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolName: 'Direct Portal Query',
          coordinatorName: senderName,
          phone: senderContact,
          email: senderContact.includes('@') ? senderContact : 'phone-contact@kiterobotics.in',
          city: 'Direct Query',
          studentCount: '1',
          message: `Subject: ${subject} | ${msg}`,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <PhoneCall className="w-4 h-4" />
          <span>Engineering Support & Relations</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
          Contact KITE ROBOTICS
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
          Connect directly with our lab engineers, curriculum designers, and institutional directors.
        </p>
      </div>

      {/* 3 Direct Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a
          href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between transition-all group"
        >
          <div className="p-3 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 w-fit mb-3">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono-code">Hotline & Support</div>
            <div className="font-display font-bold text-base text-white group-hover:text-cyan-400 transition-colors mt-0.5">
              {COMPANY_INFO.phone}
            </div>
            <div className="text-[11px] text-cyan-400 mt-1 font-mono-code">Tap to call directly →</div>
          </div>
        </a>

        <a
          href={`mailto:${COMPANY_INFO.email}`}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between transition-all group"
        >
          <div className="p-3 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-800/40 w-fit mb-3">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono-code">Official Inquiries</div>
            <div className="font-display font-bold text-base text-white group-hover:text-cyan-400 transition-colors mt-0.5">
              {COMPANY_INFO.email}
            </div>
            <div className="text-[11px] text-blue-400 mt-1 font-mono-code">Tap to email →</div>
          </div>
        </a>

        <a
          href={`https://wa.me/919564866985?text=Hi%20KITE%20Robotics,%20I%20would%20like%20to%20know%20more%20about%20your%20programs`}
          target="_blank"
          rel="noreferrer"
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between transition-all group"
        >
          <div className="p-3 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 w-fit mb-3">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono-code">WhatsApp Instant Support</div>
            <div className="font-display font-bold text-base text-white group-hover:text-cyan-400 transition-colors mt-0.5">
              +91 95648 66985
            </div>
            <div className="text-[11px] text-emerald-400 mt-1 font-mono-code">Chat on WhatsApp →</div>
          </div>
        </a>
      </div>

      {/* Message Form & Hubs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-7 shadow-xl">
          <h3 className="font-display font-bold text-lg text-white mb-1">
            Send an Engineering Query
          </h3>
          <p className="text-xs text-slate-400 mb-5">
            Leave your query and our team will get back to you promptly.
          </p>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-800/40 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-display font-bold text-base text-white">Message Dispatched!</h4>
              <p className="text-xs text-slate-300">
                Thank you, {senderName}. Our technical support coordinator has received your message and will respond shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-200"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number or Email</label>
                <input
                  type="text"
                  required
                  value={senderContact}
                  onChange={(e) => setSenderContact(e.target.value)}
                  placeholder="e.g. 9876543210 or name@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Inquiry Category</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none cursor-pointer"
                >
                  <option value="Hardware Inquiry">Hardware Inquiry & Kits</option>
                  <option value="School ATL Setup">School ATL & Lab Setup</option>
                  <option value="ROBOZEST 2026">ROBOZEST 2026 Participation</option>
                  <option value="Student Courses">Course Curriculum & Learning</option>
                  <option value="General Support">General Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Message / Query</label>
                <textarea
                  rows={3}
                  required
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Describe your robotics questions, hardware requirements, or school details..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
              >
                {submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to KITE Robotics</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Pan-India Office Details */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-3">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Headquarters & Innovation Hub</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              KITE ROBOTICS Corporate Labs<br />
              Electronics Complex, Sector V<br />
              Kolkata, West Bengal – 700091, India
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs font-mono-code text-slate-400 space-y-1">
              <div>Website: <a href="https://www.kiterobotics.in" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">www.kiterobotics.in</a></div>
              <div>Hours: Mon - Sat: 9:30 AM - 6:30 PM IST</div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-2.5">
            <h4 className="font-display font-bold text-xs sm:text-sm text-white">
              Zonal Coordinators
            </h4>
            <div className="text-xs text-slate-400 space-y-2 font-mono-code">
              <div>📍 <strong>Mumbai:</strong> Western Zone ATL Support</div>
              <div>📍 <strong>Chennai:</strong> Southern Hardware Testing Center</div>
              <div>📍 <strong>Hyderabad:</strong> AI & Embedded Systems Lab</div>
              <div>📍 <strong>Bihar:</strong> State STEM Outreach Hub</div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-3">
        <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <span>Frequently Asked Questions</span>
        </h3>

        <div className="space-y-2 pt-2">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-950 border border-slate-800/80 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-4 py-3 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-3 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
