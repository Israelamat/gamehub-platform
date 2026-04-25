import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
    selector: 'app-middle-banner',
    standalone: true,
    imports: [ScrollRevealDirective],
    templateUrl: './middle-banner.component.html',
    styleUrl: './middle-banner.component.css'
})
export class MiddleBannerComponent {

}
