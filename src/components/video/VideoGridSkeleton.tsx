import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_COUNT = 12;

export default function VideoGridSkeleton() {
  return (
    <div
      data-testid="video-grid-skeleton"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full"
    >
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function VideoCardSkeleton() {
  return (
    <Card className="overflow-hidden py-0 gap-0 rounded-none">
      <Skeleton className="aspect-video w-full object-cover rounded-none" />

      <CardContent className="py-4 text-center flex flex-col gap-2">
        <Skeleton className="h-5 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-1/4 mx-auto" />
      </CardContent>
    </Card>
  );
}
