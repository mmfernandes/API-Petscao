import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AnimalListComponent } from "./pages/animal/animal-list/animal-list.component";
import { AnimalRegisterComponent } from "./pages/animal/animal-register/animal-register.component";
import { CustomerRegisterComponent } from "./pages/customer/customer-register/customer-register.component";
import { CustomerListComponent } from "./pages/customer/customer-list/customer-list.component";
import { AddressRegisterComponent } from "./pages/address/address-register/address-register.component";
import { AddressListComponent } from "./pages/address/address-list/address-list.component";
import { AnimalUpdateComponent } from "./pages/animal/animal-update/animal-update.component";
import { ServiceListComponent } from "./pages/service/service-list/service-list.component";
import { ServiceRegisterComponent } from "./pages/service/service-register/service-register.component";
import { SupplierListComponent } from "./pages/supplier/supplier-list/supplier-list.component";
import { SupplierRegisterComponent } from "./pages/supplier/supplier-register/supplier-register.component";
import { SupplierUpdateComponent } from "./pages/supplier/supplier-update/supplier-update.component";
<<<<<<< HEAD
import { CustomerUpdateComponent } from "./pages/customer/customer-update/customer-update.component";
=======
import { ServiceUpdateComponent } from "./pages/service/service-update/service-update.component";
>>>>>>> ea7d5258ed662a0457b9bd57eb1c8e36444a8e76

@NgModule({
  declarations: [
    AppComponent,

    AnimalListComponent,
    AnimalRegisterComponent,
    AnimalUpdateComponent,

    CustomerRegisterComponent,
    CustomerListComponent,
    CustomerUpdateComponent,

    SupplierListComponent,
    SupplierRegisterComponent,
    SupplierUpdateComponent,

    AddressRegisterComponent,
    AddressListComponent,
    
    ServiceListComponent,
    ServiceRegisterComponent,
    ServiceUpdateComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
