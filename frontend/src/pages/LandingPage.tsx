import { motion } from 'framer-motion'
import { FaGithub, FaRocket } from 'react-icons/fa'

import Button from '../components/Button'
import Card from '../components/Card'

const featureCards = [
  {
    title: 'Instant PR Intelligence',
    description: 'Surface risks, quality concerns, and architectural hotspots before merge.',
  },
  {
    title: 'Context-Aware Feedback',
    description: 'Receive thoughtful suggestions tailored to the changed files and diff scope.',
  },
  {
    title: 'Merge Confidence',
    description: 'Create a reliable review workflow with a calm, premium AI experience.',
  },
]

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.28),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.22),_transparent_35%)]" />
      <section className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-20 sm:px-8 lg:flex-row lg:items-center lg:px-10 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-200">
            <FaRocket />
            AI-powered review assistant
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            AI-powered Pull Request Review Assistant
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Analyze GitHub Pull Requests with AI and receive professional code review suggestions instantly.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/dashboard" variant="primary">
              Start Reviewing
            </Button>
            <Button to="/review" variant="secondary" icon={<FaGithub />}>
              GitHub
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/60 backdrop-blur"
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Preview</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">CodeGuardian AI</h2>
            <div className="mt-6 space-y-4">
              {featureCards.map((card) => (
                <Card key={card.title} className="border-slate-800 bg-slate-900/80">
                  <div className="font-medium text-white">{card.title}</div>
                  <p className="mt-2 text-sm text-slate-400">{card.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
