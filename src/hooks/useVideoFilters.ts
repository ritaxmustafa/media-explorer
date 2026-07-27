import type { FilterKey } from "@/types/video";
import { useSearchParams } from "react-router-dom";


export function useVideoFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const genre = searchParams.get("genre")?.split(",") ?? [];
  const year = searchParams.get("year") ?? "";

  const setFilter = (
    key: FilterKey,
    value: string | string[],
  ) => {
    setSearchParams((params) => {
      const nextParams = new URLSearchParams(params);

      const nextValue = Array.isArray(value)
        ? value.join(",")
        : value;

      if (nextValue) {
        nextParams.set(key, nextValue);
      } else {
        nextParams.delete(key);
      }

      return nextParams;
    });
  };

  return {
    search,
    genre,
    year,
    setFilter,
  };
}