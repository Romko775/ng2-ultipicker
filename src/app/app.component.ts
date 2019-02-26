import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as momentImported from 'moment';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fromEvent} from 'rxjs';
import * as Inputmask from 'inputmask/dist/inputmask/inputmask.numeric.extensions';

const moment = momentImported;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('monoMinInput') monoMinInput: ElementRef;

  mode = 'day';

  dayFormat = 'MM-DD-YYYY';
  regexD = new RegExp(this.dayFormat);
  dayMask = '99-99-9999';

  monoForm: FormGroup;
  dualForm: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.dualForm = this.fb.group({
      date: []
    });

    this.monoForm = this.fb.group({
      date: [],
      autoClose: [false],
      hasMinDate: [false],
      minDate: [moment().subtract(1, 'month')]
    });


    fromEvent(this.monoMinInput.nativeElement, 'keyup').subscribe(() => {
      const val = this.monoMinInput.nativeElement.value;
      if (this.regexD.test(val)) {
        this.monoForm.get('minDate').setValue(moment(val));
      }
    });

    setInterval(() => {
      console.log(this.monoForm);
    }, 2000);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const monoMinMask = new Inputmask({
        mask: this.dayMask,
        placeholder: '\u2000'
      });
      monoMinMask.mask(this.monoMinInput);
    });
  }

  getValueD(val: string) {
    return this.dualForm.get(val).value;
  }

  getValueM(val: string) {
    return this.monoForm.get(val).value;
  }

  getMinDateM(event) {
    console.log(event.value);
  }

  get minDate(): momentImported.Moment {
    return moment().subtract(1, 'year');
  }

  get maxDate(): momentImported.Moment {
    return moment().add(1, 'year');
  }

  get defaultStartDate(): momentImported.Moment {
    return moment();
  }

  get defaultEndDate(): momentImported.Moment {
    return moment().add(7, 'day');
  }

}
