import { Component } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent {
public heroes: Array<Hero> = []
}
