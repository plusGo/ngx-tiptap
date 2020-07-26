import { TestBed } from '@angular/core/testing';

import { NgxTiptapLibService } from './ngx-tiptap-lib.service';

describe('NgxTiptapLibService', () => {
  let service: NgxTiptapLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTiptapLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
