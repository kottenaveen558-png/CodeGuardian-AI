import { Link } from 'react-router-dom'

import Button from '../components/Button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
      <p className="mt-4 max-w-xl text-slate-400">
        The route you requested does not exist yet. Return home to continue exploring the product experience.
      </p>
      <div className="mt-8">
        <Button to="/" variant="primary">
          Back home
        </Button>
      </div>
    </div>
  )
}
