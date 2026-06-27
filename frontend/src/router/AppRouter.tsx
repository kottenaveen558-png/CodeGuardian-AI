import { Navigate, Route, Routes } from 'react-router-dom'

import DashboardLayout from '../layouts/DashboardLayout'
import MainLayout from '../layouts/MainLayout'
import DashboardPage from '../pages/DashboardPage'
import LandingPage from '../pages/LandingPage'
import NotFoundPage from '../pages/NotFoundPage'
import ReviewPage from '../pages/ReviewPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Route>

      <Route path="/dashboard/*" element={<Navigate to="/dashboard" replace />} />
      <Route path="/review/*" element={<Navigate to="/review" replace />} />
    </Routes>
  )
}
