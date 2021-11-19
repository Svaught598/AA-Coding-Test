import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleFormComponent } from './sample-form.component';

describe('SampleFormComponent', () => {
  let component: SampleFormComponent;
  let fixture: ComponentFixture<SampleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // Never worked with TypeScript/Angular/Karma before :(
  // Only React/Vue/Vanilla JS
  // Unfortunately, my current workplace thinks tests are a waste of time
  // Hope these aren't a dealbreaker!
  it('should have select default set to Platinum Pro', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const select = compiled.querySelector("#status") as HTMLInputElement;
    expect(select.value).toContain("Platinum Pro")
  })
});
