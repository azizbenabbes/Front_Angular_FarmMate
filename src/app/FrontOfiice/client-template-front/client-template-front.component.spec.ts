import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTemplateFrontComponent } from './client-template-front.component';

describe('ClientTemplateFrontComponent', () => {
  let component: ClientTemplateFrontComponent;
  let fixture: ComponentFixture<ClientTemplateFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientTemplateFrontComponent]
    });
    fixture = TestBed.createComponent(ClientTemplateFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
