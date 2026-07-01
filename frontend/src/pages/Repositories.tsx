import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import RepositoryCard from "../components/RepositoryCard";
import { getRepositories } from "../services/githubService";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  language?: string | null;
}

export default function Repositories() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRepositories() {
      try {
        const data = await getRepositories();

        console.log("Repositories received:", data);

        setRepositories(data);
      } catch (err) {
        console.error("Failed to load repositories:", err);
        setError("Failed to load repositories.");
      } finally {
        setLoading(false);
      }
    }

    loadRepositories();
  }, []);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold">Repositories</h1>

        <p className="mt-3 text-slate-400">
          Select a repository to review with AI.
        </p>

        {loading && (
          <p className="mt-8 text-slate-400">
            Loading repositories...
          </p>
        )}

        {error && (
          <p className="mt-8 text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {repositories.length === 0 ? (
              <p className="mt-8 text-yellow-400">
                No repositories found.
              </p>
            ) : (
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {repositories.map((repo) => (
                  <RepositoryCard
                    key={repo.id}
                    name={repo.name}
                    description={
                      repo.description ?? "No description available"
                    }
                    language={repo.language ?? "Unknown"}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}