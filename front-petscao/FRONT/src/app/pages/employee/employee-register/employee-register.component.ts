import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Address } from "src/app/models/address.model";
import { Employee } from "src/app/models/employee.model";
@Component({
  selector: 'app-employee-register',

  templateUrl: './employee-register.component.html',
  styleUrl: './employee-register.component.css'
})
export class EmployeeRegisterComponent {
  
  name: string = "";
  cpf: string = "";
  phone: string = "";
  email: string = "";
  addressId: number = 0;
  adresses: Address[] = [];
  

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.client
      .get<Address[]>("https://localhost:5001/api/Address/getAll")
      .subscribe({
        //A requição funcionou
        next: (adresses) => {
          console.table(adresses);
          this.adresses = adresses;
        },
        error: (erro) => {
          console.log(erro);
          this.snackBar.open("Erro ao obter dados do servidor", "", {
            duration: 3000, //3 sec
          });
        },
      });
  }
  cadastrarEmployee(): void {
    let employee: Employee = {
      Name: this.name,
      CPF: this.cpf,
      Phone: this.phone,
      Email: this.email,
      AddressId: this.addressId,
      EmployeeId: 0,
    };

    this.client
      .post<Employee>("https://localhost:5001/api/Employee/post", employee)
      .subscribe({
        //A requição funcionou
        next: (employee) => {
          this.snackBar.open("Employee cadastrado com sucesso!!", "PETSCAO", {
            duration: 1500,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.router.navigate(["pages/employee/employee-list"]);
        },
        //A requição não funcionou
        error: (customer) => {
          console.log(customer);
        },
      });
  }

  public voltar(){
    this.router.navigate(['pages/employee/employee-list'])
  }
}

