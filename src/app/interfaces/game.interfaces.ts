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

export interface CommunityGame {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  rating: number;
  price: number;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;

  user: ReviewUser;
  game: ReviewGame;
}

export interface ReviewUser {
  id: number;
  email: string;
}

export interface ReviewGame {
  id: number;
  appId: number;
}
export interface CreateReview {
  rating: number;
  comment: string;
  game_id: number;
  user_id?: number;
}