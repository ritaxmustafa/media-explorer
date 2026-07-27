import type { Video } from "@/types/video";
import { Card, CardContent } from "../ui/card";

export function VideoCard({ video }: { video: Video }) {
  return (
    <Card className="overflow-hidden py-0 gap-0 rounded-none">
      <div>
        <img
          src={video.image_url}
          alt={video.title}
          className="aspect-video w-full object-cover rounded-none"
        />
      </div>

      <CardContent className="bg-amber-50 py-4 text-center">
        <h3 className="font-medium text-base">{video.title}</h3>

        <p className="text-sm">{video.artist}</p>

        <p className="text-sm">{video.release_year}</p>
      </CardContent>
    </Card>
  );
}
