import { Router } from '@angular/router';

import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
 import {
   MatTable,
   MatTableDataSource,
 } from "@angular/material/table";
import { CommonModule } from '@angular/common';
import { Employee } from 'src/app/models/employee.model';
@Component({
  selector: 'app-employee-list',

  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  columnsTableEmployee: string [] = [
    "id",
    "Name",
    "cpf",
    "phone",
    "email",
    "createdAt" ,
    "alterar",
    "deletar"
  ];
  employees: Employee[] = []; 

  constructor(
    private client: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    //Um problema de CORS ao fazer uma requisição para a nossa API
  }
  ngOnInit(): void {
    this.client
      .get<Employee[]>("https://localhost:5001/api/Employee/getAll")
      .subscribe({
        //Requisição com sucesso
        next: (employees) => {
          console.table(employees);
          this.employees = employees;
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

  deletarEmployees(employeeId: number) {
    this.client
      .delete<Employee[]>(
        `https://localhost:5001/api/Employee/delete/${employeeId}`
      )
      .subscribe({
        next: (employeeId) => {
          this.employees = employeeId;
          this.snackBar.open(
            "Funcionario(a) deletado com sucesso!!",
            "PetShop",
            {
              duration: 1500,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(["pages/employee/employee-list"])
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }
  
  public openPost(){
    this.router.navigate(['pages/employee/employee-register'])
  }
}
