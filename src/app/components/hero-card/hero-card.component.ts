import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent {
  @Input() item: Hero | null= null
}
