export default function DashboardPreview() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold">
            Beautiful Dashboard
          </h2>

          <p className="mt-5 text-lg text-slate-400">
            Monitor repositories, pull requests and AI review results from one place.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

          <div className="mb-8 flex gap-3">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">

            <div className="rounded-xl bg-slate-800 p-6">
              <h3 className="text-sm text-slate-400">
                Repositories
              </h3>

              <p className="mt-3 text-4xl font-bold text-blue-500">
                24
              </p>
            </div>

            <div className="rounded-xl bg-slate-800 p-6">
              <h3 className="text-sm text-slate-400">
                Pull Requests
              </h3>

              <p className="mt-3 text-4xl font-bold text-green-400">
                148
              </p>
            </div>

            <div className="rounded-xl bg-slate-800 p-6">
              <h3 className="text-sm text-slate-400">
                AI Reviews
              </h3>

              <p className="mt-3 text-4xl font-bold text-cyan-400">
                512
              </p>
            </div>

            <div className="rounded-xl bg-slate-800 p-6">
              <h3 className="text-sm text-slate-400">
                Bugs Found
              </h3>

              <p className="mt-3 text-4xl font-bold text-red-400">
                89
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}