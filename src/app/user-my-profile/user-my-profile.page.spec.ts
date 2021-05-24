import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMyProfilePage } from './user-my-profile.page';

describe('UserMyProfilePage', () => {
  let component: UserMyProfilePage;
  let fixture: ComponentFixture<UserMyProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMyProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMyProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
