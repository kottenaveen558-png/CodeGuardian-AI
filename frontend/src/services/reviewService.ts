import api from "./api";

export async function reviewPullRequest(
  owner: string,
  repo: string,
  pull_number: number
) {
  const response = await api.post("/review/pull-request", {
    owner,
    repo,
    pull_number,
  });

  return response.data;
}