import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Address } from "src/app/models/address.model";
import { TimeLine } from "src/app/models/timelime.model";

@Component({
    selector: "app-timeline-update",
    templateUrl: "./timeline-update.component.html",
    styleUrls: ["./timeline-update.component.css"],
})
export class TimelineUpdateComponent {
    timelineId: number = 0;
    customerId: number = 0;
    animalId: number = 0;
    serviceId: number = 0;
    employeeId: number = 0;
    startDate: string = "";
    endDate: string = "";

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
                    .get<TimeLine>(`https://localhost:5001/api/TimeLine/getById/${id}`)
                    .subscribe({
                        next: (timeline) => {
                            this.client
                                .get<Address[]>("https://localhost:5001/api/Address/getAll")
                                .subscribe({
                                    next: (addresses) => {
                                        this.addresses = addresses;

                                        this.timelineId = timeline.timelineId!;
                                        this.customerId = timeline.customerId;
                                        this.animalId = timeline.animalId;
                                        this.serviceId = timeline.serviceId;
                                        this.employeeId = timeline.employeeId;
                                        this.startDate = timeline.startDate || "";
                                        this.endDate = timeline.endDate || "";
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
        if (this.isValidDates()) {
            let timeline: TimeLine = {
                customerId: this.customerId,
                animalId: this.animalId,
                serviceId: this.serviceId,
                employeeId: this.employeeId,
                startDate: this.startDate,
                endDate: this.endDate,
            };

            this.client
                .put<TimeLine>(`https://localhost:5001/api/TimeLine/put/${this.timelineId}`, timeline)
                .subscribe({
                    next: () => {
                        this.snackBar.open("Linha de tempo alterada com sucesso!!", "PetShop", {
                            duration: 1500,
                            horizontalPosition: "right",
                            verticalPosition: "top",
                        });
                        this.router.navigate(["pages/timeline/timeline-list"]);
                    },
                    error: (erro) => {
                        console.log(erro);
                    },
                });
        } else {
            this.snackBar.open("Por favor, verifique as datas.", "", {
                duration: 2000,
                horizontalPosition: "right",
                verticalPosition: "top",
            });
        }
    }

    isValidDates(): boolean {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        return start < end;
    }

    public voltar(){
        this.router.navigate(['pages/timeline/timeline-list'])
    }
}
