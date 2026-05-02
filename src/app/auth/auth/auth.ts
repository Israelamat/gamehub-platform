import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

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
    this.authService.login(this.loginForm.email, this.loginForm.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Credenciales incorrectas');
      }
    });
  }

  register() {
    if (this.registerForm.password !== this.registerForm.repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    this.authService.register({
      email: this.registerForm.email,
      password: this.registerForm.password,
    }).subscribe({
      next: () => {
        alert('Usuario creado. Ahora puedes iniciar sesión.');
        this.mode = 'login';
      },
      error: () => {
        alert('No se pudo registrar');
      }
    });
  }
}