export function HourlyChart() {
  return (
    <div className="pt-4 border-t">
      <p className="text-xs font-bold text-gray-400 mb-3 uppercase">
        Hourly Chat Volume
      </p>

      <div className="flex items-end gap-2 h-20">
        {[40, 60, 35, 80, 95, 50].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-primary/80 rounded-t"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      <div className="flex justify-between mt-2 text-[10px] text-gray-400">
        <span>10am</span>
        <span>Now</span>
      </div>
    </div>
  );
}
