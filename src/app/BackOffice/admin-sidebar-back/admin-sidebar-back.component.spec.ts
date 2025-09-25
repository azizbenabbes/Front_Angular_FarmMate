import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidebarBackComponent } from './admin-sidebar-back.component';

describe('AdminSidebarBackComponent', () => {
  let component: AdminSidebarBackComponent;
  let fixture: ComponentFixture<AdminSidebarBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSidebarBackComponent]
    });
    fixture = TestBed.createComponent(AdminSidebarBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
