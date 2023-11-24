import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnimalRegisterComponent } from './pages/animal/animal-register/animal-register.component';
import { AnimalListComponent } from './pages/animal/animal-list/animal-list.component';
import { CustomerRegisterComponent } from './pages/customer/customer-register/customer-register.component';
import { CustomerListComponent } from './pages/customer/customer-list/customer-list.component';
import { ServiceListComponent } from "./pages/service/service-list/service-list.component";
import { AddressRegisterComponent } from "./pages/address/address-register/address-register.component";
import { AddressListComponent } from "./pages/address/address-list/address-list.component";
import { AnimalUpdateComponent } from "./pages/animal/animal-update/animal-update.component";
import { SupplierListComponent } from "./pages/supplier/supplier-list/supplier-list.component";
import { SupplierRegisterComponent } from "./pages/supplier/supplier-register/supplier-register.component";
import { SupplierUpdateComponent } from "./pages/supplier/supplier-update/supplier-update.component";
<<<<<<< HEAD
import { CustomerUpdateComponent } from "./pages/customer/customer-update/customer-update.component";
=======
import { ServiceRegisterComponent } from "./pages/service/service-register/service-register.component";
import { ServiceUpdateComponent } from "./pages/service/service-update/service-update.component";
>>>>>>> ea7d5258ed662a0457b9bd57eb1c8e36444a8e76


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
    path: "pages/animal/animal-update/:id",
    component: AnimalUpdateComponent,
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
    path: "pages/customer/customer-update/:id",
    component: CustomerUpdateComponent
    ,
  },
  {
    path: "pages/service/service-list",
    component: ServiceListComponent,
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
  {
    path: "",
    component: SupplierListComponent,
  },
  {
    path: "pages/supplier/supplier-list",
    component: SupplierListComponent,
  },
  {
    path: "pages/supplier/supplier-register",
    component: SupplierRegisterComponent,
  },
  {
    path: "pages/supplier/supplier-update/:id",
    component: SupplierUpdateComponent,
  },
  {
    path: "pages/service/service-register",
    component: ServiceRegisterComponent,
  },
  {
    path: "pages/service/service-update/:id",
    component: ServiceUpdateComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
