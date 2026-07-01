import { FiGithub, FiGitBranch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface RepositoryCardProps {
  name: string;
  description: string;
  language: string;
}

export default function RepositoryCard({
  name,
  description,
  language,
}: RepositoryCardProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-blue-500 hover:shadow-blue-500/20">

      <div className="flex items-center gap-3">
        <FiGithub className="text-2xl text-blue-500" />

        <h2 className="text-xl font-bold">
          {name}
        </h2>
      </div>

      <p className="mt-4 text-slate-400">
        {description}
      </p>

      <div className="mt-6 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <FiGitBranch />
          <span>{language}</span>
        </div>

        <button
          onClick={() => navigate(`/review/${name}`)}
          className="rounded-lg bg-blue-600 px-4 py-2 transition hover:bg-blue-700"
        >
          Review
        </button>

      </div>

    </div>
  );
}