import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePlanPage } from './active-plan.page';

describe('ActivePlanPage', () => {
  let component: ActivePlanPage;
  let fixture: ComponentFixture<ActivePlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePlanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
