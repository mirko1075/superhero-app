import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploaderComponent } from './uploader.component';
import { UploadService } from 'src/app/services/upload/upload.service';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('UploaderComponent', () => {
  let component: UploaderComponent;
  let fixture: ComponentFixture<UploaderComponent>;
  let uploadService: UploadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploaderComponent],
      providers: [UploadService, HttpClient, HttpHandler],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaderComponent);
    component = fixture.componentInstance;
    uploadService = TestBed.inject(UploadService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the image name on successful upload', () => {
    const imageName = 'example.jpg';
    const uploadImageSpy = spyOn(uploadService, 'uploadImage').and.returnValue(
      of({ imageName })
    );
    const sendImageNameSpy = spyOn(component.sendImageName, 'emit');

    component.selectedFile = new File([], 'example.jpg');
    component.upload();

    expect(uploadImageSpy).toHaveBeenCalled();
    expect(sendImageNameSpy).toHaveBeenCalledWith(imageName);
  });

  it('should reset file-related properties on file change', () => {
    const file = new File([], 'example.jpg');
    const event: any = {
      target: {
        files: [file],
      },
    } as unknown as Event;
    component.handleFileChange(event);
    expect(component.selectedFile).toBe(file);
    expect(component.selectedFileName).toBe('example.jpg');

    component.handleFileChange({} as Event);

    expect(component.selectedFile).toBeNull();
    expect(component.selectedFileName).toBe('');
    expect(component.imagePreview).toBeNull();
  });
});
