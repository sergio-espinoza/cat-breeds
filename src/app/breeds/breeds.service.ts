import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BreedItem, BreedsQueryParams } from './breeds.interface';
import { Observable } from 'rxjs';
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } from 'src/shared/http-params.constant';

@Injectable({ providedIn: 'root' })
export class BreedsService {
  private _Http = inject(HttpClient);

  getBreeds({
    page = DEFAULT_PAGINATION_PAGE,
    limit = DEFAULT_PAGINATION_LIMIT,
    searchTerm = ''
  }: BreedsQueryParams): Observable<BreedItem[]> {
    const urlExtension = searchTerm ? `/search?q=${searchTerm}&` : '?';

    return this._Http.get<BreedItem[]>(
      `${environment.API_URL}${urlExtension}limit=${limit}&page=${page}`
    );
  }
}
