import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Address } from "src/app/models/address.model"

@Component({
  selector: "app-address-register",
  templateUrl: "./address-register.component.html",
  styleUrls: ["./address-register.component.css"],
})
export class AddressRegisterComponent {
  addressId: string = "";
  street: string = "";
  number: number = 0;
  neighborhood: string = "";
  city:  string = ""; 
  cep: string = ""; 

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}
  
  cadastrarAddress(): void {
    let address = {
      street: this.street,
      number: this.number,
      neighborhood: this.neighborhood,
      city: this.city,
      cep: this.cep 
    };//

    this.client
      .post<Address>(
        "https://localhost:5001/api/Address/post",
        address
      )
      .subscribe({
        //A requição funcionou
        next: (address) => {
          this.snackBar.open(
            "endereço cadastrado com sucesso!!",
            "PETSCAO",
            {
              duration: 1500,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(["pages/address/address-list"]);
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

}//fimcomponent
