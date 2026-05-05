export interface SteamGame {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  appId: number;
  headerImage: string;
  genres: string;
  tags: string;
  developer: string;
  screenshot: string;
}

export interface Review {
  id: number;
  rating: number;
  comment?: string;
  game_id: number;
  user_id?: number;
}