import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesListComponent } from './heroes-list.component';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { Hero } from 'src/app/models/hero.model';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { SearchComponent } from '../search/search.component';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;
  const mockHeroes: Hero[] = [
    { _id: '1111', name: 'Mirko', description: 'Description 1' },
    { _id: '2222', name: 'Pablo', description: 'Description 2' },
    { _id: '3333', name: 'Juan', description: 'Description 3' },
    { _id: '4444', name: 'Maria', description: 'Description 4' },
  ];
  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', [
      'getAll',
      'delete',
    ]);
    mockLoadingService = jasmine.createSpyObj('LoadingService', [
      'startLoading',
      'stopLoading',
    ]);

    await TestBed.configureTestingModule({
      declarations: [HeroesListComponent, SearchComponent],
      providers: [
        { provide: HeroesService, useValue: mockHeroesService },
        { provide: LoadingService, useValue: mockLoadingService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
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

  it('should delete hero successfully', () => {
    const heroId = '1111';
    const mockResult: Hero = {
      _id: '1111',
      name: 'Mirko',
      description: 'Description 1',
    };
    component.heroes = mockHeroes;
    const mockHeroesAfterDel = mockHeroes.filter(f => f._id !== heroId);
    mockHeroesService.delete.and.returnValue(of(mockResult));

    component.deleteHero(heroId);

    expect(mockHeroesService.delete).toHaveBeenCalledWith(heroId);
    expect(component.heroes).toEqual(mockHeroesAfterDel);
    expect(component.heroes.length).toEqual(3);
  });

  it('should handle error when deleting hero', () => {
    const heroId = '123';
    const mockError = new Error('Delete error');
    mockHeroesService.delete.and.returnValue(throwError(mockError));

    spyOn(console, 'error');

    component.deleteHero(heroId);

    expect(mockHeroesService.delete).toHaveBeenCalledWith(heroId);
    expect(component.heroes).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(mockError);
  });

  it('should handle error when retrieving heroes', () => {
    const mockError: HttpErrorResponse = new HttpErrorResponse({});
    mockHeroesService.getAll.and.returnValue(throwError(mockError));

    spyOn(console, 'error');

    component.retrieveHeroes();

    expect(mockHeroesService.getAll).toHaveBeenCalled();
    expect(component.heroes).toEqual([]);
    expect(component.isLoading).toBe(false);
    expect(console.error).toHaveBeenCalledWith(mockError);
  });
});
