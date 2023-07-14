import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeroesListComponent } from "./components/heroes-list/heroes-list.component";
import { AddHeroComponent } from "./components/add-hero/add-hero.component";
import { HeroDetailsComponent } from "./components/hero-details/hero-details.component";
const routes: Routes = [
  { path: "", redirectTo: "api/heroes", pathMatch: "full" },
  { path: "api/heroes", component: HeroesListComponent },
  { path: "api/heroes/add", component: AddHeroComponent },
  { path: "api/heroes/add/:id", component: AddHeroComponent },
  { path: "api/heroes/:id", component: HeroDetailsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
