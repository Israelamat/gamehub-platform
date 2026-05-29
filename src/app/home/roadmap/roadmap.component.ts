import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-roadmap',
    standalone: true,
    imports: [ScrollRevealDirective, RouterModule],
    templateUrl: './roadmap.component.html',
    styleUrl: './roadmap.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadmapComponent {

}
