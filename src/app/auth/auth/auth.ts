import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
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
    console.log('LOGIN', this.loginForm);
  }

  register() {
    if (this.registerForm.password !== this.registerForm.repeatPassword) {
      alert('Passwords do not match');
      return;
    }
  }
}
