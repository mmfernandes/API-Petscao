import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Supplier } from "src/app/models/supplier.models";
 
@Component({
  selector: "app-supplier-list",
  templateUrl: "./supplier-list.component.html",
  styleUrls: ["./supplier-list.component.css"],
})
export class SupplierListComponent {
  columnsTable: string [] = [
    "id",
    "corporateReason",
    "fantasyName",
    "cnpj",
    "phone",
    "email",
    "address",
    "alterar",
    "deletar"
  ];
  suppliers: Supplier[] = []; 

  constructor(
    private readonly client: HttpClient,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.client
      .get<Supplier[]>("https://localhost:5001/api/Supplier/getAll")
      .subscribe({
        next: (suppliers) => {
          this.suppliers = suppliers;
        },
        error: (erro) => {
          console.log(erro);
          this.snackBar.open('Erro ao obter dados do servidor', '', {
            duration: 3000,
          });
          
        },
      });
  }

  public openPost(){
    this.router.navigate(['pages/supplier/supplier-register'])
  }

  deletar(supplierId: number) {
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir este FORNECEDOR?');
    if(confirmDelete){
    this.client
      .delete<Supplier[]>(
        `https://localhost:5001/api/Supplier/delete/${supplierId}`
      )
      .subscribe({
        next: (suppliers) => {
          this.suppliers = suppliers;
          this.snackBar.open(
            "Fornecedor deletado com sucesso!!",
            "PetShop",
            {
              duration: 1500,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(['pages/supplier/supplier-list']);
        },
        error: (erro) => {
          console.log(erro);
        },
      });
    }
  }
}