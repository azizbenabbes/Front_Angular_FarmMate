import { CategorieProduit } from "./CategorieProduit";
import { StatusProduit } from "./StatusProduit";

export class Produit {
    idProduit?: number;
    nomProduit: string;
    stockProduit: number;
    prixProduit: number;
    dateFa: Date;
    dateExp: Date;
    imageProduit: string;
    statusProduit: StatusProduit;
    categorieProduit: CategorieProduit;
    quantitePanier?:number;
    description : string ;
    remarque : String

    constructor(
        nomProduit: string,
        stockProduit: number,
        prixProduit: number,
        dateFa: Date,
        dateExp: Date,
        imageProduit: string,
        statusProduit: StatusProduit,
        categorieProduit: CategorieProduit,
        description : string ,
        remarque : String ,
       
    ) {
        this.nomProduit = nomProduit;
        this.stockProduit = stockProduit;
        this.prixProduit = prixProduit;
        this.dateFa = dateFa;
        this.dateExp = dateExp;
        this.imageProduit = imageProduit;
        this.statusProduit = statusProduit;
        this.categorieProduit = categorieProduit;
        this.description = description;
        this.remarque = remarque;


       
    }
}
