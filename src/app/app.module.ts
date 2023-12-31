import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { HeroDetailsComponent } from './components/hero-details/hero-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoadingComponent } from './components/loading/loading.component';
import { UppercaseDirective } from './directives/uppercase.directive';
import { SearchComponent } from './components/search/search.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { UploaderComponent } from './components/uploader/uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    AddHeroComponent,
    HeroDetailsComponent,
    NavbarComponent,
    HeroCardComponent,
    ConfirmationModalComponent,
    TruncatePipe,
    LoadingComponent,
    UppercaseDirective,
    SearchComponent,
    SvgIconComponent,
    UploaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
