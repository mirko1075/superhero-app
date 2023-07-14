import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeroesListComponent } from "./components/heroes-list/heroes-list.component";
import { AddHeroComponent } from "./components/add-hero/add-hero.component";
import { HeroDetailsComponent } from "./components/hero-details/hero-details.component";
const routes: Routes = [
  { path: "", redirectTo: "heroes", pathMatch: "full" },
  { path: "heroes", component: HeroesListComponent },
  { path: "heroes/:id", component: HeroDetailsComponent },
  { path: "add", component: AddHeroComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
