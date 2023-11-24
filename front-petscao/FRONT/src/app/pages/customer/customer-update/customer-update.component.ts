import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Address } from "src/app/models/address.model";
import { Customer } from "src/app/models/customer.model";

@Component({
  selector: "app-customer-update",
  templateUrl: "./customer-update.component.html",
  styleUrls: ["./customer-update.component.css"],
})
export class CustomerUpdateComponent {
  customerId?: number;
  name: string = "";
  cpf: string = "";
  phone: string = "";
  email: string = "";
  addressId: number = 0;
  address?: Address;
  addresses: Address[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parametros) => {
        let { id } = parametros;
        this.client
          .get<Customer>(`https://localhost:5001/api/Customer/getById/${id}`)
          .subscribe({
            next: (customer) => {
              this.client
                .get<Address[]>("https://localhost:5001/api/Address/getAll")
                .subscribe({
                  next: (addresses) => {
                    this.addresses = addresses;

                    this.customerId = customer.customerId!;
                    this.name = customer.name;
                    this.cpf = customer.cpf;
                    this.phone = customer.phone;
                    this.email = customer.email;
                    this.addressId = customer.addressId;
                  },
                  error: (erro) => {
                    console.log(erro);
                  },
                });
            },
            error: (erro) => {
              console.log(erro);
            },
          });
      },
    });
    
  }

  alterar(): void {
    let customer: Customer = {
      name: this.name,
      cpf: this.cpf,
      phone: this.phone,
      email: this.email,
      addressId: this.addressId,
    };

    this.client
      .put<Customer>(
        `https://localhost:5001/api/Customer/put/${this.customerId}`,
        customer
      )
      .subscribe({
        next: (customer) => {
          this.snackBar.open("Fornecedor alterado com sucesso!!", "PetShop", {
            duration: 1500,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.router.navigate(["pages/customer/customer-list"]);
  
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }
 

  public voltar() {
    this.router.navigate(["pages/animal/customer-list"]);
  }
 
}
