import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { HeroDetailsComponent } from './components/hero-details/hero-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    AddHeroComponent,
    HeroDetailsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
