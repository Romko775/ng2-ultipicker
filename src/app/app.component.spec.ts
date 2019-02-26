import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {UltipickerModule} from '../../projects/ultipicker/src/lib/ultipicker.module';
import {FormBuilder} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        UltipickerModule
      ],
      providers: [
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
