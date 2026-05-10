import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CommunityGameService } from '../../services/community-game.service';
import { CommunityGamePayload } from '../../interfaces/game.interfaces';

@Component({
  selector: 'app-community-publish',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './community-publish-game.html',
  styleUrl: './community-publish-game.css',
})
export class CommunityPublishGame {
  private communityGameService = inject(CommunityGameService);

  private fb = inject(FormBuilder);
  private router = inject(Router);

  imagePreview = signal<string>('');

  publishForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    price: [0, Validators.required],
    description: [''],
  });

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      this.imagePreview.set(base64);
    };

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.publishForm.invalid) return;

    const formValue = this.publishForm.value;

    const payload: CommunityGamePayload = {
      title: formValue.title ?? '',
      author: formValue.author ?? '',
      price: formValue.price ?? 0,
      rating: 0,
      imageBase64: this.imagePreview() ?? '',
      description: formValue.description ?? '',
    };

    this.communityGameService.createGame(payload).subscribe({
      next: () => {
        this.router.navigate(['/community']);
      },
      error: (err) => {
        console.error('Error publishing game:', err);
      }
    });
  }
}