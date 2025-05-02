import { inject, Injectable } from '@angular/core';
import { Breed } from '../breeds/breeds.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BreedService {
  private _Http = inject(HttpClient);

  getBreed(breedId: string): Observable<Breed> {
    return this._Http.get<Breed>(
      `${environment.API_URL}/${breedId}`
    );
  }
}
