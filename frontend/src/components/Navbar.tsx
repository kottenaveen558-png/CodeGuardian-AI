export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
            CG
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">
              CodeGuardian AI
            </h1>
            <p className="text-xs text-slate-400">
              AI Code Review Platform
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-slate-300 hover:text-white transition">
            Home
          </a>

          <a href="#" className="text-slate-300 hover:text-white transition">
            Features
          </a>

          <a href="#" className="text-slate-300 hover:text-white transition">
            Workflow
          </a>

          <a href="#" className="text-slate-300 hover:text-white transition">
            GitHub
          </a>
        </nav>

        {/* Button */}
        <button className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700">
          Start Reviewing
        </button>

      </div>
    </header>
  );
}