import { ComponentFixture, TestBed } from '@angular/core/testing';

import BreedsPage from './breeds.page';

describe('BreedsPage', () => {
  let component: BreedsPage;
  let fixture: ComponentFixture<BreedsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BreedsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
