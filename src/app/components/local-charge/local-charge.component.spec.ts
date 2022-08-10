import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalChargeComponent } from './local-charge.component';

describe('LocalChargeComponent', () => {
  let component: LocalChargeComponent;
  let fixture: ComponentFixture<LocalChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalChargeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
