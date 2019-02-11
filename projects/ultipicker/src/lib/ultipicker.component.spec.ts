import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltipickerComponent } from './ultipicker.component';

describe('UltipickerComponent', () => {
  let component: UltipickerComponent;
  let fixture: ComponentFixture<UltipickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltipickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltipickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
