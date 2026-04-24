import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleBannerComponent } from './middle-banner.component';

describe('MiddleBannerComponent', () => {
  let component: MiddleBannerComponent;
  let fixture: ComponentFixture<MiddleBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiddleBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiddleBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
