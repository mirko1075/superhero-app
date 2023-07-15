import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });
    loadingService = TestBed.inject(LoadingService);
  });

  it('should show loading', fakeAsync(() => {
    loadingService.loading$.subscribe((isLoading: boolean) => {
      expect(isLoading).toBe(true);
    });

    loadingService.showLoading();

    tick();
  }));

  it('should hide loading', fakeAsync(() => {
    loadingService.loading$.subscribe((isLoading: boolean) => {
      expect(isLoading).toBe(false);
    });

    loadingService.hideLoading();

    tick();
  }));
});
