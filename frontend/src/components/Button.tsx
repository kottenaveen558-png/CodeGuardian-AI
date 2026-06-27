import { Link } from 'react-router-dom'

interface ButtonProps {
  children: React.ReactNode
  to?: string
  variant?: 'primary' | 'secondary'
  icon?: React.ReactNode
}

export default function Button({ children, to, variant = 'primary', icon }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-200'
  const styles =
    variant === 'primary'
      ? 'bg-indigo-500 text-white hover:bg-indigo-400 shadow-lg shadow-indigo-500/20'
      : 'border border-slate-700 bg-slate-900/70 text-slate-100 hover:border-cyan-400 hover:text-cyan-300'

  if (to) {
    return (
      <Link to={to} className={`${base} ${styles}`}>
        {icon}
        <span>{children}</span>
      </Link>
    )
  }

  return (
    <button type="button" className={`${base} ${styles}`}>
      {icon}
      <span>{children}</span>
    </button>
  )
}
