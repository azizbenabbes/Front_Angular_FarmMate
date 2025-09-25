import { Component,OnInit  } from '@angular/core';
import { PanierService } from '../services/panier.service';
import { Produit } from 'src/app/models/Produit';
import {
  trigger,
  transition,
  style,
  animate}

from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-header-front',
  templateUrl: './client-header-front.component.html',
  styleUrls: ['./client-header-front.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(-30px)' }))
      ])
    ])
  ]
})
export class ClientHeaderFrontComponent implements OnInit  {
  constructor(private panierService: PanierService , private toastr: ToastrService) {

    this.panierService.total$.subscribe(total => this.totalPanier = total);
    this.panierService.panier$.subscribe(produits => this.produitsDuPanier = produits);
  }
  totalPanier: number = 0;
  produitsDuPanier: Produit[] = [];  // Liste des produits du panier
  quantitesDisponibles: number[] = [];
  

  ngOnInit(): void {
    this.panierService.actualiserDonneesPanier(1); // Charge les données initiales

    this.getTotalPanier(); 
    this.loadProduitsDuPanier(1); 
    for (let i = 10; i <= 500; i += 10) {
      this.quantitesDisponibles.push(i);
    }// Assurez-vous d'utiliser l'ID de l'utilisateur actuel
    // Récupérer le total dès que le composant est initialisé
  }

  // Méthode pour récupérer le total du panier via l'API
  getTotalPanier(): void {
    const idUsersession = 1;  // Remplace ceci par l'ID de l'utilisateur (session actuelle)
    this.panierService.getTotalPanier(idUsersession).subscribe(
      (total) => {
        this.totalPanier = total;  // Mettre à jour le total du panier
      },
      (error) => {
        console.error('Erreur lors de la récupération du total du panier', error);
      }
    );
  }
 // Méthode pour charger les produits du panier
 loadProduitsDuPanier(idUsersession: number): void {
  this.panierService.getProduitsDuPanier(idUsersession).subscribe((produits: Produit[]) => {
    this.produitsDuPanier = produits;
  });
}
  showModal() {
    const modal = document.getElementById('panierModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  // Fonction pour fermer le modal
  closeModal() {
    const modal = document.getElementById('panierModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
  modifierQuantite(idProduit: number, quantite: number): void {
    const idUserSession = 1; // Remplacez avec l'ID de l'utilisateur actuel (session)
    
    // Vérification de la validité de la quantité
    if (!quantite || quantite < 10 || quantite > 500) {
      alert("Veuillez choisir une quantité entre 10 et 500 kg.");
      return;
    }

    // Appeler la méthode du service pour modifier la quantité du produit dans le panier
    this.panierService.modifierQuantitePanier(idUserSession, idProduit, quantite).subscribe({
      next: () => {
        alert("Quantité modifiée avec succès !");
      },
      error: (err) => {
        console.error("Erreur lors de la modification de la quantité :", err);
        alert("Erreur lors de la modification de la quantité.");
      }
    });
  }
  supprimerProduit(idProduit: number): void {
    const idUsersession = 1;
  
    // Animation instantanée (optionnel mais smooth)
    this.produitsDuPanier = this.produitsDuPanier.filter(p => p.idProduit !== idProduit);
  
    this.panierService.supprimerProduitDuPanier(idUsersession, idProduit).subscribe({
      next: () => {
        this.toastr.success('Produit supprimé avec succès ✅');
      },
      error: (err) => {
        this.toastr.error('Erreur lors de la suppression ❌');
        console.error("Erreur:", err);
      }
    });
    this.panierService.getTotalPanier(idUsersession).subscribe(total => {
      this.totalPanier = total; // Mettre à jour le total du panier dans DisplayProduitComponent
    });
  }
  
  calculerTotalPanier(idUsersession: number): void {
    this.panierService.getTotalPanier(idUsersession).subscribe(total => {
      this.totalPanier = total;
    });
  }
}
