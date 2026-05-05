import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameReviews } from './game-reviews';

describe('GameReviews', () => {
  let component: GameReviews;
  let fixture: ComponentFixture<GameReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameReviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameReviews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
