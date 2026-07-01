const pullRequests = [
  {
    repo: "CodeGuardian-AI",
    pr: "#21",
    status: "Reviewed",
  },
  {
    repo: "Student Manager",
    pr: "#18",
    status: "Pending",
  },
  {
    repo: "Portfolio",
    pr: "#09",
    status: "Reviewed",
  },
];

export default function RecentPullRequests() {
  return (
    <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Recent Pull Requests
      </h2>

      <table className="w-full">

        <thead className="border-b border-slate-700">

          <tr>

            <th className="pb-4 text-left">
              Repository
            </th>

            <th className="pb-4 text-left">
              Pull Request
            </th>

            <th className="pb-4 text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {pullRequests.map((pr) => (

            <tr
              key={pr.pr}
              className="border-b border-slate-800"
            >

              <td className="py-4">
                {pr.repo}
              </td>

              <td>
                {pr.pr}
              </td>

              <td>

                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    pr.status === "Reviewed"
                      ? "bg-green-600"
                      : "bg-yellow-600"
                  }`}
                >
                  {pr.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}