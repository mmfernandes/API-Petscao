import { AnimalListComponent } from './pages/animal/animal-list/animal-list.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



const routes: Routes = [
  {
    path: "",
    component: AnimalListComponent,
  },
  {
    path: "pages/produto/listar",
    component: AnimalListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
