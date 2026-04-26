import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLibrary } from './course-library';

describe('CourseLibrary', () => {
  let component: CourseLibrary;
  let fixture: ComponentFixture<CourseLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
