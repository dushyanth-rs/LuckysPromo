'use client';
import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', website: '' });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Matches the server's allowed phone charset (digits, spaces, +, -, ())
  // so invalid characters never appear in the field at all, instead of
  // being accepted and rejected only after submit.
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = e.target.value.replace(/[^0-9+\-\s()]/g, '');
    setForm((prev) => ({ ...prev, phone: filtered }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/contact-send/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        throw new Error(result.error || 'Failed to send');
      }
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '', website: '' });
      setConsent(false);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#071326] rounded-xl p-8 border border-[#152B52] text-center space-y-3">
        <CheckCircle2 className="w-10 h-10 text-[#C5A059] mx-auto" />
        <h3 className="text-xl font-bold text-white">Message Sent</h3>
        <p className="text-gray-300 text-sm">
          Thanks for reaching out — our team will get back to you shortly at the email or phone number you provided.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-[#071326] rounded-xl p-6 sm:p-8 border border-[#152B52] shadow-xl space-y-5"
    >
      {/* Honeypot: hidden from real users, bots that auto-fill every field
          will trip it. Kept out of the tab order and off-screen rather than
          display:none, which some bots skip. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[#152B52]/60 border border-[#152B52] focus:border-[#C5A059] rounded-md text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[#152B52]/60 border border-[#152B52] focus:border-[#C5A059] rounded-md text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="phone" className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          maxLength={20}
          value={form.phone}
          onChange={handlePhoneChange}
          className="w-full px-4 py-2.5 bg-[#152B52]/60 border border-[#152B52] focus:border-[#C5A059] rounded-md text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
          placeholder="Include your number so we can call you back"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={1000}
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-[#152B52]/60 border border-[#152B52] focus:border-[#C5A059] rounded-md text-sm text-white placeholder-gray-500 focus:outline-none transition-colors resize-none"
          placeholder="Tell us what you're looking for — products, quantities, timelines..."
        />
      </div>

      <div className="flex items-start gap-2.5">
        <input
          id="consent"
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 w-4 h-4 shrink-0 accent-[#0068C8] cursor-pointer"
        />
        <label htmlFor="consent" className="text-[11px] text-gray-400 cursor-pointer">
          I consent to Luckys Promo collecting and using the information above to respond to my enquiry.
        </label>
      </div>

      {status === 'error' && (
        <p className="text-xs text-red-400">
          Something went wrong sending your message. Please try again, or reach us directly on WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto bg-[#0068C8] hover:bg-[#0054A3] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-7 py-3 rounded-sm text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
      >
        <Send className="w-4 h-4" />
        <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
      </button>
    </form>
  );
};
