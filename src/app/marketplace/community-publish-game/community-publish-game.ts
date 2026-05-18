import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CommunityGameService } from '../../services/community-game.service';
import { CommunityGamePayload } from '../../interfaces/game.interfaces';
import { EncodeBase64Directive } from '../../directives/encode-base64';

@Component({
  selector: 'app-community-publish',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, EncodeBase64Directive],
  templateUrl: './community-publish-game.html',
  styleUrl: './community-publish-game.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  onFileChange(base64: string): void {
    this.imagePreview.set(base64);
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