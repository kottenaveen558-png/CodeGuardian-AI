interface DashboardCardProps {
  title: string;
  value: string;
  color: string;
}

export default function DashboardCard({
  title,
  value,
  color,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-blue-500">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2 className={`mt-4 text-4xl font-bold ${color}`}>
        {value}
      </h2>

    </div>
  );
}