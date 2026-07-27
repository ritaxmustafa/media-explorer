import type { Video } from "@/types/video";

export function filterVideos(
  videos: Video[],
  search: string,
  genres: string[],
  year: string,
) {
  return videos.filter((video) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      !searchValue ||
      String(video.title).toLowerCase().includes(searchValue) ||
      String(video.artist).toLowerCase().includes(searchValue);

    const matchesGenre =
      !genres.length || genres.includes(String(video.genre_id));

    const matchesYear = !year || video.release_year === Number(year);

    return matchesSearch && matchesGenre && matchesYear;
  });
}
