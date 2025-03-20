import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppenbeitretenComponent } from './gruppenbeitreten.component';

describe('GruppenbeitretenComponent', () => {
  let component: GruppenbeitretenComponent;
  let fixture: ComponentFixture<GruppenbeitretenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruppenbeitretenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruppenbeitretenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
