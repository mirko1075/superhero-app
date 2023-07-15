import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHeroComponent } from './add-hero.component';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { of, throwError } from 'rxjs';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('AddHeroComponent', () => {
  let component: AddHeroComponent;
  let fixture: ComponentFixture<AddHeroComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;
  const mockHeroes: Hero[] = [
    { _id: '1111', name: 'Mirko', description: 'Description 1' },
    { _id: '2222', name: 'Pablo', description: 'Description 2' },
    { _id: '3333', name: 'Juan', description: 'Description 3' },
    { _id: '4444', name: 'Maria', description: 'Description 4' },
  ];
  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', [
      'getAll',
      'get',
      'create',
      'update',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [AddHeroComponent],
      providers: [
        FormBuilder,
        { provide: HeroesService, useValue: mockHeroesService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHeroComponent);
    component = fixture.componentInstance;
  });

  it('should validate name', () => {
    component.heroes = [
      { _id: '6666', name: 'Hero1' },
      { _id: '7777', name: 'Hero2' },
    ];
    component.id = '1';

    const validatorFn = component.validateName();
    const control = { value: 'Hero3' };

    const result = validatorFn(control as FormControl);

    expect(result).toBeNull();
  });

  it('should retrieve heroes successfully', () => {
    mockHeroesService.getAll.and.returnValue(of(mockHeroes));

    component.retrieveHeroes();

    expect(mockHeroesService.getAll).toHaveBeenCalled();
    expect(component.heroes).toEqual(mockHeroes);
    expect(component.heroes.length).toEqual(4);
    expect(typeof component.heroes[0]._id).toBe('string');
    expect(component.isLoading).toBe(true);
  });

  it('should retrieve a hero', () => {
    const heroId = '1111';
    const mockHero: Hero = mockHeroes[0];
    mockHeroesService.get.and.returnValue(of(mockHero));

    component.retrieveHero(heroId);

    expect(mockHeroesService.get).toHaveBeenCalledWith(heroId);
    expect(component.hero).toEqual(mockHero);
  });

  it('should save a hero', async () => {
    const mockHero: Hero = mockHeroes[0];

    component.addHeroForm.patchValue({
      name: 'Mirko',
      description: ' Description',
    });
    component.hero = mockHero;
    component.id = mockHero._id;

    mockHeroesService.update.and.returnValue(of(mockHero));

    await component.saveHero();

    expect(mockHeroesService.update).toHaveBeenCalledWith(
      mockHero._id,
      component.addHeroForm.getRawValue()
    );
    expect(component.submitted).toBe(true);
  });

  it('should handle error while saving a hero', async () => {
    const mockError: HttpErrorResponse = new HttpErrorResponse({});

    component.addHeroForm.patchValue({
      name: null,
      description: null,
    });
    component.hero = null;
    component.id = null;

    mockHeroesService.create.and.returnValue(throwError(mockError));

    await component.saveHero();

    expect(mockHeroesService.create).toHaveBeenCalledWith(
      component.addHeroForm.getRawValue()
    );
    expect(component.submitted).toBe(false);
    expect(component.error).toBe(mockError);
  });
});
