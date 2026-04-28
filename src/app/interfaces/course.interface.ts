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
  image: string;
}