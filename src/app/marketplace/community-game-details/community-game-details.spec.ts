import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityGameDetails } from './community-game-details';

describe('CommunityGameDetails', () => {
  let component: CommunityGameDetails;
  let fixture: ComponentFixture<CommunityGameDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityGameDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityGameDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
