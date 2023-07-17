import { Component, EventEmitter, Output } from '@angular/core';
import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent {
  @Output() sendImageName: EventEmitter<string> = new EventEmitter<string>();

  public selectedFile: File | null = null;
  public selectedFileName = '';
  public imagePreview: string | ArrayBuffer | null = null;

  constructor(private uploadService: UploadService) {}

  public handleFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target?.files && target.files.length) {
      this.selectedFile = target.files[0];
      this.selectedFileName = this.selectedFile.name;

      // Read the image file for preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.selectedFileName = '';
      this.imagePreview = null;
    }
  }

  public upload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      this.uploadService.uploadImage(formData).subscribe({
        next: (image: { imageName: string }) => {
          this.sendImageName.emit(image.imageName);
        },
        error: error => console.error(error),
      });
    }
  }
}
