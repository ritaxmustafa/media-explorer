import { useVideoFilters } from "@/hooks/useVideoFilters";
import { useVideos } from "@/hooks/useVideos";
import { filterVideos } from "@/services/filterVideos";
import { GenreSelect } from "./GenreSelect";
import { SearchInput } from "./SearchInput";
import { YearSelect } from "./YearSelect";

export function Filters() {
  const { search, genre, year, setFilter } = useVideoFilters();
  const { data } = useVideos();

  const videos = data?.videos ?? [];
  const genres = data?.genres ?? [];

  const searchMatchedVideos = filterVideos(videos, search, [], "");

  const availableYears = [
    ...new Set(searchMatchedVideos.map((video) => video.release_year)),
  ].sort((a, b) => b - a);

  const availableGenres = genres.filter((g) =>
    searchMatchedVideos.some((video) => video.genre_id === g.id),
  );

  return (
    <div className="flex flex-col items-start gap-3 md:flex-row">
      <SearchInput
        value={search}
        onChange={(value) => setFilter("search", value)}
      />

      <YearSelect
        value={year}
        years={availableYears}
        onChange={(value) => setFilter("year", value)}
      />

      <GenreSelect
        value={genre}
        genres={availableGenres}
        onChange={(value) => setFilter("genre", value)}
      />
    </div>
  );
}
