import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Video } from "@/types/video";
import { useVideoFilters } from "@/hooks/useVideoFilters";
import { useVideos } from "@/hooks/useVideos";
import { VideoGrid } from "./VideoGrid";

vi.mock("@/hooks/useVideos");
vi.mock("@/hooks/useVideoFilters");

const mockedUseVideos = vi.mocked(useVideos);
const mockedUseVideoFilters = vi.mocked(useVideoFilters);

const videos: Video[] = [
  {
    id: 1,
    artist: "John Mayer",
    title: "Something Like Olivia",
    release_year: 2013,
    genre_id: 1,
    image_url: "https://example.com/1.jpg",
  },
  {
    id: 2,
    artist: "Beyoncé",
    title: "Single Ladies (Put a Ring on It)",
    release_year: 2008,
    genre_id: 2,
    image_url: "https://example.com/2.jpg",
  },
];

function mockFilters(overrides: Partial<ReturnType<typeof useVideoFilters>> = {}) {
  mockedUseVideoFilters.mockReturnValue({
    search: "",
    genre: [],
    year: "",
    setFilter: vi.fn(),
    ...overrides,
  });
}

describe("VideoGrid", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockFilters();
  });

  it("shows a loading skeleton while videos are being fetched", () => {
    mockedUseVideos.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
      isRefetching: false,
    } as unknown as ReturnType<typeof useVideos>);

    render(<VideoGrid />);

    expect(screen.getByTestId("video-grid-skeleton")).toBeInTheDocument();
  });

  it("shows an error message with a retry button when the fetch fails", async () => {
    const refetch = vi.fn();
    mockedUseVideos.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Failed to fetch"),
      refetch,
      isRefetching: false,
    } as unknown as ReturnType<typeof useVideos>);

    render(<VideoGrid />);

    expect(
      screen.getByText(/couldn.t load the videos/i),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it("shows the empty state when no videos match the current filters", () => {
    mockedUseVideos.mockReturnValue({
      data: { videos, genres: [] },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
      isRefetching: false,
    } as unknown as ReturnType<typeof useVideos>);
    mockFilters({ search: "no such artist" });

    render(<VideoGrid />);

    expect(screen.getByText(/no videos were found/i)).toBeInTheDocument();
  });

  it("renders a card for every video that matches the current filters", () => {
    mockedUseVideos.mockReturnValue({
      data: { videos, genres: [] },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
      isRefetching: false,
    } as unknown as ReturnType<typeof useVideos>);
    mockFilters({ year: "2013" });

    render(<VideoGrid />);

    expect(screen.getByText("Something Like Olivia")).toBeInTheDocument();
    expect(
      screen.queryByText("Single Ladies (Put a Ring on It)"),
    ).not.toBeInTheDocument();
  });
});
