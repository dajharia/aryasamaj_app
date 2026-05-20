'use client';

import React from 'react';
import { Package, ShoppingCart, ShoppingCart as Purchase, Heart, Building2, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { id: 'inventory', name: 'Inventory', icon: Package, href: '/admin/inventory' },
  { id: 'sales', name: 'Sales', icon: ShoppingCart, href: '/admin/sales' },
  { id: 'purchase', name: 'Purchase', icon: Purchase, href: '/admin/purchase' },
  { id: 'donation', name: 'Donation', icon: Heart, href: '/admin/donation' },
  { id: 'rental', name: 'Rental', icon: Building2, href: '/admin/rental' },
  { id: 'staff', name: 'Staff', icon: Users, href: '/admin/staff' },
];

export default function AdminPage() {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-orange-900">प्रबंधक (Admin)</h1>
        <p className="text-gray-600 mt-2">प्रशासनिक प्रबंधन और रिपोर्टिंग</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={`flex items-center px-4 py-2 rounded-lg transition ${
              pathname === tab.href
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="w-5 h-5 mr-2" />
            {tab.name}
          </Link>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-orange-100">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Dashboard</h2>
          <p className="text-gray-600">कृपया ऊपर दिए गए tabs में से किसी एक का चयन करें।</p>
        </div>
      </div>
    </div>
  );
}
