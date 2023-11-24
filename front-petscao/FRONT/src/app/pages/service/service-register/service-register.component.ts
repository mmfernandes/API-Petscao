import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
// import { Router } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from 'src/app/models/service.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-service-register',
  // imports: [CommonModule],
  templateUrl: './service-register.component.html',
  styleUrl: './service-register.component.css'
})
export class ServiceRegisterComponent {
  serviceId: string = "";
  name: string = "";
  description: string = ""; 
  code: string = ""; 
  unitPrice: number = 0;

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  cadastrarService(): void {
    let service = {
      name: this.name,
      description: this.description,
      code: this.code,
      unitPrice: this.unitPrice
    };//

    this.client
      .post<Service>(
        "https://localhost:5001/api/Service/post",
        service
      )
      .subscribe({
        //A requição funcionou
        next: (service) => {
          this.snackBar.open(
            "Serviço cadastrado com sucesso!!",
            "PETSCAO",
            {
              duration: 1500,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(["pages/service/service-list"]);
        },
        //A requição não funcionou
        error: (erro) => {
          console.log(erro);
        },
      });  
  }

  public voltar(){
    this.router.navigate(['pages/service/service-list'])
  }
}
