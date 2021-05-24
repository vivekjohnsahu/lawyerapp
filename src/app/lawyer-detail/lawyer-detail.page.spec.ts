import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerDetailPage } from './lawyer-detail.page';

describe('LawyerDetailPage', () => {
  let component: LawyerDetailPage;
  let fixture: ComponentFixture<LawyerDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawyerDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
