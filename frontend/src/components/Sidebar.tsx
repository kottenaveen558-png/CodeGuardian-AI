import { NavLink } from 'react-router-dom'
import { FaHome, FaRobot } from 'react-icons/fa'

const items = [
  { label: 'Overview', to: '/dashboard', icon: <FaHome /> },
  { label: 'Review', to: '/review', icon: <FaRobot /> },
]

export default function Sidebar() {
  return (
    <aside className="w-full border-b border-slate-800 bg-slate-900/70 p-4 lg:w-72 lg:border-b-0 lg:border-r">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Workspace</p>
        <div className="mt-4 space-y-2">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${isActive ? 'bg-indigo-500/20 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`
              }
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  )
}
