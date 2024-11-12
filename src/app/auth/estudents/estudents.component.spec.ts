import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudentsComponent } from './estudents.component';

describe('EstudentsComponent', () => {
  let component: EstudentsComponent;
  let fixture: ComponentFixture<EstudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
