import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProduitComponent } from './FrontOfiice/add-produit/add-produit.component';
import { DisplayProduitComponent } from './FrontOfiice/display-produit/display-produit.component';
import { DisplayMesProduitComponent } from './FrontOfiice/display-mes-produit/display-mes-produit.component';
import { DisplayProduitAdminComponent } from './BackOffice/display-produit-admin/display-produit-admin.component';

const routes: Routes = [

  {path:"addProduit", component:AddProduitComponent},
  {path:"DisplayProduit", component:DisplayProduitComponent},
  {path:"DisplaymesProduit", component:DisplayMesProduitComponent},
  {path:"quality-control", component:DisplayProduitAdminComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
