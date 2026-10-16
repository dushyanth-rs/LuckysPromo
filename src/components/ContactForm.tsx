'use client';
import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...form }),
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
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
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="bg-[#071326] rounded-xl p-6 sm:p-8 border border-[#152B52] shadow-xl space-y-5"
    >
      {/* Required for Netlify's build-time form detection */}
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
        </label>
      </p>

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
          value={form.phone}
          onChange={handleChange}
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
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-[#152B52]/60 border border-[#152B52] focus:border-[#C5A059] rounded-md text-sm text-white placeholder-gray-500 focus:outline-none transition-colors resize-none"
          placeholder="Tell us what you're looking for — products, quantities, timelines..."
        />
      </div>

      <p className="text-[11px] text-gray-400">
        By submitting this form, you agree to be contacted by Luckys Promo regarding your enquiry.
      </p>

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
