import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getReview } from "../services/reviewDetailsService";

interface Review {
  id: number;
  repository: string;
  pull_request: number;
  filename: string;
  review: string;
  created_at: string;
}

export default function ReviewDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReview();
  }, []);

  async function loadReview() {
    try {
      const data = await getReview(Number(id));
      setReview(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load review.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center text-white text-xl">
          Loading Review...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-red-500 text-xl">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  if (!review) return null;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate("/history")}
          className="mb-6 rounded-lg bg-slate-700 px-5 py-2 hover:bg-slate-600"
        >
          ← Back
        </button>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-8">

          <h1 className="text-4xl font-bold text-blue-400">
            Review Details
          </h1>

          <div className="mt-8 space-y-3">

            <p>
              <strong>Repository:</strong> {review.repository}
            </p>

            <p>
              <strong>Pull Request:</strong> #{review.pull_request}
            </p>

            <p>
              <strong>File:</strong> {review.filename}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {new Date(review.created_at).toLocaleString()}
            </p>

          </div>

          <div className="mt-8 rounded-lg bg-slate-950 p-6">

            <h2 className="text-2xl font-bold mb-4">
              AI Review
            </h2>

            <pre className="whitespace-pre-wrap text-slate-300 leading-7">
              {review.review}
            </pre>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}