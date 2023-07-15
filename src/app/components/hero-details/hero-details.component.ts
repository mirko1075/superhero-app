import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
})
export class HeroDetailsComponent implements OnInit {
  private id = '';
  public hero: Hero | null = null;
  public isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.loading$.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.retrieveHero(this.id);
      }
    });
  }

  public retrieveHero(heroId: string): void {
    this.heroesService.get(heroId).subscribe({
      next: data => {
        this.hero = data;
      },
      error: e => console.error(e),
    });
  }

  public navigateBack(): void {
    this.router.navigate(['/']);
  }
}
