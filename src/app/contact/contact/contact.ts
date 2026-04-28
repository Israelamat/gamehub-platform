import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MailService } from '../../services/mail.service';
import { ContactRequest } from '../../interfaces/contact.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly mailService = inject(MailService);
  loading = false;

  form: ContactRequest = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    if (this.loading) return;

    if (!this.form.name || !this.form.email || !this.form.subject || !this.form.message) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing fields',
        text: 'Please fill all fields'
      });
      return;
    }

    this.loading = true;

    Swal.fire({
      title: 'Sending the message...',
      html: '<div class="swal-spinner"></div><p>Please wait...</p>',
      showConfirmButton: false,
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });

    this.mailService.sendMessage(this.form).subscribe({
      next: (response) => {

        this.loading = false;

        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Message sent!',
            text: response.message,
            confirmButtonColor: 'var(--accent)'
          });

          this.form = {
            name: '',
            email: '',
            subject: '',
            message: ''
          };
        }
      },

      error: () => {

        this.loading = false;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error sending the message. Please try again later.',
          confirmButtonColor: 'var(--accent)'
        });
      }
    });
  }
}
