import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Customer } from "src/app/models/customer.model";
import { Animal } from "src/app/models/animal.model";
import { Address } from "src/app/models/address.model";

@Component({
  selector: "app-customer-register",
  templateUrl: "./customer-register.component.html",
  styleUrls: ["./customer-register.component.css"],
})
export class CustomerRegisterComponent {

  name: string = "";
  cpf: string = "";
  phone: string = "";
  email: string = "";
  addressId: number = 0;
  adresses: Address[] = [];
  

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.client
      .get<Address[]>("https://localhost:5001/api/Address/getAll")
      .subscribe({
        //A requição funcionou
        next: (adresses) => {
          console.table(adresses);
          this.adresses = adresses;
        },
        error: (erro) => {
          console.log(erro);
          this.snackBar.open("Erro ao obter dados do servidor", "", {
            duration: 3000, //3 sec
          });
        },
      });
  }
  cadastrarCustomer(): void {
    let customer: Customer = {
      name: this.name,
      cpf: this.cpf,
      phone: this.phone,
      email: this.email,
      addressId: this.addressId,
    };

    this.client
      .post<Customer>("https://localhost:5001/api/Customer/post", customer)
      .subscribe({
        //A requição funcionou
        next: (customer) => {
          this.snackBar.open("Customer cadastrado com sucesso!!", "PETSCAO", {
            duration: 1500,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.router.navigate(["pages/customer/customer-list"]);
        },
        //A requição não funcionou
        error: (customer) => {
          console.log(customer);
        },
      });
  }
} //fim component
