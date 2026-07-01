import api from "./api";

export async function deleteReview(id: number) {
  const response = await api.delete(`/history/${id}`);
  return response.data;
}