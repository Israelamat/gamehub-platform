import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  form = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    console.log(this.form);
  }
}
