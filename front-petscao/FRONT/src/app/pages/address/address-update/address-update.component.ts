import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-address-update',
  templateUrl: './address-update.component.html',
  styleUrls: ['./address-update.component.css']
})
export class AddressUpdateComponent implements OnInit {

  addressId?: number = 0;
  street: string = "";
  number: number = 0;
  neighborhood: string = "";
  city: string = "";
  cep: string = "";
  createdAt?: string;
  address: Address[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    // Inicializando as propriedades aqui
    this.addressId = 0;
    this.street = "";
    this.number = 0;
    this.neighborhood = "";
    this.city = "";
    this.cep = "";
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const { id } = params;
      this.client.get<Address>(`https://localhost:5001/api/Address/getById/${id}`)
        .subscribe({
          next: (address) => {
            this.addressId = address.addressId!;
            this.street = address.street;
            this.number = address.number;
            this.neighborhood = address.neighborhood;
            this.city = address.city;
            this.cep = address.cep;
          },
          error: (error) => {
            console.error(error);
          }
        });

      this.client.get<Address[]>("https://localhost:5001/api/Address/getAll")
        .subscribe({
          next: (address) => {
            this.address = address;
          },
          error: (error) => {
            console.error(error);
          }
        });
    });
  }

  alterar(): void {
    let address: Address = {
      addressId: this.addressId,
      street: this.street,
      number: this.number,
      neighborhood: this.neighborhood,
      city: this.city,
      cep: this.cep
    };

    this.client.put<Address>(`https://localhost:5001/api/Address/put/${this.addressId}`, address)
      .subscribe({
        next: (updatedAddress) => {
          this.snackBar.open("Endereço alterado com sucesso!", "PetShop", {
            duration: 1500,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.router.navigate(["pages/address/address-list"]);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  public voltar(): void {
    this.router.navigate(['pages/address/address-list']);
  }
}
