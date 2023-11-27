import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimeLine } from 'src/app/models/timelime.model';

@Component({
  selector: 'app-timeline-register',
  templateUrl: './timeline-register.component.html',
  styleUrls: ['./timeline-register.component.css']
})
export class TimelineRegisterComponent {
  customerId: number = 0;
  animalId: number = 0;
  serviceId: number = 0;
  employeeId: number = 0;
  startDate: string = "";
  endDate: string = "";

  timelines: TimeLine[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.client
      .get<TimeLine[]>("https://localhost:5001/api/Timeline/getAll")
      .subscribe({
        next: (timelines) => {
          console.table(timelines);
          this.timelines = timelines;
        },
        error: (erro) => {
          console.log(erro);
          this.snackBar.open('Erro ao obter dados do servidor ', '', {
            duration: 3000,
          });

        },
      });
    }

  cadastrar(): void {
    let timeline: TimeLine = {
      customerId: this.customerId,
      animalId: this.animalId,
      serviceId: this.serviceId,
      employeeId: this.employeeId,
      startDate: this.startDate,
      endDate: this.endDate,
    };

    this.client
      .post<TimeLine>(
        "https://localhost:5001/api/Timeline/post",
        timeline
      )
      .subscribe({
        next: (newTimeline) => {
          this.snackBar.open(
            "Linha de tempo cadastrada com sucesso!!",
            "PETSCAO",
            {
              duration: 1500,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(["pages/timeline/timeline-list"]);
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  public voltar() {
    this.router.navigate(['pages/timeline/timeline-list']);
  }
}
