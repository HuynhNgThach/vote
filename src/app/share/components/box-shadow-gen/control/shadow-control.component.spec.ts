import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShadowControlComponent } from './shadow-control.component';


describe('ShadowControlComponent', () => {
  let component: ShadowControlComponent;
  let fixture: ComponentFixture<ShadowControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowControlComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShadowControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
