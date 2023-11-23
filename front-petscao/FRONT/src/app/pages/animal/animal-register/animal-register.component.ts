import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Customer } from "src/app/models/customer.model";
import { Animal } from 'src/app/models/animal.model';

@Component({
  selector: "app-animal-register",
  templateUrl: "./animal-register.component.html",
  styleUrls: ["./animal-register.component.css"],
})
export class AnimalRegisterComponent {
    name: string = "";
    breed: string = "";
    customerId: number = 0;
    customers: Customer[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.client
      .get<Customer[]>("https://localhost:5001/api/Customer/getAll")//lista d
      .subscribe({
        //A requição funcionou
        next: (customers) => {
          console.table(customers);
          this.customers = customers;
        },
        error: (erro) => {
          console.log(erro);
          this.snackBar.open('Erro ao obter dados do servidor', '', {
            duration: 3000, //3 sec
          });
        },
      });
  }

  cadastrar(): void 
  {
    let animal: Animal = {
      name: this.name,
      breed: this.breed,
      customerId: this.customerId,
    };

    this.client
      .post<Animal>(
        "https://localhost:5001/api/Animal/post",
        animal
      )
      .subscribe({
        //A requição funcionou
        next: (animal) => {
          this.snackBar.open(
            "Animal cadastrado com sucesso!!",
            "PETSCAO",
            {
              duration: 1500,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(["pages/animal/animal-list"]);
        },
        //A requição não funcionou
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  public voltar(){
    this.router.navigate(['pages/animal/animal-list'])
  }
}
