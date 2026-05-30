import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MailService } from '../../services/mail.service';
import { ContactRequest } from '../../interfaces/contact.interface';
import Swal from 'sweetalert2';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, ScrollRevealDirective, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {

  private mailService = inject(MailService);

  private fb = inject(FormBuilder);

  loading = false;

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.loading) return;
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing fields',
        text: 'Please fill all fields correctly',
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
      allowEscapeKey: false,
    });

    const formValue = this.contactForm.value;

    const payload = {
      name: formValue.name ?? '',
      email: formValue.email ?? '',
      subject: formValue.subject ?? '',
      message: formValue.message ?? '',
    };

    this.mailService.sendMessage(payload).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Message sent!',
            text: response.message,
            confirmButtonColor: 'var(--accent)',
          });
          this.contactForm.reset();
        }
      },

      error: () => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error sending the message. Please try again later.',
          confirmButtonColor: 'var(--accent)',
        });
      },
    });
  }
}