import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  private authService = inject(AuthService);
  private router = inject(Router);
  private loading = false;

  mode: 'login' | 'register' = 'login';

  loginForm = {
    email: '',
    password: ''
  };

  registerForm = {
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  };

  login() {
    if (this.loading) return;

    this.loading = true;

    Swal.fire({
      title: 'Logging in...',
      html: '<div class="swal-spinner"></div><p>Please wait...</p>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });

    this.authService.login(this.loginForm.email, this.loginForm.password).subscribe({
      next: () => {
        this.loading = false;

        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'Login successful',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/']);
        });
      },

      error: (error: any) => {
        this.loading = false;

        Swal.fire({
          icon: 'error',
          title: 'Login error',
          text: error?.error?.message || 'Invalid credentials'
        });
      }
    });
  }

  register() {
    if (this.loading) return;

    if (this.registerForm.password !== this.registerForm.repeatPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Passwords do not match'
      });
      return;
    }

    this.loading = true;

    Swal.fire({
      title: 'Creating account...',
      html: '<div class="swal-spinner"></div><p>Please wait...</p>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });

    this.authService.register({
      email: this.registerForm.email,
      password: this.registerForm.password,
    }).subscribe({
      next: () => {
        this.loading = false;

        Swal.fire({
          icon: 'success',
          title: 'User registered!',
          text: 'Now you can login',
          confirmButtonColor: 'var(--accent)'
        });
        this.mode = 'login';
      },

      error: () => {
        this.loading = false;

        Swal.fire({
          icon: 'error',
          title: 'Register error',
          text: 'Error creating user'
        });
      }
    });
  }
}