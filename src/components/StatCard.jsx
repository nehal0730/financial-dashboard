export default function StatCard({ title, value, icon, trend, color = 'accent' }) {
  const isPositive = trend > 0;
  
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="card-title text-gray-400 text-sm font-medium uppercase tracking-wide xl:text-base">
            {title}
          </p>
          <p className={`text-3xl font-bold mt-2 ${color === 'success' ? 'text-green-500' : color === 'danger' ? 'text-red-500' : 'text-blue-500'}`}>
            {value}
          </p>
          {trend !== undefined && (
            <p className={`text-sm mt-2 xl:text-base ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <div className="text-3xl opacity-50">
          {icon}
        </div>
      </div>
    </div>
  );
}

