import { Time } from "@angular/common";
import { JourSemaine } from "./JourSemaine";
import { Specialist } from "./Specialist";
import { RendezVous } from "./RendezVous";

export class Disponibilite{

     idDisponibilite!:number;

   
     jour!:JourSemaine;
     heureDebut!:string ;
     heureFin!:string ;


   
     specialist!:Specialist; //session
     rendezVousSet!:RendezVous[]
}