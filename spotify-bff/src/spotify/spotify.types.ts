export interface Artist {
  id: string;
  name: string;
  genres: string[];
  imageUrl: string | null;
  popularity: number | null;
  followers: number | null;
}
