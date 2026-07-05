import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: "🤖",
    title: "AI Code Review",
    description:
      "Analyze pull requests automatically using AI to improve code quality.",
  },
  {
    icon: "🔒",
    title: "Security Analysis",
    description:
      "Identify common vulnerabilities and risky coding patterns before merging.",
  },
  {
    icon: "⚡",
    title: "Performance Insights",
    description:
      "Receive suggestions to improve performance and optimize your code.",
  },
  {
    icon: "🐙",
    title: "GitHub Integration",
    description:
      "Connect directly with GitHub repositories and review pull requests effortlessly.",
  },
  {
    icon: "📝",
    title: "Markdown Reports",
    description:
      "Generate clean, structured reports that are easy to read and share.",
  },
  {
    icon: "📊",
    title: "Developer Dashboard",
    description:
      "Track reviews, repositories, and AI insights from a central dashboard.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold">
            Powerful Features
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Everything you need to review pull requests faster,
            improve code quality, and collaborate efficiently.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>

      </div>
    </section>
  );
}