import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TimeLine } from 'src/app/models/timelime.model';

@Component({
  selector: 'app-timeline-list',
  templateUrl: './timeline-list.component.html',
  styleUrls: ['./timeline-list.component.css'],
})
export class TimelineListComponent {
  columnsTableTimeline: string[] = [
    "timelineId",
    "customer",
    "animal",
    "service",
    "startDate",
    "endDate",
    "alterar",
    "deletar"
  ];
  timelines: TimeLine[] = [];


  constructor(
    private readonly client: HttpClient,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) { }

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
      // carregaTela(): void {
      //   this.loadTimelines();
      // }
      deletar(timelineId: number) {
        this.client
          .delete<TimeLine[]>(
            `https://localhost:5001/api/Timeline/delete/${timelineId}`
          )
          .subscribe({
            next: (timelines) => {
              this.timelines = timelines;
              this.snackBar.open(
                "Fornecedor deletado com sucesso!!",
                "PetShop",
                {
                  duration: 1500,
                  horizontalPosition: "right",
                  verticalPosition: "top",
                }
              );
            },
            error: (erro) => {
              console.log(erro);
            },
          });
      }

}