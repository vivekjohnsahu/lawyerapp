import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLawyerPage } from './manage-lawyer.page';

describe('ManageLawyerPage', () => {
  let component: ManageLawyerPage;
  let fixture: ComponentFixture<ManageLawyerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLawyerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLawyerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
