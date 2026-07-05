import {
  FiHome,
  FiFolder,
  FiClock,
  FiSettings,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const menu = [
  { icon: FiHome, label: "Dashboard", path: "/dashboard" },
  { icon: FiFolder, label: "Repositories", path: "/repositories" },
  { icon: FiClock, label: "History", path: "/history" },
  { icon: FiSettings, label: "Settings", path: "/settings" },
];

export default function DashboardSidebar() {
  const location = useLocation();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-900">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold">
            CG
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">
              CodeGuardian
            </h1>

            <p className="text-sm text-slate-400">
              AI Code Review
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">

        {menu.map((item) => {
          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`mb-2 flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}

      </nav>

      {/* User */}
      <div className="border-t border-slate-800 p-6">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
            N
          </div>

          <div>
            <h2 className="font-medium">
              Naveen
            </h2>

            <p className="text-sm text-slate-400">
              Developer
            </p>
          </div>

        </div>

      </div>

    </aside>
  );
}