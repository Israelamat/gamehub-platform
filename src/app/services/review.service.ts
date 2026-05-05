import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from "./../interfaces/game.interfaces";

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>('/api/reviews');
  }

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>('/api/reviews', review);
  }
}
