import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnimalRegisterComponent } from './pages/animal/animal-register/animal-register.component';
import { AnimalListComponent } from './pages/animal/animal-list/animal-list.component';
import { CustomerRegisterComponent } from './pages/customer/customer-register/customer-register.component';
import { CustomerListComponent } from './pages/customer/customer-list/customer-list.component';
import { AddressRegisterComponent } from "./pages/address/address-register/address-register.component";
import { AddressListComponent } from "./pages/address/address-list/address-list.component";


const routes: Routes = [
  {
    path: "",
    component: AnimalListComponent,
  },
  {
    path: "pages/animal/animal-list",
    component: AnimalListComponent,
  },
  {
    path: "pages/animal/animal-register",
    component: AnimalRegisterComponent,
  },
  {
    path: "pages/customer/customer-register",
    component: CustomerRegisterComponent,
  },
  {
    path: "",
    component: CustomerListComponent,
  },
  {
    path: "pages/customer/customer-list",
    component: CustomerListComponent,
  },
  {
    path: "pages/address/address-register",
    component: AddressRegisterComponent,
  },
  {
    path: "",
    component: AddressListComponent,
  },
  {
    path: "pages/address/address-list",
    component: AddressListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
