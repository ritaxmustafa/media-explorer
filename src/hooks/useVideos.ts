import { useQuery } from "@tanstack/react-query";
import { fetchVideos } from "../services/api";

export function useVideos() {
  return useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideos,
  });
}
