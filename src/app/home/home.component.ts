import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { CountComponent } from './count/count.component';
import { PartnersComponent } from './partners/partners.component';
import { GamesComponent } from './games/games.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { MiddleBannerComponent } from './middle-banner/middle-banner.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule,
        HeroComponent, AboutComponent, CountComponent, PartnersComponent, GamesComponent,
        RoadmapComponent, MiddleBannerComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    title = 'gamehub';
}
