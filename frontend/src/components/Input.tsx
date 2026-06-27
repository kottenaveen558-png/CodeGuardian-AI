interface InputProps {
  label: string
  placeholder?: string
}

export default function Input({ label, placeholder }: InputProps) {
  return (
    <label className="block text-sm text-slate-300">
      <span className="mb-2 block">{label}</span>
      <input
        className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
        placeholder={placeholder}
      />
    </label>
  )
}
