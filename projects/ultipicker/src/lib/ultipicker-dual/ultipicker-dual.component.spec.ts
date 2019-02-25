import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltipickerDualComponent } from './ultipicker-dual.component';

describe('UltipickerDualComponent', () => {
  let component: UltipickerDualComponent;
  let fixture: ComponentFixture<UltipickerDualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltipickerDualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltipickerDualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
