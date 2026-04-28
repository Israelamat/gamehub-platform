import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ContactRequest, ContactResponse } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  sendMessage(data: ContactRequest) {
    return this.http.post<ContactResponse>(
      `${this.baseUrl}/contact`,
      data
    );
  }
}
