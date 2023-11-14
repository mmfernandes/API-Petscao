import { Customer } from 'src/app/models/customer.model';
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
 import {
   MatTable,
   MatTableDataSource,
 } from "@angular/material/table";

 @Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.css"],
})
export class CustomerListComponent {
  columnsTableCustomer: string [] = [
    "id",
    "name",
    "cpf",
    "createdAt" 
  ];
  customers: Customer[] = []; 

  constructor(
    private client: HttpClient,
    private snackBar: MatSnackBar
  ) {
    //Um problema de CORS ao fazer uma requisição para a nossa API
  }
  ngOnInit(): void {
    this.client
      .get<Customer[]>("https://localhost:5001/api/Customer/getAll")
      .subscribe({
        //Requisição com sucesso
        next: (customers) => {
          console.table(customers);
          this.customers = customers;
        },
        //Requisição com erro
        error: (erro) => {
          console.log(erro);
          this.snackBar.open('Erro ao obter dados do servidor', '', {
            duration: 3000, // 3 segundos
          });
          
        },
      });
  }
}//end component