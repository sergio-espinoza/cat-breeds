import { ComponentFixture, TestBed } from '@angular/core/testing';
import BreedPage from './breed.page';

describe('BreedPage', () => {
  let component: BreedPage;
  let fixture: ComponentFixture<BreedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
