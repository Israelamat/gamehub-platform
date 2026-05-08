import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, signal, inject, input, effect } from '@angular/core';
import { Review, CreateReview } from './../../interfaces/game.interfaces';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-game-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-reviews.html',
  styleUrl: './game-reviews.css',
})
export class GameReviews {

  private reviewService = inject(ReviewService);
  private readonly authService = inject(AuthService);

  appId = input.required<number>();
  currentUser = this.authService.currentUser;
  hoveredStar = signal(0);

  reviews = signal<Review[]>([]);
  rating = signal(5);
  comment = signal('');

  constructor() {
    effect(() => {
      const id = this.appId();
      if (id) {
        this.loadReviews(id);
      }
    });
  }

  loadReviews(appId: number): void {
    this.reviewService.getReviewsByGameId(appId).subscribe((reviews) => {
      this.reviews.set(reviews);
    });
  }

  submitReview(): void {
    const user = this.currentUser();
    const appId = this.appId();
    const rating = this.rating();
    const comment = this.comment().trim();

    if (!user) return;
    if (!comment) return;
    if (rating < 1 || rating > 5) return;

    const newReview: CreateReview = {
      game_id: appId,
      rating,
      comment,
      user_id: user.id,
    };

    this.reviewService.createReview(newReview).subscribe(() => {
      this.loadReviews(appId);
      this.comment.set('');
      this.rating.set(5);
    });
  }
}