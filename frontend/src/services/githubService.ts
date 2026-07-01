import api from "./api";

export async function getRepositories() {
  const response = await api.get("/github/repositories");
  return response.data;
}

export async function getPullRequests(repo: string) {
  const response = await api.get(
    `/github/kottenaveen558-png/${repo}/pull-requests`
  );

  return response.data;
}