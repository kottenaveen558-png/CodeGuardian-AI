import api from "./api";

export async function getReview(id: number) {
  const response = await api.get(`/history/${id}`);
  return response.data;
}