import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  imports: [],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  cartItems = [
    {
      title: 'Mastering Symfony 7',
      description: 'Advanced backend development',
      price: 49.99,
      image: ''
    },
    {
      title: 'CyberPunk Quest',
      description: 'Digital Edition - PC',
      price: 29.99,
      image: ''
    }
  ];

  get subtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  get taxes(): number {
    return this.subtotal * 0.21;
  }

  get total(): number {
    return this.subtotal + this.taxes;
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }
}
