import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltipickerDualComponent } from './ultipicker-dual.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormBuilder} from '@angular/forms';

describe('UltipickerDualComponent', () => {
  let component: UltipickerDualComponent;
  let fixture: ComponentFixture<UltipickerDualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UltipickerDualComponent
      ],
      imports: [
        FontAwesomeModule
      ],
      providers: [
        FormBuilder
      ]
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
