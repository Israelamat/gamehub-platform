import { ChangeDetectionStrategy, Component, computed, inject, signal, effect, linkedSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { GameService } from '../../services/game.service';
import { CourseService } from '../../services/course.service';
import { LoadSpinnerComponent } from '../../shared/load-spinner/load-spinner';
import { OrderItems } from '../../interfaces/order.interface';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { MailService } from '../../services/mail.service';
import { environment } from '../../../environments/environment.development';
import { ContactRequest } from '../../interfaces/contact.interface';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, LoadSpinnerComponent, ScrollRevealDirective],
  templateUrl: './order.html',
  styleUrl: './order.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Order {
  private readonly orderService = inject(OrderService);
  private readonly gameService = inject(GameService);
  private readonly courseService = inject(CourseService);
  private readonly mailService = inject(MailService);

  MAIL = environment.Mail;
  isLoading = signal(true);
  orderItemsData = signal<OrderItems[]>([]);

  orderItems = computed(() => {
    if (this.isLoading()) return [];
    return this.orderItemsData();
  });

  cart = this.orderService.createOrderData;

  defaultMessage: ContactRequest = {
    name: 'Ariamat',
    email: this.MAIL,
    subject: 'Purchase Confirmation',
    message: `Hello,

Thank you for your purchase. Your order has been successfully completed.

We are processing your items and you will receive them shortly.

If you have any questions, feel free to contact our support team.

Best regards,
GameHub Team`
  };

  constructor() {
    effect(() => {
      const currentCart = this.orderService.createOrderData();

      const gameIds = currentCart.game_ids ?? [];
      const courseIds = currentCart.course_ids ?? [];

      if (!gameIds.length && !courseIds.length) {
        this.orderItemsData.set([]);
        this.isLoading.set(false);
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

  checkout() {
    const userId = 1;

    this.isLoading.set(true);

    this.orderService.checkout(userId).subscribe({
      next: (response) => {

        Swal.fire({
          icon: 'success',
          title: 'Order completed!',
          text: response.message,
          confirmButtonColor: 'var(--accent)'
        });

        this.orderService.resetOrder();

        this.mailService.sendMessage(this.defaultMessage).subscribe({
          next: (res) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                title: 'Email sent',
                text: res.message
              });
            } else {
              Swal.fire({
                icon: 'warning',
                title: 'Order created but email failed'
              });
            }
          },
          error: () => {
            Swal.fire({
              icon: 'warning',
              title: 'Order created but email failed'
            });
          },
          complete: () => {
            this.isLoading.set(false);
          }
        });
      },

      error: (err) => {
        console.error(err);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error processing order'
        });

      }
    });
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