import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Animal } from "src/app/models/animal.model";
import { Customer } from "src/app/models/customer.model";

@Component({
    selector: "app-animal-update",
    templateUrl: "./animal-update.component.html",
    styleUrls: ["./animal-update.component.css"],
})
export class AnimalUpdateComponent {
    animalId: number = 0;
    name: string = "";
    breed: string = "";
    customerId: number = 0;
    customers: Customer[] = [];

    constructor(
        private client: HttpClient,
        private router: Router,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe({
            next: (parametros) => {
                let { id } = parametros;
                this.client
                    .get<Animal>(`https://localhost:5001/api/Animal/getById/${id}`)
                    .subscribe({
                        next: (animal) => {
                            this.client
                                .get<Customer[]>("https://localhost:5001/api/Customer/getAll")
                                .subscribe({
                                    next: (customers) => {
                                        this.customers = customers;

                                        this.animalId = animal.animalId!;
                                        this.name = animal.name;
                                        this.breed = animal.breed;
                                        this.customerId = animal.customerId;
                                    },
                                    error: (erro) => {
                                        console.log(erro);
                                    },
                                });
                            },
                            //Requisição com erro
                            error: (erro) => {
                                console.log(erro);
                            },
                    });
            },
        });
    }

    alterar(): void {
        let animal: Animal = {
            name: this.name,
            breed: this.breed,
            customerId: this.customerId,
        };

        this.client
            .put<Animal>(`https://localhost:5001/api/Animal/put/${this.animalId}`, animal)
            .subscribe({
                //A requição funcionou
            next: (produto) => {
                this.snackBar.open("Animal alterado com sucesso!!", "PetShop", {
                    duration: 1500,
                    horizontalPosition: "right",
                    verticalPosition: "top",
                });
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
