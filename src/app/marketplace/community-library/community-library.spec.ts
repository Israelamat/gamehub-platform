import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityLibrary } from './community-library';

describe('CommunityLibrary', () => {
  let component: CommunityLibrary;
  let fixture: ComponentFixture<CommunityLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
