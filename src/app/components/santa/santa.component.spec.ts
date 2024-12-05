import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SantaComponent } from './santa.component';

describe('SantaComponent', () => {
  let component: SantaComponent;
  let fixture: ComponentFixture<SantaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SantaComponent]
    });
    fixture = TestBed.createComponent(SantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
