import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMesProduitComponent } from './display-mes-produit.component';

describe('DisplayMesProduitComponent', () => {
  let component: DisplayMesProduitComponent;
  let fixture: ComponentFixture<DisplayMesProduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayMesProduitComponent]
    });
    fixture = TestBed.createComponent(DisplayMesProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
