export interface CreatedBy {
  id: number;
  email: string;
}

export interface Course {
  id: number;
  title: string;
  content: string;
  price: number;
  createdBy: CreatedBy;
  duration: number;
  createdAt: string;
  imageBase64: string;
}

export interface CreateCourseRequest {
  title?: string;
  content?: string | null;
  price?: number;
  duration?: number;
  imageBase64?: string;
  user_id?: number;
}