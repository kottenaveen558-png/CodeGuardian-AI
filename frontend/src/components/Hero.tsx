import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        {/* Badge */}
        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
          🚀 AI Powered Pull Request Reviews
        </span>

        {/* Heading */}
        <h1 className="mt-8 max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
          Review GitHub Pull Requests
          <br />
          <span className="text-blue-500">
            Faster with AI
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
          Automatically detect bugs, security vulnerabilities,
          performance bottlenecks and code quality improvements
          before every merge.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-5">

          <button
            onClick={() => navigate("/repositories")}
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
          >
            Start Reviewing
          </button>

          <button
            onClick={() =>
              window.open(
                "https://github.com/kottenaveen558-png/CodeGuardian-AI",
                "_blank"
              )
            }
            className="rounded-xl border border-slate-700 px-8 py-4 font-semibold transition hover:border-blue-500"
          >
            View GitHub
          </button>

        </div>

      </div>
    </section>
  );
}