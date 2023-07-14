import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss']
})
export class AddHeroComponent implements OnInit {
  private id: string | null = null;
  public hero: Hero | null = null
  constructor(private route: ActivatedRoute, private heroesService: HeroesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
     this.id = params['id'];
      if (this.id){
        this.retrieveHero(this.id)
      }
    });
  }

  private retrieveHero(heroId:string): void {
    this.heroesService.get(heroId).subscribe({
      next: (data) => {
        this.hero = data;
      },
      error: (e) => console.error(e),
    });
  }

}
