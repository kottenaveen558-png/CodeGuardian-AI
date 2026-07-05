import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import RepositoryCard from "../components/RepositoryCard";
import { getRepositories } from "../services/githubService";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  language?: string |null;
}

export default function Repositories() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadRepositories() {
    try {
      setLoading(true);
      setError("");

      const data = await getRepositories();

      console.log("Repositories:", data);

      setRepositories(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load repositories. Please check your GitHub token or backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              Repositories
            </h1>

            <p className="mt-3 text-slate-400">
              Select a repository to review with AI.
            </p>
          </div>

          <button
            onClick={loadRepositories}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700 transition"
          >
            Refresh
          </button>

        </div>

        {loading && (
          <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">

            <div className="text-5xl mb-4">
              ⏳
            </div>

            <h2 className="text-2xl font-semibold">
              Loading Repositories...
            </h2>

            <p className="mt-3 text-slate-400">
              Fetching repositories from GitHub.
            </p>

          </div>
        )}

        {!loading && error && (
          <div className="mt-12 rounded-xl border border-red-600 bg-red-950 p-8 text-center">

            <div className="text-5xl mb-4">
              ❌
            </div>

            <h2 className="text-2xl font-semibold">
              Failed to Load
            </h2>

            <p className="mt-3 text-red-300">
              {error}
            </p>

            <button
              onClick={loadRepositories}
              className="mt-6 rounded-lg bg-red-600 px-5 py-3 font-semibold hover:bg-red-700"
            >
              Try Again
            </button>

          </div>
        )}

        {!loading && !error && repositories.length === 0 && (
          <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">

            <div className="text-5xl mb-4">
              📂
            </div>

            <h2 className="text-2xl font-semibold">
              No Repositories Found
            </h2>

            <p className="mt-3 text-slate-400">
              No GitHub repositories are available for this account.
            </p>

          </div>
        )}

        {!loading && !error && repositories.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {repositories.map((repo) => (
              <RepositoryCard
                key={repo.id}
                name={repo.name}
                description={
                  repo.description ?? "No description available"
                }
                language={
                  repo.language ?? "Unknown"
                }
              />
            ))}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}