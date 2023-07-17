import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UploadService } from './upload.service';

describe('UploadService', () => {
  let service: UploadService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UploadService],
    });

    service = TestBed.inject(UploadService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should upload an image and return the image name', () => {
    const mockImageName = 'example.jpg';
    const mockFile = new File([], 'example.jpg');
    const mockFormData = new FormData();
    mockFormData.append('image', mockFile);

    service.uploadImage(mockFormData).subscribe(response => {
      expect(response.imageName).toBe(mockImageName);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/api/upload'
    );
    expect(req.request.method).toBe('POST');
    req.flush({ imageName: mockImageName });
  });
});
