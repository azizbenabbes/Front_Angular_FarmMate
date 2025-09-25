import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Produit } from 'src/app/models/Produit';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddProduitService {
  url : string = " http://localhost:8082/produit";

  constructor(private _http:HttpClient ) { }
  addProduit(produit:Produit,idConnected:number):Observable<Produit>{
  
    return this._http.post<Produit>(this.url +"/addProduit/"+idConnected,produit);
   }
   DisplayProduit(): Observable<Produit[]> { // Ajoute les crochets [] ici
    return this._http.get<Produit[]>(this.url + "/Diplayproduit");
  }
  DisplaymesProduit(idConnected:number): Observable<Produit[]> { // Ajoute les crochets [] ici
    return this._http.get<Produit[]>(this.url + "/ListProduitByUser"+idConnected);
  }
  retriveProduit(idProduit: number): Observable<Produit> {
    return this._http.get<Produit>(this.url+"/get"+idProduit);
  }
  updateProduit(produit: Produit, idProduit: number): Observable<Produit> {
    return this._http.put<Produit>(this.url + "/updateProduit/" + idProduit, produit);
  }
  deleteProduit(idProduit: number): Observable<void> {
    return this._http.delete<void>(`${this.url}/delete/${idProduit}`);
  }
  getProduitsEnAttente(): Observable<Produit[]> {
    return this._http.get<Produit[]>(this.url + "/en-attente");
  }
  updateStatusAndRemarque(idProduit: number, statusProduit: string, remarque: string): Observable<Produit> {
    const params = new HttpParams()
      .set('statusProduit', statusProduit)
      .set('remarque', remarque);
  
    return this._http.put<Produit>(`${this.url}/updateStatusAndRemarque/${idProduit}`, null, { params });
  }
}
