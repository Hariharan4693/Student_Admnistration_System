import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfeesComponent } from './cfees.component';

describe('CfeesComponent', () => {
  let component: CfeesComponent;
  let fixture: ComponentFixture<CfeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
