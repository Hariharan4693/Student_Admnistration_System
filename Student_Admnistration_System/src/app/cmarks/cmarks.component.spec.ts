import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmarksComponent } from './cmarks.component';

describe('CmarksComponent', () => {
  let component: CmarksComponent;
  let fixture: ComponentFixture<CmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
