import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySharePopupComponent } from './category-share-popup.component';

describe('CategorySharePopupComponent', () => {
  let component: CategorySharePopupComponent;
  let fixture: ComponentFixture<CategorySharePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorySharePopupComponent]
    });
    fixture = TestBed.createComponent(CategorySharePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
