import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPublishGame } from './community-publish-game';

describe('CommunityPublishGame', () => {
  let component: CommunityPublishGame;
  let fixture: ComponentFixture<CommunityPublishGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityPublishGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityPublishGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
