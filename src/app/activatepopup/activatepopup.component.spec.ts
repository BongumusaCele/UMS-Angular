import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatepopupComponent } from './activatepopup.component';

describe('ActivatepopupComponent', () => {
  let component: ActivatepopupComponent;
  let fixture: ComponentFixture<ActivatepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivatepopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivatepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
