import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from 'src/app/models/service.model';


@Component({
  selector: 'app-service-update',
  templateUrl: './service-update.component.html',
  styleUrls: ['./service-update.component.css']
})
export class ServiceUpdateComponent implements OnInit {
  serviceId: number = 0;
  name: string = "";
  description: string = ""; 
  code: string = ""; 
  unitPrice: number = 0;
  services: Service[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const { id } = params;
      this.client.get<Service>(`https://localhost:5001/api/Service/getById/${id}`)
        .subscribe({
          next: (service) => {
            this.serviceId = service.serviceId!;
            this.name = service.name;
            this.description = service.description;
            this.code = service.code;
            this.unitPrice = service.unitPrice;
          },
          error: (error) => {
            console.error(error);
          }
        });

      this.client.get<Service[]>("https://localhost:5001/api/Service/getAll")
        .subscribe({
          next: (services) => {
            this.services = services;
          },
          error: (error) => {
            console.error(error);
          }
        });
    });
  }

  alterar(): void {
    let service: Service = {
      serviceId: this.serviceId,
      name: this.name,
      description: this.description,
      code: this.code,
      unitPrice: this.unitPrice
    };

    this.client.put<Service>(`https://localhost:5001/api/Service/put/${this.serviceId}`, service)
      .subscribe({
        next: (updatedService) => {
          this.snackBar.open("Serviço alterado com sucesso!", "PetShop", {
            duration: 1500,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.router.navigate(["pages/service/service-list"]);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  public voltar(): void {
    this.router.navigate(['pages/service/service-list']);
  }
}
