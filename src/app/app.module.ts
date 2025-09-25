import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderFrontComponent } from './FrontOfiice/header-front/header-front.component';
import { FooterFrontComponent } from './FrontOfiice/footer-front/footer-front.component';
import { AllTemplateFrontComponent } from './FrontOfiice/all-template-front/all-template-front.component';
import { ClientTemplateFrontComponent } from './FrontOfiice/client-template-front/client-template-front.component';
import { ClientHeaderFrontComponent } from './FrontOfiice/client-header-front/client-header-front.component';
import { ClientFooterFrontComponent } from './FrontOfiice/client-footer-front/client-footer-front.component';
import { AddProduitComponent } from './FrontOfiice/add-produit/add-produit.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayProduitComponent } from './FrontOfiice/display-produit/display-produit.component';
import { DisplayMesProduitComponent } from './FrontOfiice/display-mes-produit/display-mes-produit.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminTemplateBackComponent } from './BackOffice/admin-template-back/admin-template-back.component';
import { AdminSidebarBackComponent } from './BackOffice/admin-sidebar-back/admin-sidebar-back.component';
import { DisplayProduitAdminComponent } from './BackOffice/display-produit-admin/display-produit-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderFrontComponent,
    FooterFrontComponent,
    AllTemplateFrontComponent,
    ClientTemplateFrontComponent,
    ClientHeaderFrontComponent,
    ClientFooterFrontComponent,
    AddProduitComponent,
    DisplayProduitComponent,
    DisplayMesProduitComponent,
    AdminTemplateBackComponent,
    AdminSidebarBackComponent,
    DisplayProduitAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  //pour pouvoir utiliser la directive NgModel
    ReactiveFormsModule, //pour pouvoir utiliser formGroup, .....
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right', // ou top-right, top-center, etc.
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    }) ,
    BrowserAnimationsModule // configuration de Toastr

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
