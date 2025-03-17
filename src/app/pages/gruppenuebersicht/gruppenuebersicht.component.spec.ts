import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppenuebersichtComponent } from './gruppenuebersicht.component';

describe('GruppenuebersichtComponent', () => {
  let component: GruppenuebersichtComponent;
  let fixture: ComponentFixture<GruppenuebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruppenuebersichtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruppenuebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
