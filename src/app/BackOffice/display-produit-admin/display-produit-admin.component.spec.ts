import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProduitAdminComponent } from './display-produit-admin.component';

describe('DisplayProduitAdminComponent', () => {
  let component: DisplayProduitAdminComponent;
  let fixture: ComponentFixture<DisplayProduitAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayProduitAdminComponent]
    });
    fixture = TestBed.createComponent(DisplayProduitAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
