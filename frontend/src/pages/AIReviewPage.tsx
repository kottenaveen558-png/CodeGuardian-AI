import { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { reviewPullRequest } from "../services/reviewService";

export default function AIReviewPage() {
  const { repo, pr } = useParams();

  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");

  async function handleReview() {
    if (!repo || !pr) {
      setError("Repository or Pull Request not found.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setReview("");

      const data = await reviewPullRequest(
        "kottenaveen558-png",
        repo,
        Number(pr)
      );

      if (data.length > 0) {
        setReview(data[0].review);
      } else {
        setError("No review returned.");
      }
    } catch (err: any) {
      console.error(err);

      if (err.response?.data?.detail?.message) {
        setError(err.response.data.detail.message);
      } else {
        setError("Failed to generate AI review.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-bold">
          AI Review
        </h1>

        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">

          <p className="text-slate-400">
            Repository
          </p>

          <h2 className="text-2xl font-semibold text-blue-400">
            {repo}
          </h2>

          <p className="mt-6 text-slate-400">
            Pull Request
          </p>

          <h2 className="text-2xl font-semibold text-green-400">
            #{pr}
          </h2>

          <button
            onClick={handleReview}
            disabled={loading}
            className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Pull Request"}
          </button>

        </div>

        {error && (
          <div className="mt-8 rounded-xl border border-red-600 bg-red-950 p-6">
            <h3 className="text-xl font-bold text-red-400">
              Error
            </h3>

            <p className="mt-3">
              {error}
            </p>
          </div>
        )}

        {review && (
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-6 text-3xl font-bold">
              AI Review Result
            </h2>

            <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
              {review}
            </pre>

          </div>
        )}
      </div>
    </DashboardLayout>
  );
}