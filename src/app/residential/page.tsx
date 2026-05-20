import React from 'react';
import { Home, Plus, Bed, Calendar, Users } from 'lucide-react';

export default function ResidentialPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-orange-900">रेसिडेंशियल प्रबंधन</h1>
          <p className="text-gray-600 mt-2">कमरा बुकिंग और अतिथि प्रबंधन</p>
        </div>
        <button className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition shadow-sm">
          <Plus className="w-5 h-5 mr-2" />
          नई बुकिंग
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon={<Bed className="w-8 h-8"/>} title="कुल कमरे" value="24" color="bg-blue-100 text-blue-600" />
        <StatCard icon={<Calendar className="w-8 h-8"/>} title="आज की बुकिंग" value="8" color="bg-green-100 text-green-600" />
        <StatCard icon={<Users className="w-8 h-8"/>} title="अतिथि" value="15" color="bg-purple-100 text-purple-600" />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-orange-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">कमरा उपलब्धता</h2>
        <p className="text-gray-600">रेसिडेंशियल सिस्टम जल्द आ रहा है...</p>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }: { icon: React.ReactNode, title: string, value: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-4 rounded-full ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
