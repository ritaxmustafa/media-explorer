import { VideoCard } from "./VideoCard";
import VideoGridSkeleton from "./VideoGridSkeleton";
import { Button } from "@/components/ui/button";
import { useVideos } from "@/hooks/useVideos";
import { useVideoFilters } from "@/hooks/useVideoFilters";
import { filterVideos } from "@/services/filterVideos";

export function VideoGrid() {
  const { search, genre, year } = useVideoFilters();
  const { data, isLoading, error, refetch, isRefetching } = useVideos();

  if (isLoading) return <VideoGridSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-muted-foreground">
          We couldn&apos;t load the videos. Please check your connection and
          try again.
        </p>
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isRefetching}
        >
          {isRefetching ? "Retrying..." : "Retry"}
        </Button>
      </div>
    );
  }

  const videos = filterVideos(data?.videos ?? [], search, genre, year);

  if (videos.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No videos were found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
