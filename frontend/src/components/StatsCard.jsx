function StatsCard({ title, value, color, icon: Icon }) {
  return (
    <div
      className={`bg-white p-6 rounded-2xl shadow-md border-l-4 ${color} hover:shadow-xl transition duration-300`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">
            {title}
          </h2>

          <p className="text-4xl mt-3 font-extrabold text-gray-900">
            {value}
          </p>
        </div>

        {Icon && (
          <div className="bg-gray-100 p-3 rounded-xl">
            <Icon size={28} className="text-gray-700" />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsCard;