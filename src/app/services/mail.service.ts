import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ContactRequest, ContactResponse } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  private readonly http = inject(HttpClient);

  sendMessage(data: ContactRequest) {
    return this.http.post<ContactResponse>(
      '/contact',
      data
    );
  }
}
