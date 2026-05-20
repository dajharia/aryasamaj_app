export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-900 mb-4">
          डैशबोर्ड
        </h1>
        <p className="text-lg text-orange-700">
          जबलपुर आर्यसमाज मंदिर - एकीकृत प्रबंधन प्रणाली
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ModuleCard
          title="पुस्तकालय"
          description="किताबों का प्रबंधन, सदस्यता, जारी/वापसी"
          icon="📚"
          color="bg-blue-500"
        />
        <ModuleCard
          title="विवाह मंडप"
          description="बुकिंग स्लॉट, भुगतान, उपलब्धता"
          icon="💒"
          color="bg-pink-500"
        />
        <ModuleCard
          title="कैटरिंग सेवा"
          description="मेनू प्रबंधन, ऑर्डर, भुगतान"
          icon="🍽️"
          color="bg-green-500"
        />
        <ModuleCard
          title="रेसिडेंशियल"
          description="कमरा बुकिंग, चेक-इन/चेक-आउट"
          icon="🏠"
          color="bg-purple-500"
        />
        <ModuleCard
          title="सदस्य प्रबंधन"
          description="सदस्य रजिस्ट्रेशन, दान, शुल्क"
          icon="👥"
          color="bg-yellow-500"
        />
        <ModuleCard
          title="वित्तीय प्रबंधन"
          description="आय/व्यय, रिपोर्ट, लेखा"
          icon="💰"
          color="bg-red-500"
        />
      </div>
    </div>
  );
}

function ModuleCard({ title, description, icon, color }: {
  title: string;
  description: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-orange-200">
      <div className={`${color} w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}