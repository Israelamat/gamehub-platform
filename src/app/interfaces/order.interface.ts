import { Course } from "./course.interface";
import { SteamGame } from "./game.interfaces";

export interface OrderRequest {
  user_id?: number;
  game_ids?: number[];
  course_ids?: number[];
  reference?: string;
}

export interface OrderResponse {
  message: string;
  reference: string;
  total: number;
}

export interface OrderData {
  id: number;
  reference: string;
  total: number;
  status: string;
  createdAt: string;
  games?: SteamGame[];
  courses?: Course[];
}

export interface OrderItems {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  type: 'game' | 'course';
}