import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Address } from "src/app/models/address.model";
import { Employee } from "src/app/models/employee.model";

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent {
  EmployeeId?: number;
  name: string = "";
  cpf: string = "";
  phone: string = "";
  email: string = "";
  AddressId: number = 0;
  Address?: Address;
  adresses: Address[] = [];
  

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
          .get<Employee>(`https://localhost:5001/api/employee/getById/${id}`)
          .subscribe({
            next: (employee) => {
              this.client
                .get<Address[]>("https://localhost:5001/api/Address/getAll")
                .subscribe({
                  next: (addresses) => {
                    this.adresses = addresses;
                    
                    this.EmployeeId = employee.EmployeeId!
                    this.name = employee.Name;
                    this.cpf = employee.CPF;
                    this.phone = employee.Phone;
                    this.email = employee.Email;
                    this.AddressId = employee.AddressId;
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
    let employee: Employee = {
      Name: this.name,
      CPF: this.cpf,
      Phone: this.phone,
      Email: this.email,
      AddressId: this.AddressId,
    };

    this.client
      .put<Employee>(
        `https://localhost:5001/api/employee/put/${this.EmployeeId}`,
        employee
      )
      .subscribe({
        next: (employee) => {
          this.snackBar.open("Funcionario alterado com sucesso!!", "PetShop", {
            duration: 1500,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.router.navigate(["pages/employee/employee-list"]);
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  public voltar() {
    this.router.navigate(["pages/employee/employee-list"]);
  }
}
