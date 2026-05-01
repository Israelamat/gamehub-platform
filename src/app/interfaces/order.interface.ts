import { Course } from "./course.interface";
import { SteamGame } from "./game.interfaces";

export interface CreateOrder {
  game_ids?: number[];
  course_ids?: number[];
  user_id?: number;
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