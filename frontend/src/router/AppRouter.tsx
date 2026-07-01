import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import Repositories from "../pages/Repositories";
import ReviewPage from "../pages/ReviewPage";
import AIReviewPage from "../pages/AIReviewPage";
import HistoryPage from "../pages/HistoryPage";
import SettingsPage from "../pages/SettingsPage";
import NotFound from "../pages/NotFound";
import ReviewDetailsPage from "../pages/ReviewDetailsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/repositories" element={<Repositories />} />
        <Route path="/review/:repo" element={<ReviewPage />} />
        <Route path="/ai-review/:repo/:pr" element={<AIReviewPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/history/:id" element={<ReviewDetailsPage />}/>
      </Routes>
    </BrowserRouter>
  );
}