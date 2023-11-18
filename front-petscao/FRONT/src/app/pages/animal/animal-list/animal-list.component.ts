import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Animal } from "src/app/models/animal.model";
 
@Component({
  selector: "app-animal-list",
  templateUrl: "./animal-list.component.html",
  styleUrls: ["./animal-list.component.css"],
})
export class AnimalListComponent {
  columnsTable: string [] = [
    "id",
    "name",
    "breed",
    "createdAt",
  ];
  animals: Animal[] = []; 

  constructor(
    private readonly client: HttpClient,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.client
      .get<Animal[]>("https://localhost:5001/api/Animal/getAll")
      .subscribe({
        //Requisição com sucesso
        next: (animals) => {
          console.table(animals);
          this.animals = animals;
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
    this.router.navigate(['pages/animal/animal-register'])
  }
}