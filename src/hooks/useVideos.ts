import { useQuery } from "@tanstack/react-query";
import { fetchVideos } from "@/services/api";

export function useVideos() {
  return useQuery({
    // Filters are handled on the UI side, so we keep one cache entry.
    // This avoids a new API request whenever filters change.
    queryKey: ["videos"],
    queryFn: fetchVideos,
  });
}
