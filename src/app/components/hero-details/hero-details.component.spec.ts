import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { HeroDetailsComponent } from './hero-details.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component'; // Import the app-loading component

describe('HeroDetailsComponent', () => {
  let component: HeroDetailsComponent;
  let fixture: ComponentFixture<HeroDetailsComponent>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockRouter: Partial<Router>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;
  let mockLoadingService: Partial<LoadingService>;
  const mockHeroes: Hero[] = [
    { _id: '1111', name: 'Mirko', description: 'Description 1' },
    { _id: '2222', name: 'Pablo', description: 'Description 2' },
    { _id: '3333', name: 'Juan', description: 'Description 3' },
    { _id: '4444', name: 'Maria', description: 'Description 4' },
  ];

  beforeEach(async () => {
    mockActivatedRoute = {
      params: of({ id: '123' }),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockHeroesService = jasmine.createSpyObj('HeroesService', ['get']);

    mockLoadingService = {
      loading$: of(true),
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeroDetailsComponent, LoadingComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: HeroesService, useValue: mockHeroesService },
        { provide: LoadingService, useValue: mockLoadingService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should retrieve a hero', () => {
    const mockHero: Hero = mockHeroes[0];
    mockHeroesService.get.and.returnValue(of(mockHero));

    component.retrieveHero('1111');

    expect(mockHeroesService.get).toHaveBeenCalledWith('1111');
    expect(component.hero).toEqual(mockHero);
  });

  it('should navigate back', () => {
    component.navigateBack();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
