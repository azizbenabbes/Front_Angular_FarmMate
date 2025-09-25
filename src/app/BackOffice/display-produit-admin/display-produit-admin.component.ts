import { Component } from '@angular/core';
import { AddProduitService } from 'src/app/FrontOfiice/services/add-produit.service';
import { Produit } from 'src/app/models/Produit';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-display-produit-admin',
  templateUrl: './display-produit-admin.component.html',
  styleUrls: ['./display-produit-admin.component.css']
})
export class DisplayProduitAdminComponent {
  produitsEnAttente: Produit[] = [];
  controleProduit: Produit | null = null;
  controleForm!: FormGroup;
  constructor(private produitService: AddProduitService) { }
  ngOnInit(): void {
    // Appeler le service pour récupérer les produits en attente
    this.produitService.getProduitsEnAttente().subscribe((data) => {
      this.produitsEnAttente = data;
    });
  }
  openControleModal(produit: Produit): void {
    this.controleProduit = produit;
    this.controleForm = new FormGroup({
      statusProduit: new FormControl(produit.statusProduit, Validators.required),
      remarque: new FormControl(produit.remarque, Validators.required) // Si vous avez une remarque existante
    });
  }
  

  // Fermer le modal
  closeControleModal(): void {
    this.controleProduit = null;
  }

  // Mettre à jour le produit
  updateProduitStatus(): void {
    if (this.controleProduit && this.controleForm.valid) {
      const status = this.controleForm.value.statusProduit;
      const remarque = this.controleForm.value.remarque;

      this.produitService.updateStatusAndRemarque(this.controleProduit.idProduit ??0, status, remarque)
        .subscribe((updatedProduit) => {
          console.log("Produit mis à jour :", updatedProduit);
          this.closeControleModal();
          // Rafraîchir la liste des produits en attente après mise à jour
          this.ngOnInit();
        }, (error) => {
          console.error("Erreur lors de la mise à jour du produit", error);
        });
    }
  }
}
