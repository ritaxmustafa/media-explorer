export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  artist: string;
  title: string;
  release_year: number;
  genre_id: number;
  image_url: string;
}

export interface VideosResponse {
  genres: Genre[];
  videos: Video[];
}