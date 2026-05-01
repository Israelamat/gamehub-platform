import { ChangeDetectionStrategy, Component, computed, inject, signal, effect, linkedSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { GameService } from '../../services/game.service';
import { CourseService } from '../../services/course.service';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner';
import { OrderItems } from '../../interfaces/order.interface';
import { firstValueFrom } from 'rxjs';

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
  private gameService = inject(GameService);
  private courseService = inject(CourseService);

  isLoading = signal(true);
  orderItemsData = signal<OrderItems[]>([]);

  orderItems = computed(() => {
    if (this.isLoading()) return [];
    return this.orderItemsData();
  });

  cart = this.orderService.createOrderData;

  constructor() {
    effect(() => {
      const currentCart = this.orderService.createOrderData();

      const gameIds = currentCart.game_ids ?? [];
      const courseIds = currentCart.course_ids ?? [];

      if (!gameIds.length && !courseIds.length) {
        this.orderItemsData.set([]);
        return;
      }

      this.loadCart(gameIds, courseIds);
    });
  }

  private async loadCart(gameIds: number[], courseIds: number[]) {

    this.isLoading.set(true);

    try {

      const games = gameIds.length
        ? await firstValueFrom(this.gameService.getGamesByIds(gameIds))
        : [];

      const courses = courseIds.length
        ? await firstValueFrom(this.courseService.getCoursesByIds(courseIds))
        : [];

      const mappedGames: OrderItems[] = games.map((game: any) => ({
        id: Number(game.appId),
        title: game.title,
        description: game.description,
        price: game.price,
        image: game.headerImage,
        type: 'game'
      }));

      const mappedCourses: OrderItems[] = courses.map((course: any) => ({
        id: course.id,
        title: course.title,
        description: course.content,
        price: course.price,
        image: course.image || 'assets/images/default-course.jpg',
        type: 'course'
      }));

      this.orderItemsData.set([
        ...mappedGames,
        ...mappedCourses
      ]);

    } catch (error) {
      console.error('Error loading cart:', error);
      this.orderItemsData.set([]);
    } finally {
      this.isLoading.set(false);
    }
  }

  subtotal = computed(() =>
    this.orderItems().reduce((acc, item) => acc + (item.price || 0), 0)
  );

  taxes = computed(() => this.subtotal() * 0.21);

  total = computed(() => this.subtotal() + this.taxes());

  removeItem(id: number, type: 'game' | 'course') {
    console.log("Remove item")
  }
}