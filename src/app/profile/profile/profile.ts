import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './../../services/order.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Base64ImagePipe } from "../../shared/pipes/base64-image-pipe";

@Component({
  selector: 'app-profile',
  imports: [CommonModule, Base64ImagePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private readonly auth = inject(AuthService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);

  user = this.auth.currentUser;

  orders = signal<any[]>([]);
  loading = signal(false);

  constructor() {
    this.loadOrders();
  }

  loadOrders() {
    const user = this.user();

    if (!user) return;

    this.loading.set(true);

    this.orderService.getUserOrders(user.id).subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  games = computed(() =>
    this.orders().flatMap(order => order.games ?? [])
  );

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    this.user.set(null);
    this.orderService.clearCart();
    this.router.navigate(['/login']);
  }
}
