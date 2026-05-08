import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-community-publish-game',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './community-publish-game.html',
  styleUrls: ['./community-publish-game.css']
})
export class CommunityPublishGame {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  publishForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    author: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
    imageUrl: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(20)]]
  });

  onSubmit() {
    if (this.publishForm.valid) {
      console.log('Juego a publicar:', this.publishForm.value);

      Swal.fire({
        title: '¡Publicado!',
        text: 'Tu juego ya está disponible en la Community Library',
        icon: 'success',
        confirmButtonText: 'Genial'
      }).then(() => {
        this.router.navigate(['/games/community']);
      });
    } else {
      this.publishForm.markAllAsTouched();
    }
  }
}