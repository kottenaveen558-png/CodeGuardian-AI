import { motion } from 'framer-motion'

import Card from '../components/Card'

const items = [
  { label: 'Active Reviews', value: '12', hint: 'Ready for action' },
  { label: 'Avg. Review Time', value: '3 min', hint: 'Faster than yesterday' },
  { label: 'Confidence', value: '94%', hint: 'High quality output' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/50"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Welcome to the review workspace</h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          This area will host your PR insights and workflow controls once the review experience is connected.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <Card className="border-slate-800 bg-slate-900/70">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-sm text-emerald-400">{item.hint}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
