import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorralsListModalComponent } from './corrals-list-modal.component';

describe('CorralsListModalComponent', () => {
  let component: CorralsListModalComponent;
  let fixture: ComponentFixture<CorralsListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorralsListModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorralsListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
