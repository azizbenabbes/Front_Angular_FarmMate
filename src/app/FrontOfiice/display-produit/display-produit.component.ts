import { Component, OnInit } from '@angular/core';
import { AddProduitComponent } from '../add-produit/add-produit.component';
import { AddProduitService } from '../services/add-produit.service';
import { Produit } from 'src/app/models/Produit';
import { StatusProduit } from 'src/app/models/StatusProduit';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-display-produit',
  templateUrl: './display-produit.component.html',
  styleUrls: ['./display-produit.component.css']
})
export class DisplayProduitComponent implements OnInit {
  produits: Produit[] = [];
  quantitesDisponibles: number[] = [];
  idUtilisateur = 1;
  selectedProduit: Produit | null = null; // Pour stocker le produit sélectionné
  produitsParPage = 3;  // Nombre de produits par page
  pageCourante = 0;  // Page courante
  totalPages: number = 0;
  categories: string[] = ['Fruits', 'Legumes', 'Cerales']; // Liste des catégories
  categorieFiltre: string = ''; // Filtre par catégorie
  totalPanier: number = 0; // Définir la propriété totalPanier

  constructor(
    private produitService: AddProduitService,
    private panierService: PanierService
    
  ) {}

  ngOnInit(): void {
    for (let i = 10; i <= 500; i += 10) {
      this.quantitesDisponibles.push(i);
    }
  
    this.produitService.DisplayProduit().subscribe(
      (data: Produit[]) => {
        this.produits = data.filter(produit =>
          produit.statusProduit?.trim().toLowerCase() === StatusProduit.Disponible.toLowerCase()
        );
        this.totalPages = Math.ceil(this.produits.length / this.produitsParPage); // <-- AJOUT ICI
        console.log("Produits collectés :", this.produits);
      },
      (error) => {
        console.error("Erreur lors de la récupération des produits", error);
      }
    );
  }

  ajouterAuPanier(idProduit: number, quantite: number): void {
    const idUserSession = this.idUtilisateur; // Utilisateur connecté
  
    if (!idProduit || idProduit === 0) {
      console.error("Erreur : ID du produit invalide.");
      alert("Erreur : produit non valide.");
      return;
    }
  
    if (!quantite || quantite < 10 || quantite > 500) {
      alert("Veuillez choisir une quantité entre 10 et 500 kg.");
      return;
    }
  
    this.panierService.ajouterAuPanier(idUserSession, idProduit, quantite)
      .subscribe({
        next: () => {
          alert("Produit ajouté au panier avec succès !");
          // Rafraîchir le total du panier après ajout
          this.panierService.getTotalPanier(idUserSession).subscribe(total => {
            this.totalPanier = total; // Mettre à jour le total du panier dans DisplayProduitComponent
          });
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout au panier :", err);
        }
      });
  }
  viewDetails(idProduit: number): void {
    this.produitService.retriveProduit(idProduit).subscribe(
      (data: Produit) => {
        this.selectedProduit = data; // Affecter les détails du produit sélectionné
        console.log("Détails du produit:", this.selectedProduit);
      },
      (error: any) => {
        console.error("Erreur lors de la récupération du produit", error);
      }
    );
  }

  // Ouvre le modal et sélectionne le produit
  openModal(produit: Produit): void {
    this.selectedProduit = produit; // Sélectionne le produit à afficher dans le modal
    console.log("Produit sélectionné pour le modal:", this.selectedProduit);
  }
   // Ferme le modal en réinitialisant le produit sélectionné
   closeModal(): void {
    this.selectedProduit = null; // Réinitialiser le produit sélectionné
  }

  changerPage(direction: number): void {
    const nouvellePage = this.pageCourante + direction;
  
    if (nouvellePage >= 0 && nouvellePage < this.totalPages) {
      this.pageCourante = nouvellePage;
      
      // Ajouter l'animation avant de changer la page
      const container = document.querySelector('.crises-container');
      if (container) {
        container.classList.add('animating');
        setTimeout(() => {
          container.classList.remove('animating'); // Retirer l'animation après 0.5s
        }, 500);
      }
    }
  }

  // Récupérer les produits à afficher pour la page courante
  getProduitsPage(): Produit[] {
    const startIndex = this.pageCourante * this.produitsParPage;
    const endIndex = startIndex + this.produitsParPage;
    return this.produits.slice(startIndex, endIndex);
  }





}