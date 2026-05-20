'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Utensils,
  Home,
  Users,
  IndianRupee,
  Menu,
  X,
  LogOut,
  Settings
} from 'lucide-react';

const navigation = [
  { name: 'डैशबोर्ड', href: '/', icon: LayoutDashboard },
  { name: 'पुस्तकालय', href: '/library', icon: BookOpen },
  { name: 'विवाह मंडप', href: '/venue', icon: Calendar },
  { name: 'कैटरिंग', href: '/catering', icon: Utensils },
  { name: 'रेसिडेंशियल', href: '/residential', icon: Home },
  { name: 'सदस्य', href: '/members', icon: Users },
  { name: 'वित्त', href: '/finance', icon: IndianRupee },
  { name: 'प्रबंधक', href: '/admin', icon: Settings },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-orange-600 via-orange-700 to-orange-800 text-white w-64 transform transition-all duration-300 ease-in-out z-40 shadow-2xl flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-6 border-b border-orange-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">आर्यसमाज ERP</h1>
              <p className="text-orange-200 text-xs">जबलपुर मंदिर</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 flex-1 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1 pb-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                      isActive
                        ? 'bg-white text-orange-700 shadow-lg'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-600 rounded-r-full" />
                    )}
                    <item.icon className={`w-5 h-5 mr-3 transition-transform duration-200 ${isActive ? 'text-orange-600' : 'group-hover:scale-110'}`} />
                    <span className="font-medium">{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto p-4 bg-gradient-to-t from-orange-900/50 to-transparent">
          <button className="flex items-center w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 group border border-white/10 hover:border-white/20">
            <LogOut className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            <span className="font-medium">लॉगआउट</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.4);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </>
  );
}