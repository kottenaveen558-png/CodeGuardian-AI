const stats = [
  {
    value: "10K+",
    label: "Pull Requests Reviewed",
  },
  {
    value: "98%",
    label: "Issues Detected",
  },
  {
    value: "<30s",
    label: "Average Review Time",
  },
  {
    value: "24/7",
    label: "AI Availability",
  },
];

export default function Stats() {
  return (
    <section className="bg-slate-900 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-4">

        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-8 text-center transition hover:border-blue-500"
          >
            <h2 className="text-4xl font-bold text-blue-500">
              {stat.value}
            </h2>

            <p className="mt-3 text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}