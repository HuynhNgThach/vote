import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalStateComponent } from './local-state.component';

describe('LocalStateComponent', () => {
  let component: LocalStateComponent;
  let fixture: ComponentFixture<LocalStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
