import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Produit } from 'src/app/models/Produit';
import { AddProduitService } from '../services/add-produit.service';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {
  myForm!: FormGroup;
  generatedImage: string | null = null;

  constructor(private produitService: AddProduitService) {}
  ngOnInit(): void {
    this.myForm = new FormGroup({
      nomProduit: new FormControl("",Validators.required),
      stockProduit: new FormControl("",Validators.required),
      prixProduit: new FormControl("",Validators.required),
      dateFa: new FormControl("",Validators.required),
      dateExp: new FormControl("",Validators.required),
      imageProduit: new FormControl("",Validators.required),
      statusProduit: new FormControl("En_attente", Validators.required), // Assure-toi que c'est bien une valeur valide
      categorieProduit: new FormControl("",Validators.required),
      description: new FormControl("", Validators.required), // Nouveau champ
      remarque: new FormControl("-", Validators.required), // Nouveau champ


    });
  }

  get nomProduit() {
    return this.myForm.get('nomProduit');
  }

  get stockProduit() {
    return this.myForm.get('stockProduit');
  }

  get prixProduit() {
    return this.myForm.get('prixProduit');
  }

  get dateFa() {
    return this.myForm.get('dateFa');
  }

  get dateExp() {
    return this.myForm.get('dateExp');
  }

  get imageProduit() {
    return this.myForm.get('imageProduit');
  }

  get statusProduit() {
    return this.myForm.get('statusProduit');
  }

  get categorieProduit() {
    return this.myForm.get('categorieProduit');
  }
  get description() { // Getter pour la description
    return this.myForm.get('description');
  }
  add() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      const produit: Produit = {
        nomProduit: formData.nomProduit,
        stockProduit: formData.stockProduit,
        prixProduit: formData.prixProduit,
        dateFa: formData.dateFa,
        dateExp: formData.dateExp,
        imageProduit: formData.imageProduit,
        statusProduit: formData.statusProduit,
        categorieProduit: formData.categorieProduit,
        description: formData.description, // Ajout de la description
        remarque: formData.remarque,
      };

      // Appel de la méthode addDispo en passant l'idConnect = 1
      const idConnected = 1;
      this.produitService.addProduit(produit, idConnected).subscribe(
        (response) => {
          console.log('Produit ajouté avec succès', response);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du produit', error);
        }
      );
    }
}
onFileSelected(event: any) {
  const file: File = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.myForm.patchValue({ imageProduit: file.name });
    };
    reader.readAsDataURL(file);
  }
}
generateImage() {
  const productName = this.myForm.get('nomProduit')?.value;
  if (productName) {
    // Appeler l'API pour obtenir une image en fonction du nom du produit
    const apiUrl = `https://api.unsplash.com/photos/random?query=${productName}&client_id=YOUR_API_KEY`;
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data && data[0] && data[0].urls && data[0].urls.regular) {
          this.generatedImage = data[0].urls.regular;
        }
      })
      .catch(error => {
        console.error('Erreur lors de la génération de l\'image:', error);
      });
  }
}
}