import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { OrderResponse, OrderRequest } from '../interfaces/order.interface';
import { Observable } from 'rxjs';
import { OrderData } from '../interfaces/order.interface';
import { Order } from '../order/order/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly STORAGE_KEY = environment.STORAGE_KEY;

  #orders = signal<OrderData[]>([]);
  #orderRequest = signal<OrderRequest>({
    game_ids: [],
    course_ids: []
  });
  public orders = computed(() => this.#orders());
  public createOrderData = computed(() => this.#orderRequest());

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.#orderRequest.set(parsed);
      } catch (e) {
        this.#orderRequest.set({ game_ids: [], course_ids: [] });
      }
    }

    effect(() => {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(this.#orderRequest())
      );
    });
  }

  addToCart(id: number, type: 'game' | 'course'): void {
    this.#orderRequest.update(cart => {
      const game_ids = type === 'game' ? [...(cart.game_ids || []), id] : cart.game_ids;
      const course_ids = type === 'course' ? [...(cart.course_ids || []), id] : cart.course_ids;
      return { ...cart, game_ids, course_ids };
    });
  }

  resetOrder(): void {
    this.#orderRequest.set({ game_ids: [], course_ids: [] });
  }

  checkout(userId: number): Observable<OrderResponse> {
    const finalOrder = { ...this.#orderRequest(), user_id: userId };
    return this.http.post<OrderResponse>('/order', finalOrder);
  }

  loadOrderByUserId(userId: number): void {
    this.http.get<OrderData[]>(`/order/user/${userId}`).subscribe({
      next: (data) => this.#orders.set(data),
      error: (err) => console.error('Error loading orders:', err),
    })
  }

  getOrderById(id: number): Observable<OrderData> {
    return this.http.get<OrderData>(`/order/${id}`);
  }

  getUserOrders(userId: number): Observable<any[]> {
    return this.http.get<OrderData[]>(`/order/user/${userId}`);
  }
}
