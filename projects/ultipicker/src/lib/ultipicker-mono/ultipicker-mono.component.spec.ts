import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltipickerMonoComponent } from './ultipicker-mono.component';
import {FormBuilder} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('UltipickerMonoComponent', () => {
  let component: UltipickerMonoComponent;
  let fixture: ComponentFixture<UltipickerMonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UltipickerMonoComponent
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
    fixture = TestBed.createComponent(UltipickerMonoComponent);
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
