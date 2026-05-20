'use client';

import React, { useState } from 'react';
import { Package, Save, IndianRupee, BookOpen, User, Hash, Building2, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PurchasePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    publisher: '',
    bookName: '',
    author: '',
    batchNo: '',
    purchasePrice: '',
    quantity: '',
    category: 'General',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          purchasePrice: parseFloat(formData.purchasePrice),
          quantity: parseInt(formData.quantity),
        }),
      });

      if (response.ok) {
        showToast('पुस्तक सफलतापूर्वक खरीदी गई!', 'success');
        setFormData({
          publisher: '',
          bookName: '',
          author: '',
          batchNo: '',
          purchasePrice: '',
          quantity: '',
          category: 'General',
        });
      } else {
        showToast('Error purchasing book. Please try again.', 'error');
      }
    } catch (error) {
      showToast('Error: ' + (error as Error).message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              पुस्तक खरीद
            </h1>
            <p className="text-gray-600 mt-2">पुस्तकालय के लिए नई पुस्तकें खरीदें</p>
          </div>
          <button
            onClick={() => router.push('/admin')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition shadow-sm border border-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </button>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Book Purchase Form</h2>
                  <p className="text-sm text-gray-500">Fill in the details below</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Publisher Name */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-orange-500" />
                    प्रकाशक का नाम (Publisher Name)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.publisher}
                    onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all group-hover:border-orange-300"
                    placeholder="प्रकाशक का नाम दर्ज करें"
                  />
                </div>

                {/* Book Name */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-orange-500" />
                    पुस्तक का नाम (Book Name)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bookName}
                    onChange={(e) => setFormData({ ...formData, bookName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all group-hover:border-orange-300"
                    placeholder="पुस्तक का नाम दर्ज करें"
                  />
                </div>

                {/* Author Name */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-500" />
                    लेखक का नाम (Author Name)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all group-hover:border-orange-300"
                    placeholder="लेखक का नाम दर्ज करें"
                  />
                </div>

                {/* Batch Number */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-orange-500" />
                    बैच नंबर (Batch Number)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.batchNo}
                    onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all group-hover:border-orange-300"
                    placeholder="बैच नंबर दर्ज करें"
                  />
                </div>

                {/* Price and Quantity Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-orange-500" />
                      क्रय मूल्य
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.purchasePrice}
                      onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all group-hover:border-orange-300"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Package className="w-4 h-4 text-orange-500" />
                      मात्रा
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all group-hover:border-orange-300"
                      placeholder="1"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    श्रेणी (Category)
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all group-hover:border-orange-300 bg-white"
                  >
                    <option value="General">General</option>
                    <option value="Vedic">Vedic</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="Religion">Religion</option>
                    <option value="History">History</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-4 rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all font-semibold shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      पुस्तक खरीदें (Purchase Book)
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white sticky top-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Purchase Info</h3>
              <p className="text-orange-100 text-sm mb-4">
                Fill in all the required details to purchase books for the library. The books will be automatically added to the library inventory.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Auto-add to library</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Database sync</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Instant availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {toast.show && (
          <div className={`fixed top-4 right-4 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl z-50 animate-in slide-in-from-right duration-300 ${
            toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span className="font-medium">{toast.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
