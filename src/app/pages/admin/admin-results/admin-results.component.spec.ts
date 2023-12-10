import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResultsComponent } from './admin-results.component';

describe('AdminResultsComponent', () => {
  let component: AdminResultsComponent;
  let fixture: ComponentFixture<AdminResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminResultsComponent]
    });
    fixture = TestBed.createComponent(AdminResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
