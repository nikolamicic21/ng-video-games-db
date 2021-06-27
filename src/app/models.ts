export interface Game {
  id: string;
  background_image: string;
  name: string;
  released: string;
  metacritic: number;
  metacritic_url: string;
  website: string;
  description: string;
  genres: Genre[];
  parent_platforms: ParentPlatform[];
  publishers: Publisher[];
  ratings: Rating[];
  screenshots: Screenshot[];
  trailers: Trailer[];
}

export interface ApiResponse<T> {
  results: T[];
}

interface Genre {
  name: string;
}

interface ParentPlatform {
  platform: {
    slug: string;
  };
}

interface Publisher {
  name: string;
}

interface Rating {
  id: number;
  count: number;
  title: string;
}

interface Screenshot {
  image: string;
}

interface Trailer {
  data: {
    max: string;
  };
}
