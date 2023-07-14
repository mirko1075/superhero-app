import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss']
})
export class AddHeroComponent implements OnInit {
  public addHeroForm: FormGroup = new FormGroup({});

  private id: string | null = null;
  public hero: Hero | null = null;

  public submitted = false;
  public error: Error | undefined;

  constructor(private route: ActivatedRoute, private heroesService: HeroesService) { }

  ngOnInit() {
    this.createform()
    this.route.params.subscribe(params => {
     this.id = params['id'];
      if (this.id){
        this.retrieveHero(this.id);
      }
    });
  }


  private createform():void{
    this.addHeroForm = new FormGroup({
      name: new FormControl(this.hero?.name, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        this.validateName(),
      ]),
      description: new FormControl(this.hero?.description),
      imageUrl: new FormControl(this.hero?.imageUrl),
    });

  }

  private patchForm():void{
   if (this.hero) this.addHeroForm.patchValue(this.hero)
  }

  private validateName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }
      if (this.hero){
           this.heroesService.get(this.hero?._id).subscribe({
              next: (data) => {
               const heroeFound = data;
                const isNameDuplicated = heroeFound?.name === this.hero?.name
                return !isNameDuplicated ? { nameDuplicatedErr: true } : null;
              },
              error: (e) => console.error(e),
            });
      }
      return null;
    };
  }

  private retrieveHero(heroId:string): void {
    this.heroesService.get(heroId).subscribe({
      next: (data) => {
        this.hero = data;
        this.patchForm()
      },
      error: (e) => console.error(e),
    });
  }

  public async saveHero(): Promise<void> {
    this.heroesService.create(this.addHeroForm.value).subscribe({
      next: (res) => {
        this.submitted = true;
      },
      error: (e) => {
        this.submitted = false;
        this.error = e;
        console.error(e);
      },
    });
  }

  public newHero(): void {
    this.submitted = false;
    this.createform()
  }
}
