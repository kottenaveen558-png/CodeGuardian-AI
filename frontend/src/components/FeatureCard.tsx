interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10">
      <div className="mb-5 text-5xl">{icon}</div>

      <h3 className="mb-3 text-2xl font-bold">
        {title}
      </h3>

      <p className="leading-7 text-slate-400">
        {description}
      </p>
    </div>
  );
}