import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { OrderResponse, CreateOrder } from '../interfaces/order.interface';
import { Observable } from 'rxjs';
import { OrderData } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  #orders = signal<OrderData[]>([]);

  public orders = computed(() => this.#orders());

  loadOrderByUserId(userId: number): void {
    this.http.get<OrderData[]>(`${this.baseUrl}/order/user/${userId}`).subscribe({
      next: (data) => this.#orders.set(data),
      error: (err) => console.error('Error loading orders:', err),
    })
  }

  resetOrders(): void {
    this.#orders.set([]);
  }

  createOrder(data: CreateOrder): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(this.baseUrl, data);
  }

  getOrderById(id: number): Observable<OrderData> {
    return this.http.get<OrderData>(`${this.baseUrl}/${id}`);
  }

  getOrder(userId: number): Observable<OrderData[]> {
    return this.http.get<OrderData[]>(`${this.baseUrl}/user/${userId}`);
  }
}
