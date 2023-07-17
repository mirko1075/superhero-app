import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';
import { Hero } from '../../models/hero.model';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    });
    service = TestBed.inject(HeroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all heroes', () => {
    const mockHeroes: Hero[] = [
      { _id: '111', name: 'Superman' },
      { _id: '222', name: 'WonderWoman' },
      { _id: '333', name: 'SuperGirl' },
    ];

    service.getAll().subscribe(heroes => {
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/heroes');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should get a hero by id', () => {
    const mockHero: Hero = {
      // mock hero object
      _id: '111',
      name: 'Superman',
    };
    const heroId = '111';

    service.get(heroId).subscribe(hero => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/api/heroes/${heroId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockHero);
  });

  it('should create a hero', () => {
    const mockHeroData = {
      // mock hero data
      _id: '111',
      name: 'Superman',
      imageName: '',
      description: 'Superman is a super hero',
    };

    service.create(mockHeroData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/api/heroes');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should update a hero', () => {
    const mockHeroData = {
      // mock hero object
      _id: '111',
      name: 'Superman',
      imageName: '',
      description: 'Superman is a super hero',
    };
    const heroId = '111';

    service.update(heroId, mockHeroData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/api/heroes/${heroId}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should delete a hero', () => {
    const heroId = '123';

    service.delete(heroId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/api/heroes/${heroId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
