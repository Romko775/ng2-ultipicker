import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {UltipickerDualComponent} from '../../projects/ultipicker/src/lib/ultipicker-dual/ultipicker-dual.component';
import {UltipickerMonoComponent} from '../../projects/ultipicker/src/lib/ultipicker-mono/ultipicker-mono.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        UltipickerDualComponent,
        UltipickerMonoComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ulti-picker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ulti-picker');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to ulti-picker!');
  });
});
