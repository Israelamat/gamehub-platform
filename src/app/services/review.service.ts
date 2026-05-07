import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review, CreateReview } from "./../interfaces/game.interfaces";

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>('/review');
  }

  getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>(`/review/game/${id}`);
  }

  getReviewsByGameId(gameId: number) {
    return this.http.get<Review[]>(`/review/game/${gameId}`);
  }

  createReview(review: CreateReview): Observable<Review> {
    return this.http.post<Review>('/review', review);
  }
}
