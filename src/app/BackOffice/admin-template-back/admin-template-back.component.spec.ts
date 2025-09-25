import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTemplateBackComponent } from './admin-template-back.component';

describe('AdminTemplateBackComponent', () => {
  let component: AdminTemplateBackComponent;
  let fixture: ComponentFixture<AdminTemplateBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTemplateBackComponent]
    });
    fixture = TestBed.createComponent(AdminTemplateBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
