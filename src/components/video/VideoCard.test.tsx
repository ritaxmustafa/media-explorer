import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Video } from "@/types/video";
import { VideoCard } from "./VideoCard";

const video: Video = {
  id: 1,
  artist: "Waka Flocka Flame",
  title: "Grove St. Party",
  release_year: 2011,
  genre_id: 3,
  image_url: "https://example.com/grove-st-party.jpg",
};

describe("VideoCard", () => {
  it("renders the title, artist, and release year", () => {
    render(<VideoCard video={video} />);

    expect(
      screen.getByRole("heading", { name: video.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(video.artist)).toBeInTheDocument();
    expect(screen.getByText(String(video.release_year))).toBeInTheDocument();
  });

  it("renders the thumbnail with the video title as alt text", () => {
    render(<VideoCard video={video} />);

    const image = screen.getByRole("img", { name: video.title });
    expect(image).toHaveAttribute("src", video.image_url);
  });

  it("does not display anything besides title, artist, and release year", () => {
    const { container } = render(<VideoCard video={video} />);

    // Genre is only used for filtering elsewhere in the app; the card
    // itself has no genre name to show, so the card's full text should be
    // exactly these three fields and nothing else (e.g. no leaked genre_id).
    expect(container.textContent).toBe(
      `${video.title}${video.artist}${video.release_year}`,
    );
  });
});
