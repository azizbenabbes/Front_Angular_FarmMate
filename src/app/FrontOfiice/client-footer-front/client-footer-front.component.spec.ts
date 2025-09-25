import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFooterFrontComponent } from './client-footer-front.component';

describe('ClientFooterFrontComponent', () => {
  let component: ClientFooterFrontComponent;
  let fixture: ComponentFixture<ClientFooterFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientFooterFrontComponent]
    });
    fixture = TestBed.createComponent(ClientFooterFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
