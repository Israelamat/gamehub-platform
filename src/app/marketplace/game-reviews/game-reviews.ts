import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, signal, inject } from '@angular/core';
import { Review } from './../../interfaces/game.interfaces';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-game-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-reviews.html',
  styleUrl: './game-reviews.css',
})
export class GameReviews {

  private reviewService = inject(ReviewService);

  reviews = signal<Review[]>([]);

  rating = signal(5);
  comment = signal('');

  constructor() {
    this.loadReviews();
  }

  loadReviews() {
    this.reviewService.getReviews().subscribe((r: Review[]) => {
      this.reviews.set(r);
    });
  }

  submitReview(): void {
    const value = this.rating();

    if (!value || value < 1 || value > 5) return;

    const newReview = {
      id: 0,
      rating: value,
      comment: this.comment().trim(),
      game_id: 1,
      user_id: 1
    };

    this.reviewService.createReview(newReview).subscribe(() => {
      this.loadReviews();
    });

    this.comment.set('');
    this.rating.set(5);
  }
}