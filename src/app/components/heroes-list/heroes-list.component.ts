import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements OnInit {
  public heroes: Hero[] = new Array<Hero>();
  public currentHero: Hero = new Hero('', '');
  public currentIndex = -1;
  public isLoading = true;

  constructor(
    private heroesService: HeroesService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.retrieveHeroes();
  }

  private retrieveHeroes(): void {
    this.heroesService.getAll().subscribe({
      next: data => {
        this.heroes = data;
      },
      error: (e: HttpErrorResponse) => {
        console.error(e);
        this.isLoading = false;
      },
    });
  }

  public setActiveHero(hero: Hero, index: number): void {
    if (this.currentHero._id === '') {
      this.currentHero = hero;
      this.currentIndex = index;
    } else {
      this.currentHero = new Hero('', '');
      this.currentIndex = -1;
    }
  }

  public deleteHero(heroId: string): void {
    this.heroesService.delete(heroId).subscribe({
      next: (result: Hero) => {
        this.heroes = this.heroes.filter(h => h._id !== result._id);
      },
      error: error => console.error(error),
    });
  }
}
