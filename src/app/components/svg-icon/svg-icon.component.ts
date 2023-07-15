import { Component, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { IconsService } from 'src/app/services/icons/icons.service';

@Component({
  selector: 'app-svg-icon',
  template: `<span [innerHTML]="svgIcon"></span>`,
  styleUrls: ['./svg-icon.component.scss'],
})
export class SvgIconComponent implements OnChanges {
  @Input()
  public name?: string;

  public svgIcon: any;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private iconService: IconsService
  ) {}

  public ngOnChanges(): void {
    if (!this.name) {
      this.svgIcon = '';
      return;
    }
    this.iconService.getIconByName(this.name).subscribe(value => {
      this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
    });
  }
}
