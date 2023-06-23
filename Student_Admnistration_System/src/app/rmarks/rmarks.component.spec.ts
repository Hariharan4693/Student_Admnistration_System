import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmarksComponent } from './rmarks.component';

describe('RmarksComponent', () => {
  let component: RmarksComponent;
  let fixture: ComponentFixture<RmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
