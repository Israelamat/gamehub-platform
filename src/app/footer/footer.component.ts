import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../directives/scroll-reveal';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  email: string = "gamehub.info@gmail.com";
}
