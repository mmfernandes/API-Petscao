import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from 'src/app/models/service.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})
export class ServiceListComponent {
  columsTableService: string[] = [
    // "serviceId",
    // "name",
    // "description",
    // "code",
    // "unitPrice",
    // "createdAt"
  ];
  services: Service[] = [];
  router: any;


  constructor(
    private client: HttpClient,
    private snackBar: MatSnackBar
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
        error: (erro: any) => {
          console.log(erro);
          this.snackBar.open('Erro ao obter dados do servidor', '', {
            duration: 3000, // 3 segundos
          });
          
        },
      });
  }
  public openForm(){
    this.router.navigate(['pages/animal/animal-register'])
  }
}
