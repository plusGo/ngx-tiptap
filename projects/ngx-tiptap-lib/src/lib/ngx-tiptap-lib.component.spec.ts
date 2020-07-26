import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTiptapLibComponent } from './ngx-tiptap-lib.component';

describe('NgxTiptapLibComponent', () => {
  let component: NgxTiptapLibComponent;
  let fixture: ComponentFixture<NgxTiptapLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxTiptapLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTiptapLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
