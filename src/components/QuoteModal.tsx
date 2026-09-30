import React, { useState } from 'react';
import type { Product } from '../types/product';
import { X, Trash2, CheckCircle2, Send, Building, Mail, Phone, User } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteItems: Product[];
  onRemoveItem: (sku: string) => void;
  onClearQuote: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  quoteItems,
  onRemoveItem,
  onClearQuote,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    quantity: '100',
    printingType: 'Screen Printing',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClearQuote();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      
      <div 
        className="relative w-full max-w-3xl bg-[#0B1D3A] rounded-xl border border-[#C5A059]/60 shadow-2xl text-white overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#071326] px-6 py-4 border-b border-[#152B52] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#C5A059]" />
            <h3 className="text-lg font-bold text-white font-sans">
              Corporate Bulk Quote Request
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Quote Request Received!</h2>
              <p className="text-gray-300 text-sm max-w-md mx-auto">
                Thank you <strong>{formData.contactName || 'Valued Partner'}</strong>. A Luckys Promo corporate account representative from MANPOINTE TECH LLP will reach out to <strong>{formData.email || 'your email'}</strong> within 2 business hours with a formal quotation and digital mockups.
              </p>
            </div>

            <div className="bg-[#071326] p-4 rounded-lg border border-[#152B52] max-w-md mx-auto text-xs text-gray-400 space-y-1 text-left">
              <p><strong className="text-white">Company:</strong> {formData.companyName || 'Not specified'}</p>
              <p><strong className="text-white">Estimated Quantity:</strong> {formData.quantity} units</p>
              <p><strong className="text-white">Requested Items:</strong> {quoteItems.map(i => i.sku).join(', ')}</p>
            </div>

            <button
              onClick={handleReset}
              className="bg-[#0052CC] hover:bg-[#0043A8] text-white font-semibold text-sm px-6 py-2.5 rounded shadow transition-colors cursor-pointer"
            >
              Back to Catalog
            </button>
          </div>
        ) : (
          /* Main Form Screen */
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Column: Selected Products List (5 cols) */}
            <div className="md:col-span-5 bg-[#071326] p-4 rounded-lg border border-[#152B52] space-y-4 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3">
                  <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                    Selected Items ({quoteItems.length})
                  </span>
                  {quoteItems.length > 0 && (
                    <button
                      onClick={onClearQuote}
                      className="text-[11px] text-gray-400 hover:text-red-400 underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {quoteItems.length > 0 ? (
                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {quoteItems.map((item) => (
                      <div
                        key={item.sku}
                        className="bg-[#0B1D3A] p-2.5 rounded border border-gray-800 flex items-center justify-between text-xs group"
                      >
                        <div className="flex items-center space-x-2 overflow-hidden">
                          <span className="bg-[#0052CC] text-white font-mono text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0">
                            {item.sku}
                          </span>
                          <span className="text-gray-200 truncate font-medium">{item.name}</span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.sku)}
                          className="text-gray-500 hover:text-red-400 p-1 shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-gray-400">
                    No items selected yet. Browse the catalog and click "Add Quote".
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-gray-800 text-[11px] text-gray-400 space-y-1">
                <p>✦ Complimentary 3D logo placement mockups</p>
                <p>✦ Volume tiered pricing starting at 50 units</p>
              </div>

            </div>

            {/* Right Column: Inquiry Details Form (7 cols) */}
            <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1 font-medium">Company / Organization *</label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full pl-9 pr-3 py-2 bg-[#152B52]/50 border border-gray-700 rounded text-white text-xs focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 font-medium">Contact Person *</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="John Doe"
                      className="w-full pl-9 pr-3 py-2 bg-[#152B52]/50 border border-gray-700 rounded text-white text-xs focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1 font-medium">Work Email *</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full pl-9 pr-3 py-2 bg-[#152B52]/50 border border-gray-700 rounded text-white text-xs focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 font-medium">Phone / WhatsApp *</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2 bg-[#152B52]/50 border border-gray-700 rounded text-white text-xs focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1 font-medium">Est. Quantity (Units)</label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 bg-[#152B52]/50 border border-gray-700 rounded text-white text-xs focus:border-[#C5A059] focus:outline-none"
                  >
                    <option value="50">50 - 100 units</option>
                    <option value="100">100 - 250 units</option>
                    <option value="250">250 - 500 units</option>
                    <option value="500">500 - 1,000+ units</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 font-medium">Preferred Branding Method</label>
                  <select
                    value={formData.printingType}
                    onChange={(e) => setFormData({ ...formData, printingType: e.target.value })}
                    className="w-full px-3 py-2 bg-[#152B52]/50 border border-gray-700 rounded text-white text-xs focus:border-[#C5A059] focus:outline-none"
                  >
                    <option value="Screen Printing">Screen Printing (Blue)</option>
                    <option value="Digital Printing">Digital Printing (Magenta)</option>
                    <option value="Offset Printing">Offset Foil Stamping (Gold)</option>
                    <option value="UV Printing">UV 3D Embossed (Black)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-medium">Additional Customization Notes</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mention target event date, logo colors, or custom box packaging preferences..."
                  className="w-full p-2 bg-[#152B52]/50 border border-gray-700 rounded text-white text-xs focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={quoteItems.length === 0}
                className={`w-full py-3 rounded font-bold text-xs flex items-center justify-center space-x-2 shadow-lg transition-all cursor-pointer ${
                  quoteItems.length === 0
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#0052CC] to-[#0043A8] hover:from-[#0043A8] hover:to-[#00388A] text-white'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Official Quote Request</span>
              </button>

            </form>

          </div>
        )}

      </div>

    </div>
  );
};
