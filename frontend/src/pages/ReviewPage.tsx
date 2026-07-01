import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { getPullRequests } from "../services/githubService";

interface PullRequest {
  number: number;
  title: string;
  state: string;
}

export default function ReviewPage() {
  const { repo } = useParams();
  const navigate = useNavigate();

  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPullRequests() {
      if (!repo) return;

      try {
        const data = await getPullRequests(repo);
        console.log("Pull Requests:", data);
        setPullRequests(data);
      } catch (error) {
        console.error("Failed to load pull requests:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPullRequests();
  }, [repo]);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl">

        <h1 className="text-4xl font-bold">
          Pull Requests
        </h1>

        <p className="mt-3 text-slate-400">
          Repository:
        </p>

        <h2 className="mb-8 text-2xl font-semibold text-blue-400">
          {repo}
        </h2>

        {loading ? (
          <p className="text-slate-400">
            Loading Pull Requests...
          </p>
        ) : (
          <div className="space-y-5">

            {pullRequests.length === 0 ? (
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="text-xl font-semibold">
                  No Pull Requests Found
                </h2>

                <p className="mt-2 text-slate-400">
                  This repository doesn't have any open pull requests.
                </p>
              </div>
            ) : (
              pullRequests.map((pr) => (
                <div
                  key={pr.number}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
                >
                  <h2 className="text-2xl font-bold">
                    #{pr.number} {pr.title}
                  </h2>

                  <p className="mt-3 text-slate-400">
                    Status:
                    <span className="ml-2 rounded bg-green-600 px-3 py-1 text-sm text-white">
                      {pr.state}
                    </span>
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/ai-review/${repo}/${pr.number}`)
                    }
                    className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700"
                  >
                    Start AI Review
                  </button>
                </div>
              ))
            )}

          </div>
        )}
      </div>
    </DashboardLayout>
  );
}