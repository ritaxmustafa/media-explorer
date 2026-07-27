import { describe, expect, it } from "vitest";
import type { Video } from "@/types/video";
import { filterVideos } from "./filterVideos";

const videos: Video[] = [
  {
    id: 1,
    artist: "John Mayer",
    title: "Something Like Olivia",
    release_year: 2013,
    genre_id: 1, // Rock
    image_url: "https://example.com/1.jpg",
  },
  {
    id: 2,
    artist: "Beyoncé",
    title: "Single Ladies (Put a Ring on It)",
    release_year: 2008,
    genre_id: 2, // Pop
    image_url: "https://example.com/2.jpg",
  },
  {
    id: 3,
    artist: "Tom Petty and the Heartbreakers",
    title: "I Should Have Known It",
    release_year: 2010,
    genre_id: 1, // Rock
    image_url: "https://example.com/3.jpg",
  },
];

describe("filterVideos", () => {
  it("returns all videos when no filters are applied", () => {
    expect(filterVideos(videos, "", [], "")).toEqual(videos);
  });

  it("matches search text against the title, case-insensitively", () => {
    const result = filterVideos(videos, "single ladies", [], "");
    expect(result.map((v) => v.id)).toEqual([2]);
  });

  it("matches search text against the artist, case-insensitively", () => {
    const result = filterVideos(videos, "JOHN MAYER", [], "");
    expect(result.map((v) => v.id)).toEqual([1]);
  });

  it("filters by a single selected year", () => {
    const result = filterVideos(videos, "", [], "2010");
    expect(result.map((v) => v.id)).toEqual([3]);
  });

  it("filters by one or more selected genres", () => {
    const result = filterVideos(videos, "", ["1"], "");
    expect(result.map((v) => v.id)).toEqual([1, 3]);
  });

  it("combines search, year, and genre filters with AND logic", () => {
    const result = filterVideos(videos, "olivia", ["1"], "2013");
    expect(result.map((v) => v.id)).toEqual([1]);

    // Same search and genre, but the wrong year should exclude every match.
    expect(filterVideos(videos, "olivia", ["1"], "2010")).toEqual([]);
  });

  it("returns an empty array when nothing matches", () => {
    expect(filterVideos(videos, "nonexistent artist", [], "")).toEqual([]);
  });
});
