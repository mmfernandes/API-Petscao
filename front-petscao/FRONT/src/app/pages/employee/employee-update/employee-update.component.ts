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
  employeeId?: number;
  name: string = "";
  cpf: string = "";
  phone: string = "";
  email: string = "";
  addressId: number = 0;
  // Address?: Address;
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
          .get<Employee>(`https://localhost:5001/api/Employee/getById/${id}`)
          .subscribe({
            next: (employee) => {
              this.client
                .get<Address[]>("https://localhost:5001/api/Address/getAll")
                .subscribe({
                  next: (addresses) => {
                    this.adresses = addresses;
                    
                    this.employeeId = employee.employeeId!
                    this.name = employee.name;
                    this.cpf = employee.cpf;
                    this.phone = employee.phone;
                    this.email = employee.email;
                    this.addressId = employee.addressId;
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
      name: this.name,
      cpf: this.cpf,
      phone: this.phone,
      email: this.email,
      addressId: this.addressId,
    };

    this.client
      .put<Employee>(
        `https://localhost:5001/api/Employee/put/${this.employeeId}`,
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
