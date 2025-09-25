import { Produit } from "./Produit";

export class Panier {
    idPanier?: number;
    dateCreation: Date;
    produits?: Produit[];
    userId?: number;
   ;
    constructor(
        dateCreation: Date,
        produits?: Produit[],
        userId?: number,
        
    ) {
        this.dateCreation = dateCreation;
        this.produits = produits;
        this.userId = userId;

    }
}
