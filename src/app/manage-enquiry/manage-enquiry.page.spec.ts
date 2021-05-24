import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEnquiryPage } from './manage-enquiry.page';

describe('ManageEnquiryPage', () => {
  let component: ManageEnquiryPage;
  let fixture: ComponentFixture<ManageEnquiryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEnquiryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEnquiryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
