import { StaticProvider } from "@angular/core";
import { Disponibilite } from "./Disponibilite";
import { StatusRdv } from "./StatusRdv";

export class RendezVous
{
    idRdv!: number;
    userId!: number;
    dateRdv!: string; // Stocké en format YYYY-MM-DD
    heureRdv!: string; // Stocké en format HH:mm
    statusrdv!: StatusRdv;
    disponibilite!: Disponibilite;
}