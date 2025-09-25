import { Component } from '@angular/core';
import { AddProduitService } from '../services/add-produit.service';
import { Produit } from 'src/app/models/Produit';
import { FormGroup, FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'app-display-mes-produit',
  templateUrl: './display-mes-produit.component.html',
  styleUrls: ['./display-mes-produit.component.css']
})
export class DisplayMesProduitComponent {
    produits: Produit[] = [];
    selectedProduit: Produit | null = null; // Pour stocker le produit sélectionné
    editProduit: Produit | null = null;
    editForm!: FormGroup;
    showConfirmationModal: boolean = false; // Flag pour afficher le modal de confirmation
    selectedProduitId: number | null = null; // ID du produit sélectionné pour suppression
    produitsParPage = 3;  // Nombre de produits par page
  pageCourante = 0;  // Page courante
  totalPages: number = 0;

  constructor(private produitService: AddProduitService) {}
  ngOnInit(): void {
    this.produitService.DisplayProduit().subscribe(
      (data: Produit[]) => {
        this.produits = data;
        this.totalPages = Math.ceil(this.produits.length / this.produitsParPage);
        console.log("Produits collectés :", this.produits);
      },
      (error: any) => {
        console.error("Erreur lors de la récupération des produits", error);
      }
    );
    
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
  modifierProduit(): void {
    if (this.editProduit) {
      this.produitService.updateProduit(this.editProduit, this.editProduit.idProduit ??0).subscribe(
        (updatedProduit) => {
          console.log("Produit modifié :", updatedProduit);
          this.closeEditModal();
          this.ngOnInit(); // rafraîchir la liste
        },
        (error) => {
          console.error("Erreur lors de la modification :", error);
        }
      );
    }
  }
  openEditModal(produit: Produit): void {
    this.editProduit = produit;
    this.editForm = new FormGroup({
      nomProduit: new FormControl(produit.nomProduit, Validators.required),
      stockProduit: new FormControl(produit.stockProduit, Validators.required),
      prixProduit: new FormControl(produit.prixProduit, Validators.required),
      dateFa: new FormControl(produit.dateFa, Validators.required),
      dateExp: new FormControl(produit.dateExp, Validators.required),
      imageProduit: new FormControl(produit.imageProduit, Validators.required),
      statusProduit: new FormControl("En_attente", Validators.required),
      categorieProduit: new FormControl(produit.categorieProduit, Validators.required),
      description: new FormControl(produit.description, Validators.required)
    });
  }
  closeEditModal(): void {
    this.editProduit = null;
  }
  onEditFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editForm.patchValue({ imageProduit: file.name });
      };
      reader.readAsDataURL(file);
    } }
    openDeleteModal(produit: Produit): void {
      this.selectedProduitId  = produit.idProduit ?? 0;
      this.showConfirmationModal = true; // Affiche le modal de confirmation
    }
    confirmDeleteProduit(): void {
      if (this.selectedProduitId !== null) {
        this.produitService.deleteProduit(this.selectedProduitId).subscribe(
          () => {
            console.log("Produit supprimé !");
            this.produits = this.produits.filter(p => p.idProduit !== this.selectedProduitId); // Mettre à jour la liste des produits après suppression
            this.closeConfirmationModal(); // Ferme le modal de confirmation
          },
          (error: any) => {
            console.error("Erreur lors de la suppression du produit", error);
            this.closeConfirmationModal(); // Ferme le modal en cas d'erreur
          }
        );
      }
    }
    closeConfirmationModal(): void {
      this.showConfirmationModal = false;
      this.selectedProduitId = null; // Réinitialiser l'ID du produit
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
    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          // Ici, tu mets à jour le modèle avec la nouvelle image
          this.editForm.patchValue({ imageProduit: file.name });
    
          // Tu mets également à jour l'image dans l'objet editProduit
          this.editProduit!.imageProduit = file.name;
    
          // Force l'affichage de la nouvelle image dans la carte
          const imgElement = document.querySelector(`#image-${this.editProduit!.idProduit}`);
          if (imgElement) {
            imgElement.setAttribute('src', reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
}
