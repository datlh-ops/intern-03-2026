export default function StatCard({ title, value, icon: Icon, color = "blue" }) {
  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    emerald: "from-emerald-500 to-emerald-600",
    amber: "from-amber-500 to-amber-600",
    purple: "from-purple-500 to-purple-600",
    rose: "from-rose-500 to-rose-600",
  };

  const shadowMap = {
    blue: "shadow-blue-200",
    emerald: "shadow-emerald-200",
    amber: "shadow-amber-200",
    purple: "shadow-purple-200",
    rose: "shadow-rose-200",
  };

  const bgIconMap = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">{title}</p>
          <h3 className="text-3xl font-black text-gray-900 mt-2 tabular-nums">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h3>
        </div>
        <div className={`p-4 rounded-2xl ${bgIconMap[color]} group-hover:scale-110 transition-transform duration-300`}>
          {Icon && <Icon fontSize="large" />}
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colorMap[color]} w-0 group-hover:w-full transition-all duration-500`}></div>
    </div>
  );
}