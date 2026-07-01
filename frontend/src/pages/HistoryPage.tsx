import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { getHistory } from "../services/historyService";
import { deleteReview } from "../services/deleteHistory";

interface ReviewHistory {
  id: number;
  repository: string;
  pull_request: number;
  filename: string;
  review: string;
  created_at: string;
}

export default function HistoryPage() {
  const navigate = useNavigate();

  const [history, setHistory] = useState<ReviewHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      setLoading(true);

      const data = await getHistory();

      setHistory(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load review history.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await deleteReview(id);

      setHistory((previous) =>
        previous.filter((item) => item.id !== id)
      );

      alert("Review deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete review.");
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-8 text-4xl font-bold">
          Review History
        </h1>

        {loading && (
          <p className="text-slate-400">
            Loading history...
          </p>
        )}

        {error && (
          <div className="rounded-lg border border-red-600 bg-red-950 p-4">
            {error}
          </div>
        )}

        {!loading && history.length === 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
            <h2 className="text-2xl font-semibold">
              No Reviews Found
            </h2>

            <p className="mt-3 text-slate-400">
              Generate your first AI review to see it here.
            </p>
          </div>
        )}

        <div className="space-y-6">

          {history.map((item) => (

            <div
              key={item.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-blue-400">
                    {item.repository}
                  </h2>

                  <p className="mt-2 text-slate-400">
                    Pull Request #{item.pull_request}
                  </p>

                  <p className="text-slate-400">
                    File: {item.filename}
                  </p>

                  <p className="text-sm text-slate-500">
                    {new Date(item.created_at).toLocaleString()}
                  </p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => navigate(`/history/${item.id}`)}
                    className="rounded-lg bg-blue-600 px-5 py-2 font-semibold transition hover:bg-blue-700"
                  >
                    View Review
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-lg bg-red-600 px-5 py-2 font-semibold transition hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}