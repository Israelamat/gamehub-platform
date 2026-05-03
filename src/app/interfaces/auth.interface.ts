export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
  roles: string[];
}

export interface AuthResponse {
  token: string;
  user: User;
}