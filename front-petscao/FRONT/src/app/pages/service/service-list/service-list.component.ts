import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from 'src/app/models/service.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-service-list',
  // imports: [CommonModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})
export class ServiceListComponent {
  columnsTable: string[] = [
    "serviceId",
    "name",
    "description",
    "code",
    "unitPrice",
    "createdAt",
    "alterar",
    "deletar"
  ];
  services: Service[] = [];


  constructor(
    private client: HttpClient,
    private snackBar: MatSnackBar,
    private readonly router: Router

  ) {
    //Um problema de CORS ao fazer uma requisição para a nossa API
  }
  ngOnInit(): void {
    this.client
      .get<Service[]>("https://localhost:5001/api/Service/getAll")
      .subscribe({
        //Requisição com sucesso
        next: (services: Service[]) => {
          console.table(services);
          this.services = services;
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
  public openForm(){
    this.router.navigate(['pages/service/service-register'])
  }


  deletar(serviceId: number) {
    this.client
      .delete<Service[]>(
        `https://localhost:5001/api/Service/delete/${serviceId}`
      )
      .subscribe({
        next: (services) => {
          this.services = services;
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
