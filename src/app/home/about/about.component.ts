import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [ScrollRevealDirective],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})
export class AboutComponent {
}
