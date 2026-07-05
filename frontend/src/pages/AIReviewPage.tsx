import { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { reviewPullRequest } from "../services/reviewService";

export default function AIReviewPage() {
  const { repo, pr } = useParams();

  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleReview() {
    if (!repo || !pr) {
      setError("Repository or Pull Request not found.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setReview("");
      setSuccess(false);

      const data = await reviewPullRequest(
        "kottenaveen558-png",
        repo,
        Number(pr)
      );

      if (data.length > 0) {
        setReview(data[0].review);
        setSuccess(true);
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
            {loading ? "Generating AI Review..." : "Analyze Pull Request"}
          </button>

        </div>

        {loading && (
          <div className="mt-8 rounded-xl border border-blue-700 bg-slate-900 p-8 text-center">

            <div className="text-6xl">
              🤖
            </div>

            <h2 className="mt-4 text-3xl font-bold text-blue-400">
              AI is Reviewing Your Code
            </h2>

            <p className="mt-4 text-slate-400">
              Please wait while CodeGuardian analyzes your pull request...
            </p>

            <div className="mt-8 h-3 w-full overflow-hidden rounded-full bg-slate-700">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-500"></div>
            </div>

          </div>
        )}

        {success && (
          <div className="mt-8 rounded-xl border border-green-600 bg-green-950 p-5">

            <h3 className="text-xl font-bold text-green-400">
              ✅ Review Generated Successfully
            </h3>

          </div>
        )}

        {error && (
          <div className="mt-8 rounded-xl border border-red-600 bg-red-950 p-6">

            <h3 className="text-xl font-bold text-red-400">
              ❌ Error
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