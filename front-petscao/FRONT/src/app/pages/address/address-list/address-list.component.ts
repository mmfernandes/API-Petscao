// address-list.component.ts
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Address } from "src/app/models/address.model";  

@Component({
  selector: "app-address-list",
  templateUrl: "./address-list.component.html",
  styleUrls: ["./address-list.component.css"],
})
export class AddressListComponent {
  columnsTableAdd: string[] = [
    "addressId",
    "street",
    "number",
    "neighborhood",
    "city",
    "cep",
    "deletar",
    "alterar"
  ];
  
  addresses: Address[] = [];

  constructor(
    private readonly client: HttpClient,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.client
      .get<Address[]>("https://localhost:5001/api/Address/getAll")
      .subscribe({
        // Requisição com sucesso
        next: (addresses) => {
          console.table(addresses);
          this.addresses = addresses;
        },
        // Requisição com erro
        error: (error) => {
          console.log(error);
          this.snackBar.open("Erro ao obter dados do servidor", "", {
            duration: 3000, // 3 segundos
          });
        },
      });
  }

  openForm() {
    this.router.navigate(["pages/address/address-register"]);
  }

  deletar(addressId: number) {
    this.client
      .delete<Address[]>(
        `https://localhost:5001/api/Address/delete/${addressId}`
      )
      .subscribe({
        next: (address) => {
          this.addresses = address;
          this.snackBar.open(
            "Fornecedor deletado com sucesso!!",
            "PetShop",
            {
              duration: 1500,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }
}
