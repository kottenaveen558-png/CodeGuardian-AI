import { motion } from 'framer-motion'

import Card from '../components/Card'

export default function ReviewPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/50"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Review</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Pull request review workspace</h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          This page will soon host AI-generated review insights for selected GitHub pull requests.
        </p>
      </motion.div>

      <Card className="border-slate-800 bg-slate-900/70">
        <p className="text-sm font-medium text-white">Ready for the next milestone</p>
        <p className="mt-2 text-slate-400">
          The review experience will be connected here after the foundation is in place.
        </p>
      </Card>
    </div>
  )
}
