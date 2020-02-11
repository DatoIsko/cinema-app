import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsDialogComponent } from './seats-dialog.component';

describe('SeatsDialog', () => {
  let component: SeatsDialogComponent;
  let fixture: ComponentFixture<SeatsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeatsDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
