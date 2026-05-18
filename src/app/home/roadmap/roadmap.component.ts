import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
    selector: 'app-roadmap',
    standalone: true,
    imports: [ScrollRevealDirective],
    templateUrl: './roadmap.component.html',
    styleUrl: './roadmap.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadmapComponent {

}
