import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Address } from "src/app/models/address.model";
import { Supplier } from "src/app/models/supplier.models";

@Component({
    selector: "app-supplier-update",
    templateUrl: "./supplier-update.component.html",
    styleUrls: ["./supplier-update.component.css"],
})
export class SupplierUpdateComponent {
    supplierId: number = 0;
    corporateReason: string = "";
    fantasyName: string = "";
    cnpj: string = "";
    phone: string = "";
    email: string = "";
    addressId: number = 0;
    addresses: Address[] = [];

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
                    .get<Supplier>(`https://localhost:5001/api/Supplier/getById/${id}`)
                    .subscribe({
                        next: (supplier) => {
                            this.client
                                .get<Address[]>("https://localhost:5001/api/Address/getAll")
                                .subscribe({
                                    next: (addresses) => {
                                        this.addresses = addresses;

                                        this.supplierId = supplier.supplierId!;
                                        this.corporateReason = supplier.corporateReason;
                                        this.fantasyName = supplier.fantasyName;
                                        this.cnpj = supplier.cnpj;
                                        this.phone = supplier.phone;
                                        this.email = supplier.email;
                                        this.addressId = supplier.addressId;
                                    },
                                    error: (erro) => {
                                        console.log(erro);
                                    },
                                });
                            },
                            error: (erro) => {
                                console.log(erro);
                            },
                    });
            },
        });
    }

    alterar(): void {
        let supplier: Supplier = {
            corporateReason: this.corporateReason,
            fantasyName: this.fantasyName,
            cnpj: this.cnpj,
            phone: this.phone,
            email: this.email,
            addressId: this.addressId,
        };

        this.client
            .put<Supplier>(`https://localhost:5001/api/Supplier/put/${this.supplierId}`, supplier)
            .subscribe({
            next: (produto) => {
                this.snackBar.open("Fornecedor alterado com sucesso!!", "PetShop", {
                    duration: 1500,
                    horizontalPosition: "right",
                    verticalPosition: "top",
                });
                this.router.navigate(["pages/supplier/supplier-list"]);
            },
            error: (erro) => {
            console.log(erro);
            },
        });
    }

    public voltar(){
        this.router.navigate(['pages/animal/animal-list'])
      }
}
