import type { VideosResponse } from "../types/video";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data";

async function request<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch data (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export async function fetchVideos(): Promise<VideosResponse> {
  return request<VideosResponse>("/dataset.json");
}
