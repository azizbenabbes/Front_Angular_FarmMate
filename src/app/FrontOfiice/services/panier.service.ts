import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Panier } from 'src/app/models/Panier';
import { Observable ,BehaviorSubject ,tap } from 'rxjs';
import { Produit } from 'src/app/models/Produit';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private totalSubject = new BehaviorSubject<number>(0);
  private panierSubject = new BehaviorSubject<Produit[]>([]);

  total$ = this.totalSubject.asObservable();
  panier$ = this.panierSubject.asObservable();
  url : string = " http://localhost:8082/panier";
  constructor(private _http:HttpClient) { }
  getTotalPanier(idConnected:number): Observable<number> {
    
        return this._http.get<number>(this.url +"/calculerTotalPanier/"+idConnected);
  }
  getProduitsDuPanier(idUsersession: number): Observable<Produit[]> {
    return this._http.get<Produit[]>(this.url +"/getProduitsDuPanier/"+idUsersession);

  }
   // Les autres méthodes restent inchangées mais ajoutez 'tap' aux modifications
   ajouterAuPanier(idUsersession: number, idProduit: number, quantite: number): Observable<any> {
    const body = { idUsersession, idproduit: idProduit, quantitePanier: quantite };
    return this._http.post(`${this.url}/addPanier/${idUsersession}/${idProduit}`, body)
      .pipe(tap(() => this.actualiserDonneesPanier(idUsersession)));
  }
  modifierQuantitePanier(idUsersession: number, idProduit: number, quantite: number): Observable<any> {
    const body = { idUsersession, idProduit, quantitePanier: quantite };
    return this._http.put(this.url + "/modifierQuantitePanier/" + idUsersession + "/" + idProduit, body, { headers: { 'Content-Type': 'application/json' } })
    .pipe(tap(() => this.actualiserDonneesPanier(idUsersession)));

  }


  supprimerProduitDuPanier(idUsersession: number, idProduit: number): Observable<any> {
    return this._http.delete(`${this.url}/supprimerProduitDuPanier/${idUsersession}/${idProduit}`)
      .pipe(tap(() => this.actualiserDonneesPanier(idUsersession)));
  }
  
  actualiserDonneesPanier(idUsersession: number): void {
    this.getTotalPanier(idUsersession).subscribe(total => this.totalSubject.next(total));
    this.getProduitsDuPanier(idUsersession).subscribe(produits => this.panierSubject.next(produits));
  }
  
}
