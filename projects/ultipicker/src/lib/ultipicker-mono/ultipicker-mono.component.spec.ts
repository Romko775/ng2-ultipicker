import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltipickerMonoComponent } from './ultipicker-mono.component';

describe('UltipickerMonoComponent', () => {
  let component: UltipickerMonoComponent;
  let fixture: ComponentFixture<UltipickerMonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltipickerMonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltipickerMonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
