import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppenerstellenComponent } from './gruppenerstellen.component';

describe('GruppenerstellenComponent', () => {
  let component: GruppenerstellenComponent;
  let fixture: ComponentFixture<GruppenerstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruppenerstellenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruppenerstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
