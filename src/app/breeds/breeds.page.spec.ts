import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import BreedsPage from './breeds.page';
import { BreedsService } from './breeds.service';
import { BreedItem } from './breeds.interface';
import { CAT_BREEDS_LITE } from './breeds.data';
import { DEFAULT_PAGINATION_LIMIT } from 'src/shared/http-params.constant';
import { tap } from 'rxjs';

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


describe('BreedsService', () => {
  let service: BreedsService;
  let httpMock: HttpTestingController;

  const mockBreeds: Pick<BreedItem, 'name' | 'id'>[] = CAT_BREEDS_LITE.slice();

  const currentPage = Math.floor(Math.random() * 14); // From 0 to 13
  const indexToAdjust = currentPage === 13 ? 3 : 0;
  const idxToSubstractInPage = Math.floor(Math.random() * 5) - indexToAdjust;

  const breedLimitInPage = ((currentPage + 1) * DEFAULT_PAGINATION_LIMIT) - 1 - indexToAdjust // from 0 to 67;

  const mockBreedCurrentIdx = breedLimitInPage - idxToSubstractInPage;

  const mockBreedToCheck = mockBreeds[mockBreedCurrentIdx];
  let breedsFromResponse: BreedItem[] = [];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        BreedsService,
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(BreedsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get users and update the signal concating all the breeds', () => {
    service.getBreeds({ page: currentPage }).pipe(
      tap(breeds => breedsFromResponse = breeds)
    );

    const req = httpMock.expectOne('/v1/breeds');
    expect(req.request.method).toBe('GET');
    req.flush(mockBreeds);

    expect(breedsFromResponse[breedsFromResponse.length - idxToSubstractInPage].name).toEqual(mockBreedToCheck.name);
  });
});
