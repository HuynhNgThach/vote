import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowPreviewComponent } from './shadow-preview.component';

describe('ShadowPreviewComponent', () => {
  let component: ShadowPreviewComponent;
  let fixture: ComponentFixture<ShadowPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowPreviewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShadowPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
