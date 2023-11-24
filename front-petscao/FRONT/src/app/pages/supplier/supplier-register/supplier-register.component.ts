import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Address } from "src/app/models/address.model";
import { Supplier } from "src/app/models/supplier.models";

@Component({
  selector: "app-supplier-register",
  templateUrl: "./supplier-register.component.html",
  styleUrls: ["./supplier-register.component.css"],
})
export class SupplierRegisterComponent {
    corporateReason: string = "";
    fantasyName: string = "";
    cnpj: string = "";
    phone: string = "";
    email: string = "";
    addressId: number = 0;
    addresses: Address[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.client
      .get<Address[]>("https://localhost:5001/api/Address/getAll")
      .subscribe({
        next: (addresses) => {
          this.addresses = addresses;
        },
        error: (erro) => {
          console.log(erro);
          this.snackBar.open('Erro ao obter dados do servidor', '', {
            duration: 3000,
          });
        },
      });
  }

  cadastrar(): void {
    let supplier: Supplier = {
      corporateReason: this.corporateReason,
      fantasyName: this.fantasyName,
      cnpj: this.cnpj,
      phone: this.phone,
      email: this.email,
      addressId: this.addressId,
    };

    this.client
      .post<Supplier>(
        "https://localhost:5001/api/Supplier/post",
        supplier
      )
      .subscribe({
        next: (supplier) => {
          this.snackBar.open(
            "Fornecedor cadastrado com sucesso!!",
            "PETSCAO",
            {
              duration: 1500,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(["pages/supplier/supplier-list"]);
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  public voltar(){
    this.router.navigate(['pages/supplier/supplier-list'])
  }
}
