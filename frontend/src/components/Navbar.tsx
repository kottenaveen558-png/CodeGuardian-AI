import { motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Review', to: '/review' },
]

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-20 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link to="/" className="text-lg font-semibold tracking-tight text-white">
          CodeGuardian AI
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-300">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors ${isActive ? 'text-cyan-300' : 'hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
