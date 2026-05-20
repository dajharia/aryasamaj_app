'use client';

import React, { useState } from 'react';
import { BookOpen, BookText, BookMarked, BookHeart, Library, BookType, ShoppingCart, Search, Heart, IndianRupee, X, ArrowRight, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useCart, CartProvider } from './CartContext';

function LibraryContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, cartCount, addToCart } = useCart();
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from database
  React.useEffect(() => {
    fetch('/api/books')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch books');
        }
        return res.json();
      })
      .then(data => {
        // Add icons to books
        const iconMap = [BookOpen, BookText, BookMarked, BookHeart, Library, BookType];
        const colorMap = ['text-orange-500', 'text-blue-500', 'text-green-500', 'text-yellow-600', 'text-pink-500', 'text-purple-500'];
        const coverMap = ['bg-orange-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-pink-100', 'bg-purple-100'];
        
        const booksWithIcons = data.map((book: any, index: number) => ({
          ...book,
          icon: iconMap[index % iconMap.length],
          iconColor: colorMap[index % colorMap.length],
          cover: coverMap[index % coverMap.length],
        }));
        setBooks(booksWithIcons);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        // Use mock data as fallback
        const mockBooks = [
          { id: 1, title: "सत्यार्थ प्रकाश", author: "महर्षि दयानन्द सरस्वती", price: 150, stock: 45, cover: "bg-orange-100", iconColor: "text-orange-500", icon: BookOpen },
          { id: 2, title: "ऋग्वेद भाष्य भूमिका", author: "महर्षि दयानन्द सरस्वती", price: 250, stock: 12, cover: "bg-blue-100", iconColor: "text-blue-500", icon: BookText },
          { id: 3, title: "आर्योद्देश्यरत्नमाला", author: "महर्षि दयानन्द सरस्वती", price: 50, stock: 100, cover: "bg-green-100", iconColor: "text-green-500", icon: BookMarked },
          { id: 4, title: "संस्कार विधि", author: "महर्षि दयानन्द सरस्वती", price: 120, stock: 5, cover: "bg-yellow-100", iconColor: "text-yellow-600", icon: BookHeart },
          { id: 5, title: "व्यवहार भानु", author: "महर्षि दयानन्द सरस्वती", price: 80, stock: 20, cover: "bg-pink-100", iconColor: "text-pink-500", icon: Library },
          { id: 6, title: "पंचमहायज्ञ विधि", author: "महर्षि दयानन्द सरस्वती", price: 40, stock: 0, cover: "bg-purple-100", iconColor: "text-purple-500", icon: BookType },
        ];
        setBooks(mockBooks);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-orange-900">आर्यसमाज ई-पुस्तकालय</h1>
          <p className="text-gray-600 mt-2">वैदिक साहित्य और पुस्तकें ऑनलाइन खरीदें</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="पुस्तक खोजें..." 
              className="w-full pl-10 pr-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            />
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center justify-center bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 transition shadow-sm whitespace-nowrap"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            कार्ट ({cartCount})
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            {/* Image Placeholder */}
            <div className={`h-48 ${book.cover} flex items-center justify-center relative overflow-hidden`}>
              <book.icon className={`w-16 h-16 ${book.iconColor} opacity-50 group-hover:scale-110 transition-transform duration-300`} />
              <button className="absolute top-3 right-3 p-2 bg-white/50 hover:bg-white rounded-full text-gray-600 hover:text-red-500 transition-colors backdrop-blur-sm">
                <Heart className="w-4 h-4" />
              </button>
              {book.stock > 0 && book.stock <= 10 && (
                <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                  Only {book.stock} left
                </span>
              )}
              {book.stock === 0 && (
                <span className="absolute top-3 left-3 px-2 py-1 bg-gray-800 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                  Out of stock
                </span>
              )}
            </div>

            {/* Details & Actions */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 mb-1">{book.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{book.author}</p>
              
              {/* Availability Indicator */}
              <div className="flex items-center gap-2 mb-3">
                {book.stock > 10 ? (
                  <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2.5 py-1 rounded-full text-xs font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>In Stock ({book.stock})</span>
                  </div>
                ) : book.stock > 0 ? (
                  <div className="flex items-center gap-1.5 text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full text-xs font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Low Stock ({book.stock})</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2.5 py-1 rounded-full text-xs font-medium">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-auto mb-4">
                <span className="text-xl font-bold text-orange-900 flex items-center">
                  <IndianRupee className="w-4 h-4 mr-0.5" />{book.price}
                </span>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => addToCart(book)}
                  disabled={book.stock === 0}
                  className="flex-1 flex items-center justify-center bg-orange-50 text-orange-600 px-3 py-2.5 rounded-lg hover:bg-orange-100 transition font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4 mr-1.5" />
                  Cart
                </button>
                <button 
                  disabled={book.stock === 0}
                  className="flex-1 bg-orange-600 text-white px-3 py-2.5 rounded-lg hover:bg-orange-700 transition font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Sidebar Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
          
          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2 text-orange-600"/> 
                आपका कार्ट
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {cartCount === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                  <ShoppingCart className="w-16 h-16 opacity-50" />
                  <p className="text-lg font-medium">आपका कार्ट खाली है</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-gray-500 font-medium">{cartCount} आइटम कार्ट में हैं</p>
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div>
                        <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-1">मात्रा: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-orange-600">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50">
              <Link 
                href={"/cart" as any}
                className="w-full flex items-center justify-center bg-orange-600 text-white px-4 py-3.5 rounded-xl hover:bg-orange-700 transition font-bold shadow-md"
              >
                कार्ट और चेकआउट पेज पर जाएं
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LibraryPage() {
  return (
    <CartProvider>
      <LibraryContent />
    </CartProvider>
  );
}