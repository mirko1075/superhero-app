import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss'],
})
export class AddHeroComponent implements OnInit {
  public addHeroForm: FormGroup = new FormGroup({});

  public id: string | null = null;
  public hero: Hero | null = null;

  public isSubmitted = false;
  public error: Error | undefined;
  public heroes: Hero[] = [];
  public isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private heroesService: HeroesService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadingService.loading$.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.retrieveHeroes();
    this.createform();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.retrieveHero(this.id);
      } else {
        this.isLoading = false;
      }
    });
  }

  private createform(): void {
    this.addHeroForm = new FormGroup({
      name: new FormControl(this.hero?.name, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        this.validateName(),
      ]),
      description: new FormControl(this.hero?.description),
      imageUrl: new FormControl(this.hero?.imageUrl),
      powerstats: new FormGroup({
        intelligence: new FormControl(),
        strength: new FormControl(),
        speed: new FormControl(),
        durability: new FormControl(),
        power: new FormControl(),
        combat: new FormControl(),
      }),
    });
  }

  private patchForm(): void {
    if (this.hero) this.addHeroForm.patchValue(this.hero);
  }

  public validateName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const isNameUsed = !this.heroes.find(
        hero => hero.name === control.value && hero._id !== this.id
      );

      return !isNameUsed ? { nameValidErr: true } : null;
    };
  }

  public retrieveHeroes(): void {
    this.heroesService.getAll().subscribe({
      next: data => {
        this.heroes = data;
      },
      error: e => {
        console.error(e);
      },
    });
  }

  public retrieveHero(heroId: string): void {
    this.heroesService.get(heroId).subscribe({
      next: data => {
        this.hero = data;
        this.patchForm();
      },
      error: e => console.error(e),
    });
  }

  public async saveHero(): Promise<void> {
    if (this.hero?._id) {
      this.heroesService
        .update(this.hero?._id as string, this.addHeroForm.getRawValue())
        .subscribe({
          next: res => {
            this.isSubmitted = true;
            this.router.navigate(['/']);
          },
          error: e => {
            this.isSubmitted = false;
            this.error = e;
            console.error(e);
          },
        });
    } else {
      this.heroesService.create(this.addHeroForm.getRawValue()).subscribe({
        next: res => {
          this.isSubmitted = true;
        },
        error: e => {
          this.isSubmitted = false;
          this.error = e;
          console.error(e);
        },
      });
    }
  }
}
