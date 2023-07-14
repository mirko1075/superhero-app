import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { HeroDetailsComponent } from './components/hero-details/hero-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    AddHeroComponent,
    HeroDetailsComponent,
    NavbarComponent,
    HeroCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
