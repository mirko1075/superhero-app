import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}
  navigateTo(route: string): void {
    const navigationExtras: NavigationExtras = {
      skipLocationChange: true,
    };

    this.router.navigateByUrl(route, navigationExtras).then(() => {
      window.location.reload();
    });
  }
}
