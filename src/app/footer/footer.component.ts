import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../directives/scroll-reveal';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ScrollRevealDirective, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  email: string = "gamehub.info@gmail.com";
}
