import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BallonDemo2Component } from './ballon-demo2.component';

describe('BallonDemo2Component', () => {
  let component: BallonDemo2Component;
  let fixture: ComponentFixture<BallonDemo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallonDemo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallonDemo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
