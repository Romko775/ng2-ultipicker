import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PickerBlockComponent} from './picker-block.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormBuilder} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import * as moment from 'moment';

import {library} from '@fortawesome/fontawesome-svg-core';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';

library.add(far, fas);

const minDate = moment().subtract(2, 'month');
const maxDate = moment().add(2, 'month');
const defaultDate = moment();


describe('PickerBlockComponent', () => {
  let component: PickerBlockComponent;
  let fixture: ComponentFixture<PickerBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PickerBlockComponent
      ],
      imports: [
        FontAwesomeModule
      ],
      providers: [
        FormBuilder,
        FontAwesomeModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerBlockComponent);
    component = fixture.componentInstance;

    component.minDate = minDate;
    component.maxDate = maxDate;
    component.selectedDate = defaultDate;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true when date is invalid', () => {
    expect(component.checkDateRange(moment().add(3, 'month'))).toBeTruthy();
    expect(component.checkDateRange(moment().subtract(3, 'month'))).toBeTruthy();
  });

  it('should return false when date is valid', () => {
    expect(component.checkDateRange(moment())).toBeFalsy();
  });

  it('should return proper class', () => {
    expect(component.getDayClass(moment().subtract(1, 'month'))).toBe('not-current-month');
    expect(component.getDayClass(moment().subtract(1, 'week'))).toBe('current-month');
    expect(component.getDayClass(moment())).toBe('current-month selected');
  });

});
