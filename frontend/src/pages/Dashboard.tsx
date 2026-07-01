import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import RecentPullRequests from "../components/RecentPullRequests";
import { getDashboardStats } from "../services/dashboardService";

interface DashboardStats {
  repositories_reviewed: number;
  pull_requests_reviewed: number;
  files_reviewed: number;
  reviews_stored: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    repositories_reviewed: 0,
    pull_requests_reviewed: 0,
    files_reviewed: 0,
    reviews_stored: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load dashboard statistics.", error);
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="mt-3 text-lg text-slate-400">
            Welcome back! Here's an overview of your repositories and AI reviews.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <DashboardCard
            title="Repositories Reviewed"
            value={String(stats.repositories_reviewed)}
            color="text-blue-500"
          />

          <DashboardCard
            title="Pull Requests"
            value={String(stats.pull_requests_reviewed)}
            color="text-green-500"
          />

          <DashboardCard
            title="Files Reviewed"
            value={String(stats.files_reviewed)}
            color="text-cyan-400"
          />

          <DashboardCard
            title="Reviews Stored"
            value={String(stats.reviews_stored)}
            color="text-yellow-400"
          />

        </div>

        {/* Recent Pull Requests */}
        <RecentPullRequests />

      </div>
    </DashboardLayout>
  );
}