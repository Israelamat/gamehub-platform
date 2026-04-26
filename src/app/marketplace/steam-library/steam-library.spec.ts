import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamLibrary } from './steam-library';

describe('SteamLibrary', () => {
  let component: SteamLibrary;
  let fixture: ComponentFixture<SteamLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SteamLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteamLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
