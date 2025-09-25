import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHeaderFrontComponent } from './client-header-front.component';

describe('ClientHeaderFrontComponent', () => {
  let component: ClientHeaderFrontComponent;
  let fixture: ComponentFixture<ClientHeaderFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientHeaderFrontComponent]
    });
    fixture = TestBed.createComponent(ClientHeaderFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
