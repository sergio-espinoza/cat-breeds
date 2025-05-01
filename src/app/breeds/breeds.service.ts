import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Breed, BreedQueryParams } from './breeds.interface';
import { Observable } from 'rxjs';
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } from 'src/shared/http-params.constant';

@Injectable({ providedIn: 'root' })
export class BreedsService {
  private _Http = inject(HttpClient);

  getBreeds({
    page = DEFAULT_PAGINATION_PAGE,
    limit = DEFAULT_PAGINATION_LIMIT
  }: BreedQueryParams): Observable<Breed[]> {
    return this._Http.get<Breed[]>(
      `${environment.API_URL}?limit=${limit}&page=${page}`
    );
  }
}
