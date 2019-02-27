import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltipickerDualComponent } from './ultipicker-dual.component';
import {FormBuilder} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('UltipickerDualComponent', () => {
  let component: UltipickerDualComponent;
  let fixture: ComponentFixture<UltipickerDualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UltipickerDualComponent
      ],
      imports: [

      ],
      providers: [
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltipickerDualComponent);
    component = fixture.componentInstance;
    component.inputDayFormat = 'DD/MM/YYYY';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate input mask', () => {
    expect(component.dayMask).toBe('99/99/9999');
  });
});
