import { ReactNode } from "react";
import DashboardSidebar from "../components/DashboardSidebar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto bg-slate-950 p-10">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}