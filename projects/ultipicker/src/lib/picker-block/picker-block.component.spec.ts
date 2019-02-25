import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerBlockComponent } from './picker-block.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
