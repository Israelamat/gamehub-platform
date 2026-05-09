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
    console.log('📁 File input changed');

    const input = event.target as HTMLInputElement;

    console.log('📁 Input element:', input);

    const file = input.files?.[0];

    console.log('📁 Selected file:', file);

    if (!file) {
      console.warn('⚠️ No file selected');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      console.log('✅ FileReader loaded');

      const base64 = reader.result as string;

      console.log('🖼️ Base64 preview:', base64?.slice(0, 100));
      console.log('📏 Base64 length:', base64?.length);

      this.imagePreview.set(base64);

      console.log('✅ imagePreview signal updated');
    };

    reader.onerror = (error) => {
      console.error('❌ FileReader error:', error);
    };

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    console.log('🚀 Submit triggered');

    console.log('📝 Form valid:', this.publishForm.valid);

    if (this.publishForm.invalid) {
      console.warn('❌ Form invalid');
      console.log('📝 Form errors:', this.publishForm.errors);
      console.log('📝 Form controls:', this.publishForm.controls);
      return;
    }

    const formValue = this.publishForm.value;

    console.log('📝 Raw form value:', formValue);

    console.log('🖼️ imagePreview value:', this.imagePreview());

    const payload: CommunityGamePayload = {
      title: formValue.title ?? '',
      author: formValue.author ?? '',
      price: formValue.price ?? 0,
      rating: 0,
      imageBase64: this.imagePreview() ?? '',
      description: formValue.description ?? '',
    };

    console.log('📦 Final payload:', payload);

    console.log('📦 Payload JSON:', JSON.stringify(payload));

    this.communityGameService.createGame(payload).subscribe({
      next: (response) => {
        console.log('✅ Game created successfully');
        console.log('📨 Backend response:', response);

        this.router.navigate(['/community']);
      },

      error: (err) => {
        console.error('❌ Error publishing game:', err);

        console.error('📡 Status:', err.status);
        console.error('📡 Status text:', err.statusText);
        console.error('📡 URL:', err.url);
        console.error('📡 Error body:', err.error);

        if (err.error instanceof ProgressEvent) {
          console.error('⚠️ Network or CORS error');
        }
      }
    });
  }
}