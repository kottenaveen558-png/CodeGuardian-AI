import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleClick = () => {
    switch (title) {
      case "AI Code Review":
        navigate("/repositories");
        break;

      case "Security Analysis":
        navigate("/repositories");
        break;

      case "Performance Insights":
        navigate("/repositories");
        break;

      case "GitHub Integration":
        navigate("/repositories");
        break;

      case "Markdown Reports":
        navigate("/history");
        break;

      case "Developer Dashboard":
        navigate("/dashboard");
        break;

      default:
        navigate("/");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
    >
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