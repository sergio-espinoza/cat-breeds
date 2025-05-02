import { inject, Injectable } from '@angular/core';
import { Breed } from './breed.interface';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BreedService {
  private _Http = inject(HttpClient);

  getBreed(breedId: string): Observable<Breed | null> {
    return this._Http.get<Breed | null>(
      `${environment.API_URL}/${breedId}`
    ).pipe(
      catchError(_ => of(null))
    );
  }
}
