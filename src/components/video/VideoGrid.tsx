import type { UseQueryResult } from "@tanstack/react-query";
import type { VideosResponse } from "@/types/video";
import { VideoCard } from "./VideoCard";
import VideoGridSkeleton from "./VideoGridSkeleton";

interface VideoGridProps {
  videosQuery: UseQueryResult<VideosResponse, Error>;
}

export function VideoGrid({ videosQuery }: VideoGridProps) {
  const { data, isLoading, error } = videosQuery;

  if (isLoading) return <VideoGridSkeleton />;
  if (error) return <p>Something went wrong.</p>;
  if (!data) return <p>No videos found.</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
