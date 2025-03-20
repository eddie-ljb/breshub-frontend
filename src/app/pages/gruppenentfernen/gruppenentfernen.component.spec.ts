import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppenentfernenComponent } from './gruppenentfernen.component';

describe('GruppenentfernenComponent', () => {
  let component: GruppenentfernenComponent;
  let fixture: ComponentFixture<GruppenentfernenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruppenentfernenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruppenentfernenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
