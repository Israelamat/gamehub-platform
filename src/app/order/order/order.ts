import { ChangeDetectionStrategy, Component, computed, inject, signal, effect, linkedSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner';
import { OrderData } from '../../interfaces/order.interface';
import { Course } from "./../../interfaces/course.interface";
import { SteamGame } from "./../../interfaces/game.interfaces";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, LoadSpinnerComponent],
  templateUrl: './order.html',
  styleUrl: './order.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Order {
  private orderService = inject(OrderService);

  isLoading = signal(true);

  rawOrders = linkedSignal(() => this.orderService.orders());

  constructor() {
    this.orderService.resetOrders();
    this.orderService.loadOrderByUserId(1);

    effect(() => {
      const currentOrders = this.rawOrders();
      if (currentOrders) {
        requestAnimationFrame(() => {
          this.isLoading.set(false);
        });
      }
    });
  }

  orderItems = computed(() => {
    if (this.isLoading()) return [];

    const allOrders = this.rawOrders();
    if (!allOrders || allOrders.length === 0) return [];

    const latestOrder = allOrders[0];

    const games = (latestOrder.games || []).map((g: SteamGame) => ({
      title: g.title,
      description: g.description,
      price: g.price,
      image: g.headerImage,
      type: 'game'
    }));

    const courses = (latestOrder.courses || []).map((c: Course) => ({
      title: c.title,
      description: c.content,
      price: c.price,
      image: c.image || 'assets/images/default-course.jpg',
      type: 'course'
    }));

    return [...games, ...courses];
  });

  subtotal = computed(() =>
    this.orderItems().reduce((acc, item) => acc + (item.price || 0), 0)
  );

  taxes = computed(() => this.subtotal() * 0.21);

  total = computed(() => this.subtotal() + this.taxes());

  removeItem(index: number) {
    console.log('Remove item index:', index);
  }
}