import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfeesComponent } from './rfees.component';

describe('RfeesComponent', () => {
  let component: RfeesComponent;
  let fixture: ComponentFixture<RfeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
