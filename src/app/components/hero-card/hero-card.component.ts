import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Hero } from 'src/app/models/hero.model';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { IconsService } from 'src/app/services/icons/icons.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
})
export class HeroCardComponent {
  @Input() item: Hero | undefined;
  @Output() sendDeleteHero: EventEmitter<string> = new EventEmitter<string>();

  public svgIcon: SafeHtml | undefined;
  public remoteUrl = 'http://localhost:3000/images/';

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private modalConfig: NgbModalConfig,
    private iconService: IconsService
  ) {}

  public navigateToRoute(route: string): void {
    this.router.navigate([route]);
  }

  public deleteHero(heroId: string | undefined): void {
    this.sendDeleteHero.emit(heroId);
  }

  public openConfirmation(heroId: string | undefined) {
    this.setModalConfig();
    const modalRef = this.modalService.open(
      ConfirmationModalComponent,
      this.modalConfig
    );
    modalRef.result
      .then(async () => {
        this.deleteHero(heroId);
      })
      .catch(() => {
        return;
      });
  }

  private setModalConfig(): void {
    this.modalConfig.size = 'lg';
    this.modalConfig.centered = true;
    this.modalConfig.scrollable = false;
    this.modalConfig.windowClass = 'rover-modal';
  }
}
